import React, { useState } from 'react';  
import Link from 'next/link';
import { Button } from './ui/button';
import { Play } from 'lucide-react';
import HeroSlider, { heroDefaultSlides } from './ui/HeroSlider';

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(heroDefaultSlides[0]);
  const primaryStat = activeSlide?.stats;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FFF5F5]"></div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-[#FF6B6B]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-[#10B981]/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap gap-3">
              {activeSlide?.badge && (
                <span className="px-4 py-2 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-sm font-semibold backdrop-blur-sm uppercase tracking-wide">
                  {activeSlide.badge}
                </span>
              )}
              {activeSlide?.highlightedWord && (
                <span className="px-4 py-2 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-full text-sm font-semibold backdrop-blur-sm">
                  {activeSlide.highlightedWord}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-[0.3em]">
                Trusted by 50,000+ clinicians
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A2540] leading-tight">
                {activeSlide?.title}
              </h1>
              {activeSlide?.subtitle && (
                <p className="text-lg text-[#64748B] leading-relaxed max-w-xl">
                  {activeSlide.subtitle}
                </p>
              )}
            </div>

            {primaryStat?.value && (
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white shadow-lg border border-slate-100 max-w-md">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[#94A3B8]">{primaryStat.label}</p>
                  <p className="text-4xl font-bold text-[#0A2540]">{primaryStat.value}</p>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <p className="text-sm text-[#64748B]">
                  Curated by Jaypee experts • Updated monthly
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contenttypes/books">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:from-[#FF5252] hover:to-[#FF7043] text-white px-8 py-6 text-base shadow-xl shadow-[#FF6B6B]/25 hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore Books
                </Button>
              </Link>
              <Link href="/contenttypes/videos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white px-6 py-6 text-base transition-all duration-300 flex items-center gap-2 group"
                >
                  <Play size={18} className="group-hover:scale-110 transition-transform" />
                  Watch Videos
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual - Hero Slider */}
          <div className="relative lg:h-[600px] flex items-center justify-center w-full">
            <HeroSlider onSlideChange={setActiveSlide} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#CBD5E1] rounded-full flex justify-center">
          <div className="w-1.5 h-2 bg-[#CBD5E1] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
