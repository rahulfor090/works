'use client';

import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { mockData } from '@/app/new-home/mock';

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' }
];

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#0A2540] text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6">
              <h3 className="mb-1 text-2xl font-bold">NRV PUBLICATIONS</h3>
              <p className="text-xs font-medium tracking-wide text-[#3B82F6]">EXPLORE HEALTH SCIENCE</p>
            </div>

            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#FF6B6B]" />
                <p>{mockData.companyInfo.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-[#FF6B6B]" />
                <p>{mockData.companyInfo.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-[#FF6B6B]" />
                <p>{mockData.companyInfo.email}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-[#3B82F6] hover:to-[#FF6B6B]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold">Information</h4>
            <ul className="space-y-3">
              {mockData.footerLinks.information.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-[#FF6B6B]"
                  >
                    <span className="h-0.5 w-0 bg-[#FF6B6B] transition-all duration-200 group-hover:w-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold">Explore</h4>
            <ul className="space-y-3">
              {mockData.footerLinks.explore.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-[#FF6B6B]"
                  >
                    <span className="h-0.5 w-0 bg-[#FF6B6B] transition-all duration-200 group-hover:w-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold">Contact Us</h4>
            <ul className="space-y-3">
              {mockData.footerLinks.contact.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-[#FF6B6B]"
                  >
                    <span className="h-0.5 w-0 bg-[#FF6B6B] transition-all duration-200 group-hover:w-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-4 text-sm text-white/60 md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} NRV Publications. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;


