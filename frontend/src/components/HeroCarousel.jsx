import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Copy, Check } from 'lucide-react';
import { HERO_SLIDES } from '../data/banners';
import { useCart } from '../context/CartContext';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { showToast } = useCart();
  const slideCount = HERO_SLIDES.length;
  const timerRef = useRef(null);

  // Auto sliding
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slideCount);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, slideCount]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  const copyCoupon = (code, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const activeSlide = HERO_SLIDES[current];

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-900 group select-none shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="hero-carousel"
    >
      {/* Slides Container */}
      <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
        {/* Background Image with Ken Burns / smooth transition */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-105"
          style={{ backgroundImage: `url(${activeSlide.image})` }}
        />

        {/* Dynamic Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${activeSlide.gradient}`} />

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 w-full">
          <div className="max-w-2xl text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-pink-500/90 text-white backdrop-blur-md mb-4 shadow-sm">
              <Sparkles size={13} className="text-yellow-300" />
              <span>{activeSlide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white drop-shadow-sm mb-3">
              {activeSlide.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg sm:text-2xl font-bold text-pink-300 tracking-wide mb-3">
              {activeSlide.subtitle}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-200 line-clamp-2 max-w-xl mb-6">
              {activeSlide.description}
            </p>

            {/* CTA and Coupon Box */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={activeSlide.link}
                className="px-7 py-3.5 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-bold text-sm sm:text-base rounded-md shadow-lg shadow-pink-600/40 hover:shadow-pink-600/60 transform hover:-translate-y-0.5 transition duration-200"
              >
                {activeSlide.ctaText}
              </Link>

              {activeSlide.coupon && (
                <button
                  type="button"
                  onClick={(e) => copyCoupon(activeSlide.coupon, e)}
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md rounded-md text-white text-xs sm:text-sm font-semibold transition"
                  title="Click to copy coupon code"
                >
                  <span className="text-gray-300">CODE:</span>
                  <span className="font-mono text-yellow-300 font-bold tracking-wider">{activeSlide.coupon}</span>
                  {copiedCode === activeSlide.coupon ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} className="text-gray-300 hover:text-white" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrow Controls */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        id="carousel-prev-btn"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition opacity-80 group-hover:opacity-100 hover:scale-105 active:scale-95"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        id="carousel-next-btn"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition opacity-80 group-hover:opacity-100 hover:scale-105 active:scale-95"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              current === idx
                ? 'w-8 h-2.5 bg-pink-500'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
