'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import SlideshowSection from '@/components/SlideshowSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast-acting cursor tracker
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic scale scaling on interactive highlights
    const addHover = () => cursor.classList.add('hovered');
    const removeHover = () => cursor.classList.remove('hovered');

    const refreshListeners = () => {
      const hoverables = document.querySelectorAll('a, button, h2, .group');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    // Initial setup
    refreshListeners();

    // Re-bind when dynamic changes occur (e.g. state changes)
    const observer = new MutationObserver(refreshListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <SmoothScroll>
      {/* Custom Cursor Follower */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      <main className="relative w-full min-h-screen bg-[#0d0e11] overflow-hidden select-none">
        
        {/* Section 1: Hero (State of AI Design Style) */}
        <HeroSection />

        {/* Section 2: Clients Wheel List (From Another Love Style) */}
        <ClientsSection />

        {/* Section 3: Pinned Slideshow (From Another Love Team Style) */}
        <SlideshowSection />

        {/* Section 4: Premium Footer (MyWebLab Style) */}
        <FooterSection />

      </main>
    </SmoothScroll>
  );
}
