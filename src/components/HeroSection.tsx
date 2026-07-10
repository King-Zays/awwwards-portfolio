'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out' }
    );

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      // Random starting directions for entrance
      const xOffset = (index % 2 === 0 ? 1 : -1) * 100;
      const yOffset = (index < 2 ? -1 : 1) * 100;

      tl.fromTo(
        card,
        { x: xOffset, y: yOffset, opacity: 0, scale: 0.9 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out' },
        '-=1.4'
      );
    });

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse coordinates to range [-0.5, 0.5]
      const mouseX = (clientX / innerWidth) - 0.5;
      const mouseY = (clientY / innerHeight) - 0.5;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        // Different speed multipliers for 3D depth effect
        const speedX = (index + 1) * 35;
        const speedY = (index + 1) * 25;

        gsap.to(card, {
          x: mouseX * speedX,
          y: mouseY * speedY,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cards = [
    { src: '/flower_orange.png', label: 'DESIGN ENGINEER', pos: 'top-[8%] right-[12%] w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]' },
    { src: '/flower_pink.png', label: 'HEAD OF DESIGN', pos: 'top-[5%] left-[8%] w-[190px] h-[190px] sm:w-[240px] sm:h-[240px]' },
    { src: '/flower_white.png', label: 'FREELANCER', pos: 'bottom-[12%] right-[5%] w-[160px] h-[220px] sm:w-[200px] sm:h-[280px]' },
    { src: '/flower_grey.png', label: 'BRAND DESIGNER', pos: 'bottom-[8%] left-[10%] w-[210px] h-[150px] sm:w-[280px] sm:h-[200px]' },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#0d0e11] overflow-hidden flex items-center justify-center border-b border-[#1b1d24]"
    >
      {/* Floating Collage Cards */}
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => { cardRefs.current[index] = el; }}
          className={`absolute ${card.pos} z-10 bg-[#16181f] p-2 border border-[#2b2e3a]/40 shadow-2xl rounded-sm transition-shadow duration-300 hover:shadow-accent/10 hover:border-accent/30`}
        >
          <div className="relative w-full h-full overflow-hidden group">
            <Image 
              src={card.src}
              alt={card.label}
              fill
              className="object-cover filter grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              sizes="300px"
              priority
            />
            {/* Minimal label overlay */}
            <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-0.5 text-[8px] sm:text-[9px] font-syne text-gray-400 tracking-widest border border-white/5 uppercase">
              {card.label}
            </div>
          </div>
        </div>
      ))}

      {/* Hero Title Block */}
      <div 
        ref={titleRef}
        className="relative z-20 flex flex-col items-center bg-black border border-white/10 px-8 py-6 sm:px-14 sm:py-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-xs pointer-events-none"
      >
        <h1 className="font-syne font-extrabold text-[4vw] min-text-[32px] max-text-[90px] text-white leading-none tracking-tight select-none uppercase">
          Ai in Design
        </h1>
        <span className="font-syne font-bold text-[3.2vw] min-text-[26px] max-text-[70px] text-white/95 leading-none tracking-wide select-none">
          2026<span className="text-[1.5vw] align-super text-accent">™</span>
        </span>
      </div>

      {/* Decorative ambient lighting behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}
