'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Crown, LogOut, Menu, User, X } from 'lucide-react';
import type { ContentTypeNavItem } from '@/utils/contenttype-nav';
import { fetchContentTypeNav, defaultContentTypeNav } from '@/utils/contenttype-nav';

type NavLinkItem = {
  name: string;
  href: string;
};

const STATIC_NAV_LINKS: NavLinkItem[] = [
  { name: 'Books', href: '/contenttypes/books' },
  { name: 'Videos', href: '/contenttypes/videos' },
  { name: 'Journals', href: '/contenttypes/journals' },
  { name: 'Cases', href: '/contenttypes/cases' },
  { name: 'MCQs', href: '/contenttypes/mcqs' },
  { name: 'Reviews', href: '/contenttypes/reviews' }
];

const CTA_LINKS = [
  { label: 'Sign In', href: '/login', variant: 'outline' as const },
  { label: 'Sign Up', href: '/signup', variant: 'solid' as const }
];

type AuthUser = {
  id: number;
  full_name?: string;
  email: string;
  plan?: string;
  isPremium?: boolean;
};

const getCtaClasses = (variant: 'outline' | 'solid'): string => {
  if (variant === 'solid') {
    return 'rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6B6B]/30 transition hover:from-[#FF5252] hover:to-[#FF7043] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B6B]';
  }
  return 'rounded-full border border-[#0A2540] px-6 py-2.5 text-sm font-semibold text-[#0A2540] transition hover:bg-[#0A2540] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540]';
};

const mapNavItemsToLinks = (items: ContentTypeNavItem[]): NavLinkItem[] =>
  items.map((item) => ({
    name: item.label,
    href: item.path
  }));

const SiteNavbar = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLinkItem[]>(STATIC_NAV_LINKS);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const syncUserFromStorage = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to parse stored user session', error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    syncUserFromStorage();
    const handleStorage = () => syncUserFromStorage();
    const handleAuthChanged = () => syncUserFromStorage();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('auth-changed', handleAuthChanged as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('auth-changed', handleAuthChanged as EventListener);
    };
  }, [syncUserFromStorage]);

  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('user');
    }
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.warn('Logout request failed', error);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth-changed'));
    }
    setProfileMenuOpen(false);
  };

  const refreshNavLinks = useCallback(
    async ({ signal, showLoading = false }: { signal?: AbortSignal; showLoading?: boolean } = {}) => {
      try {
        if (showLoading) {
          setNavLinks((current) => (current.length ? current : mapNavItemsToLinks(defaultContentTypeNav)));
        }
        const navItems = await fetchContentTypeNav(signal);
        setNavLinks(mapNavItemsToLinks(navItems));
      } catch (error: unknown) {
        if ((error as { name?: string })?.name === 'AbortError') return;
        console.error('Failed to load navbar links:', error);
        setNavLinks(mapNavItemsToLinks(defaultContentTypeNav));
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    refreshNavLinks({ signal: controller.signal, showLoading: true });
    return () => controller.abort();
  }, [refreshNavLinks]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'contenttype-update') {
        refreshNavLinks();
      }
    };

    const handleFocus = () => refreshNavLinks();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshNavLinks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [refreshNavLinks]);

  const combinedNavLinks = useMemo(() => {
    const deduped = new Map<string, NavLinkItem>();
    [...navLinks, ...STATIC_NAV_LINKS].forEach((link) => {
      const key = link.name.toLowerCase();
      if (!deduped.has(key)) {
        deduped.set(key, link);
      }
    });
    return Array.from(deduped.values());
  }, [navLinks]);

  const renderProfileMenu = () => {
    if (!user) return null;
    const avatarLabel =
      (user.full_name?.trim().charAt(0) || user.email?.charAt(0) || 'U').toUpperCase();
    const planLabel = user.isPremium ? 'Premium plan' : 'Free plan';
    const nameLabel = user.full_name || user.email?.split('@')[0] || 'User';

    return (
      <div className="relative" ref={profileRef}>
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition hover:border-slate-300"
          onClick={() => setProfileMenuOpen((prev) => !prev)}
        >
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 font-semibold text-white">
            {avatarLabel}
          </span>
          <span className="hidden flex-col leading-tight lg:flex">
            <span className="text-sm font-semibold text-slate-900">{nameLabel}</span>
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Crown size={12} className={user.isPremium ? 'text-amber-500' : 'text-slate-400'} />
              {planLabel}
            </span>
          </span>
        </button>
        {profileMenuOpen && (
          <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-lg font-semibold text-white">
                {avatarLabel}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{user.email}</p>
                <p className="flex items-center gap-1 text-xs text-slate-500">
                  <Crown size={12} className={user.isPremium ? 'text-amber-500' : 'text-slate-400'} />
                  {planLabel}
                </p>
              </div>
            </div>
            <div className="py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">Account</p>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                onClick={() => setProfileMenuOpen(false)}
              >
                <User size={16} />
                View profile
              </Link>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-white/70'
      }`}
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex flex-col text-left" aria-label="NRV Publications home">
            <span className="text-2xl font-bold text-[#0A2540]">NRV PUBLICATIONS</span>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#3B82F6]">
              EXPLORE HEALTH SCIENCE
            </span>
          </Link>
        </div>

        <div className="hidden items-center space-x-8 md:flex">
          {combinedNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-sm font-medium text-[#334155] transition-colors duration-200 hover:text-[#FF6B6B]"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#FF6B6B] transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden items-center space-x-4 md:flex">
          {user ? (
            renderProfileMenu()
          ) : (
            CTA_LINKS.map((cta) => (
              <Link key={cta.label} href={cta.href} className={getCtaClasses(cta.variant)}>
                {cta.label}
              </Link>
            ))
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-[#0A2540]"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="space-y-3 px-4 py-4">
            {combinedNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-base font-medium text-[#334155] transition-colors hover:text-[#FF6B6B]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-lg font-semibold text-white">
                    {(user.full_name?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {user.full_name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.isPremium ? 'Premium plan' : 'Free plan'}
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4">
                {CTA_LINKS.map((cta) => (
                  <Link
                    key={`mobile-${cta.label}`}
                    href={cta.href}
                    className={`block text-center ${getCtaClasses(cta.variant)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNavbar;


