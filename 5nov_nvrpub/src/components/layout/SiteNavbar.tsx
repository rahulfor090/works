'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          {CTA_LINKS.map((cta) => (
            <Link key={cta.label} href={cta.href} className={getCtaClasses(cta.variant)}>
              {cta.label}
            </Link>
          ))}
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNavbar;


