'use client';

import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import HeroSlider, { heroDefaultSlides, type HeroSlide, type HeroSliderHandle } from './ui/HeroSlider';

const Hero = (): JSX.Element => {
  const [activeSlide, setActiveSlide] = useState<HeroSlide>(heroDefaultSlides[0]!);
  const sliderRef = useRef<HeroSliderHandle>(null);
  const primaryStat = activeSlide?.stats;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FFF5F5]"></div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-[#FF6B6B]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-[#10B981]/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <button
        aria-label="Previous slide"
        className="hidden lg:flex absolute top-1/2 left-6 -translate-y-1/2 z-30 p-4 rounded-full bg-white/80 text-slate-900 shadow-2xl shadow-blue-900/10 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70"
        onClick={() => sliderRef.current?.previous()}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        aria-label="Next slide"
        className="hidden lg:flex absolute top-1/2 right-6 -translate-y-1/2 z-30 p-4 rounded-full bg-white/80 text-slate-900 shadow-2xl shadow-blue-900/10 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70"
        onClick={() => sliderRef.current?.next()}
      >
        <ChevronRight size={22} />
      </button>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap gap-3">
              {activeSlide?.badge && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide text-white bg-gradient-to-r from-[#FF6B6B] via-[#FF7F56] to-[#FF8E53] shadow-[0_10px_25px_rgba(255,107,107,0.25)]">
                  {activeSlide.badge}
                </span>
              )}
              {activeSlide?.highlightedWord && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B6B] via-[#FF7F56] to-[#FF8E53] shadow-[0_10px_25px_rgba(255,107,107,0.25)]">
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
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:from-[#FF5252] hover:to-[#FF7043] text-white px-8 py-6 text-base shadow-xl shadow-[#FF6B6B]/25 hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Module
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white px-6 py-6 text-base transition-all duration-300 flex items-center gap-2 group"
              >
                <Play size={18} className="group-hover:scale-110 transition-transform" />
                Watch Preview
              </Button>
            </div>
          </div>

          {/* Right Visual - Hero Slider */}
          <div className="relative lg:h-[500px] flex items-center justify-center w-full">
            <HeroSlider ref={sliderRef} onSlideChange={setActiveSlide} />
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
