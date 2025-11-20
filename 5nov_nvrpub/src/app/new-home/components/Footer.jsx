import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { mockData } from '../mock.js';

const Footer = () => {
  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-[#0A2540] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-1">JAYPEE DIGITAL</h3>
              <p className="text-[#3B82F6] text-xs font-medium tracking-wide">EXPLORE HEALTH SCIENCE</p>
            </div>
            
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                <p>{mockData.companyInfo.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#FF6B6B] flex-shrink-0" />
                <p>{mockData.companyInfo.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#FF6B6B] flex-shrink-0" />
                <p>{mockData.companyInfo.email}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-[#3B82F6] hover:to-[#FF6B6B] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Information</h4>
            <ul className="space-y-3">
              {mockData.footerLinks.information.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#FF6B6B] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#FF6B6B] group-hover:w-4 transition-all duration-200"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Explore</h4>
            <ul className="space-y-3">
              {mockData.footerLinks.explore.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#FF6B6B] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#FF6B6B] group-hover:w-4 transition-all duration-200"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              {mockData.footerLinks.contact.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#FF6B6B] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#FF6B6B] group-hover:w-4 transition-all duration-200"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© 2025 Jaypee Digital. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
