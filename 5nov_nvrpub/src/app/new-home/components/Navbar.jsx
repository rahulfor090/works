import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { mockData } from '../mock';
import { fetchContentTypeNav, defaultContentTypeNav } from '../../../utils/contenttype-nav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(mockData.navLinks);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mapNavItemsToLinks = useCallback((items) =>
    items.map((item) => ({ name: item.label, href: item.path })), []);

  const refreshNavLinks = useCallback(async ({ signal, showLoading = false } = {}) => {
    try {
      if (showLoading) {
        setNavLinks((current) => current.length ? current : mapNavItemsToLinks(defaultContentTypeNav));
      }
      const navItems = await fetchContentTypeNav(signal);
      setNavLinks(mapNavItemsToLinks(navItems));
    } catch (error) {
      if (error?.name === 'AbortError') return;
      console.error('Failed to load navbar links:', error);
      setNavLinks(mapNavItemsToLinks(defaultContentTypeNav));
    }
  }, [mapNavItemsToLinks]);

  useEffect(() => {
    const controller = new AbortController();
    refreshNavLinks({ signal: controller.signal, showLoading: true });
    return () => controller.abort();
  }, [refreshNavLinks]);

  useEffect(() => {
    const handleStorageChange = (event) => {
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[#0A2540]">JAYPEE DIGITAL</h1>
              <p className="text-xs text-[#3B82F6] font-medium tracking-wide">EXPLORE HEALTH SCIENCE</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#334155] hover:text-[#FF6B6B] font-medium transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B6B] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-all duration-200"
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:from-[#FF5252] hover:to-[#FF7043] text-white shadow-lg shadow-[#FF6B6B]/25 transition-all duration-200"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#0A2540]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-[#334155] hover:text-[#FF6B6B] font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
