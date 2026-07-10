'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const slides = [
  {
    num: '01',
    src: '/flower_orange.png',
    text: "What started in Tokyo as a creative partnership which became the foundation of everything we've built. The curiosity never stops there."
  },
  {
    num: '02',
    src: '/flower_pink.png',
    text: "Expanding our boundaries across Europe and North America to cultivate fresh visual perspectives in fashion, design, and haute couture."
  },
  {
    num: '03',
    src: '/flower_white.png',
    text: "Fusing tech-driven backend architectures with state-of-the-art editorial layouts. Dissolving limits between human craft and code."
  },
  {
    num: '04',
    src: '/flower_grey.png',
    text: "Our design lab operates as an autonomous digital guild. Engineering custom tailored visual systems that win attention globally."
  }
];

export default function SlideshowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const select = gsap.utils.selector(containerRef);
    const imageCards = select('.slide-image-card');
    const numbers = select('.slide-num');
    const texts = select('.slide-text');

    // Create the master timeline that controls pinning and sub-animations
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Scroll length of 3 window heights
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
      }
    });

    // Animate progress line sidebar
    masterTimeline.to(progressLineRef.current, {
      height: '100%',
      ease: 'none',
    }, 0);

    // Initial state: first slide visible, others hidden
    gsap.set(imageCards.slice(1), { opacity: 0, scale: 1.1, yPercent: 10 });
    gsap.set(numbers.slice(1), { yPercent: 100, opacity: 0 });
    gsap.set(texts.slice(1), { yPercent: 30, opacity: 0 });

    // Build timeline transitions between slides
    slides.forEach((_, index) => {
      if (index === slides.length - 1) return;

      const nextIndex = index + 1;
      const timeStart = index * 1; // Timing segments

      // Image Card Transition (Fade & Scale & Slide up)
      masterTimeline.to(imageCards[index], {
        opacity: 0,
        scale: 0.9,
        yPercent: -10,
        duration: 1,
        ease: 'power2.inOut',
      }, timeStart);

      masterTimeline.to(imageCards[nextIndex], {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, timeStart);

      // Large Number Transition (Slide up and out)
      masterTimeline.to(numbers[index], {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, timeStart);

      masterTimeline.to(numbers[nextIndex], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, timeStart);

      // Description Text Transition (Fade & Slide up)
      masterTimeline.to(texts[index], {
        yPercent: -30,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, timeStart);

      masterTimeline.to(texts[nextIndex], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, timeStart);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#090a0d] flex items-center overflow-hidden border-b border-[#1b1d24]"
    >
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 grid grid-cols-1 md:grid-cols-[160px_1fr_320px] gap-12 items-center h-full relative">
        
        {/* Left: Custom Sidebar Indicators */}
        <div className="hidden md:flex flex-row items-center h-[300px] gap-6 relative">
          {/* Vertical progress rail */}
          <div className="w-[1px] h-full bg-[#1b1d24] relative">
            <div 
              ref={progressLineRef}
              className="absolute top-0 left-0 w-[1px] h-[0%] bg-accent transition-all duration-100" 
            />
          </div>
          <div className="flex flex-col justify-between h-full py-2 text-[10px] font-syne text-gray-500 uppercase tracking-widest">
            <span className="opacity-40">01</span>
            <span className="opacity-40">02</span>
            <span className="opacity-40">03</span>
            <div className="flex items-center gap-2 text-white font-bold translate-x-1">
              <span>04</span>
              <span className="text-[8px] text-accent">— OUR TEAM</span>
            </div>
            <span className="opacity-40">05</span>
            <span className="opacity-40">06</span>
            <span className="opacity-40">07</span>
          </div>
        </div>

        {/* Left-Middle: Massive Number Display */}
        <div 
          ref={numberContainerRef}
          className="relative h-[200px] sm:h-[300px] flex items-center justify-start overflow-hidden select-none"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="slide-num absolute font-syne font-extrabold text-[18vw] sm:text-[14vw] md:text-[12vw] leading-none text-white/5 tracking-tighter"
            >
              {slide.num}
            </div>
          ))}
        </div>

        {/* Center: Vertical Image Frame */}
        <div 
          ref={imageContainerRef}
          className="relative w-full max-w-[400px] aspect-[3/4] mx-auto bg-[#13151c] p-2 border border-[#2b2e3a]/30 shadow-2xl rounded-sm overflow-hidden"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="slide-image-card absolute inset-2 overflow-hidden"
            >
              <Image
                src={slide.src}
                alt={`Team Slide ${slide.num}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          ))}
        </div>

        {/* Right: Text Descriptions */}
        <div 
          ref={textContainerRef}
          className="relative h-[200px] flex items-center md:pl-8 md:border-l border-[#1b1d24]/60"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="slide-text absolute w-full pr-4"
            >
              <p className="font-outfit text-sm sm:text-base text-gray-400 leading-relaxed">
                {slide.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
