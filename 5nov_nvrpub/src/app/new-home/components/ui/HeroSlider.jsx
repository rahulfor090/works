'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const defaultSlides = [
  {
    id: 'precision-peds',
    title: 'Precision Pediatrics Playbook',
    subtitle: 'Bite-sized clinical briefs curated for busy pediatricians on ward rounds.',
    highlightedWord: 'New • Pediatrics',
    badge: 'Editor’s pick',
    stats: { label: 'Rapid review cards', value: '120+' },
    image: 'slider-1762790645416-940945050.png',
    accent: 'from-sky-500 via-blue-500 to-indigo-500'
  },
  {
    id: 'cardio-master',
    title: 'Cardio Masterclass Series',
    subtitle: 'Visual angiograms, echo pearls, and case-based explainers updated monthly.',
    highlightedWord: 'Premium collection',
    badge: 'Cardiology',
    stats: { label: 'Interactive cases', value: '45' },
    image: 'slider-1762864219186-86075449.jpg',
    accent: 'from-rose-500 via-orange-400 to-amber-300'
  },
  {
    id: 'surgery-essentials',
    title: 'Surgery Essentials 2.0',
    subtitle: 'Stepwise OT protocols, annotated anatomy, and board-style checklists.',
    highlightedWord: 'Faculty approved',
    badge: 'Surgery',
    stats: { label: 'OSCE drills', value: '30+' },
    image: 'slider-1763561169491-982797070.jpg',
    accent: 'from-emerald-400 via-teal-400 to-cyan-400'
  }
];

const resolveImageSrc = (image) => {
  if (!image) return '';
  if (image.startsWith('http') || image.startsWith('data:')) {
    return image;
  }
  if (image.startsWith('/')) {
    return image;
  }
  return `/images/sliders/${image}`;
};

const HeroSlider = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const autoplayRef = useRef(null);

  const decorateSlides = useCallback((rawSlides = []) => {
    if (!Array.isArray(rawSlides) || rawSlides.length === 0) {
      return defaultSlides;
    }

    return rawSlides
      .filter((slide) => slide?.isActive !== 0)
      .map((slide, index) => {
        const fallback = defaultSlides[index % defaultSlides.length];
        return {
          ...fallback,
          ...slide,
          stats: slide.stats || fallback.stats,
          badge: slide.badge || slide.category || fallback.badge,
          accent: slide.accent || fallback.accent
        };
      });
  }, []);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/slides');
        if (response.ok) {
          const data = await response.json();
          const decorated = decorateSlides(data);
          setSlides(decorated.length > 0 ? decorated : defaultSlides);
        }
      } catch (error) {
        console.error('Failed to fetch slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [decorateSlides]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [slides.length, handleNext, isPaused]);

  if (loading && !slides.length) {
    return <div className="w-full h-[520px] rounded-3xl bg-slate-100 animate-pulse" />;
  }

  const activeSlide = slides[currentIndex];

  const slideVariants = {
    initial: (dir) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.65,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <div className="relative w-full">
      <div
        className="relative w-full aspect-[4/5] max-h-[520px] rounded-[32px] bg-white/5 backdrop-blur-2xl shadow-[0_25px_90px_rgba(15,23,42,0.3)] border border-white/10 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide?.id ?? currentIndex}
            className="absolute inset-0"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ transitionDuration: '1600ms' }}
              style={{
                backgroundImage: `url(${resolveImageSrc(activeSlide?.image)})`
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/10" />

            <div className="absolute top-6 left-6 flex gap-3">
              {activeSlide?.badge && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-white/15 backdrop-blur">
                  <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${activeSlide.accent}`} />
                  {activeSlide.badge}
                </span>
              )}
              {activeSlide?.highlightedWord && (
                <span className="px-4 py-2 text-xs font-semibold rounded-full text-slate-900 bg-white">
                  {activeSlide.highlightedWord}
                </span>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-white/60 to-white" />
                  <h2 className="text-3xl font-bold leading-tight drop-shadow-xl">
                    {activeSlide?.title}
                  </h2>
                  {activeSlide?.subtitle && (
                    <p className="text-base text-slate-200 leading-relaxed">{activeSlide.subtitle}</p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 border border-white/15 rounded-2xl p-4 backdrop-blur">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                      {activeSlide?.stats?.label}
                    </p>
                    <p className="text-4xl font-bold">{activeSlide?.stats?.value}</p>
                  </div>
                  <button className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-slate-900 hover:shadow-lg transition-shadow">
                    View module
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          aria-label="Previous slide"
          className="hidden lg:inline-flex absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-slate-900 shadow-xl shadow-blue-900/10 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60"
          onClick={handlePrev}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next slide"
          className="hidden lg:inline-flex absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-slate-900 shadow-xl shadow-blue-900/10 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60"
          onClick={handleNext}
        >
          <ChevronRight size={20} />
        </button>

        <button
          type="button"
          aria-label={isPaused ? 'Resume slider' : 'Pause slider'}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          onClick={() => setIsPaused((prev) => !prev)}
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id ?? index}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-200"
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`block h-full bg-gradient-to-r ${slide.accent ?? 'from-slate-900 to-slate-700'}`}
                style={{
                  width: index === currentIndex ? '100%' : '0%',
                  transition: index === currentIndex ? 'width 6s linear' : 'width 0.4s ease'
                }}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="font-medium text-slate-900">
            0{currentIndex + 1} / 0{slides.length}
          </span>
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <span
                key={`dot-${slide.id ?? index}`}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-slate-900' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;

