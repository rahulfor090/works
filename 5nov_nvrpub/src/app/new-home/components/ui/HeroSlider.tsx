'use client';

import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export type HeroSlide = {
  id: string;
  title: string;
  subtitle?: string;
  highlightedWord?: string;
  badge?: string;
  stats?: {
    label: string;
    value: string;
  };
  image: string;
  accent?: string;
  isActive?: number;
  category?: string;
};

export type HeroSliderHandle = {
  next: () => void;
  previous: () => void;
};

export const heroDefaultSlides: HeroSlide[] = [
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

const resolveImageSrc = (image?: string): string => {
  if (!image) return '';
  if (image.startsWith('http') || image.startsWith('data:')) {
    return image;
  }
  if (image.startsWith('/')) {
    return image;
  }
  return `/images/sliders/${image}`;
};

type HeroSliderProps = {
  onSlideChange?: (slide: HeroSlide) => void;
};

type RawSlide = Partial<HeroSlide> & { isActive?: number };

const HeroSlider = forwardRef<HeroSliderHandle, HeroSliderProps>(({ onSlideChange }, ref): JSX.Element => {
  const [slides, setSlides] = useState<HeroSlide[]>(heroDefaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const decorateSlides = useCallback((rawSlides: RawSlide[] = []): HeroSlide[] => {
    if (!Array.isArray(rawSlides) || rawSlides.length === 0) {
      return heroDefaultSlides;
    }

    return rawSlides
      .filter((slide) => slide?.isActive !== 0)
      .map((slide, index) => {
        const fallback = heroDefaultSlides[index % heroDefaultSlides.length];
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
          setSlides(decorated.length > 0 ? decorated : heroDefaultSlides);
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

  useImperativeHandle(ref, () => ({
    next: handleNext,
    previous: handlePrev
  }));

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

  const activeSlide = slides[currentIndex];

  const slideVariants = {
    initial: (dir: number) => ({
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
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.65,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  useEffect(() => {
    if (typeof onSlideChange === 'function' && activeSlide) {
      onSlideChange(activeSlide);
    }
  }, [activeSlide, onSlideChange]);

  if (loading && !slides.length) {
    return <div className="w-full h-[520px] rounded-3xl bg-slate-100 animate-pulse" />;
  }

  return (
    <div className="relative w-full">
      <div
        className="relative w-full aspect-[4/5] max-h-[420px] rounded-[32px] overflow-hidden"
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
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms]"
              style={{
                backgroundImage: `url(${resolveImageSrc(activeSlide?.image)})`
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;

