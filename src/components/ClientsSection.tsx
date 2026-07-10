'use client';

import { useState } from 'react';

const clients = [
  { name: 'Louis Vuitton', tag: 'LUXURY & HAUTE COUTURE' },
  { name: 'OnePlus', tag: 'MOBILE TECHNOLOGY' },
  { name: 'Chanel', tag: 'FASHION & FRAGRANCE' },
  { name: 'Glossier', tag: 'BEAUTY & RETAIL' },
  { name: 'Google', tag: 'CREATIVE LAB LABS' },
  { name: 'Stripe', tag: 'FINTECH & PAYMENTS' },
  { name: 'Apple', tag: 'DESIGN ENGINEERING' },
];

export default function ClientsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen bg-[#0d0e11] py-32 px-6 sm:px-12 flex flex-col justify-center border-b border-[#1b1d24]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[150px_1fr_300px] gap-12 md:gap-8 items-center">
        
        {/* Left Column: Vertical Index Progress */}
        <div className="hidden md:flex flex-col gap-6 text-[11px] font-syne text-gray-500 uppercase tracking-widest border-r border-[#1b1d24]/60 pr-8 h-[400px] justify-between py-4">
          {clients.map((client, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={index}
                className={`transition-all duration-300 flex items-center gap-3 ${
                  isActive ? 'text-white translate-x-2 font-bold' : 'opacity-40'
                }`}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {isActive && (
                  <span className="text-[9px] text-accent tracking-normal border-b border-accent/60 pb-0.5 whitespace-nowrap">
                    — THEY TRUST US
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Center Column: Interactive Client Wheel */}
        <div className="flex flex-col justify-center py-10 relative select-none">
          <div className="flex flex-col gap-4">
            {clients.map((client, index) => {
              const isActive = index === activeIndex;
              
              // Calculate custom rotation and displacement to mimic a curved perspective wheel
              const diff = index - activeIndex;
              const rotateX = diff * -12; // Rotate based on distance
              const translateY = diff * 4; // Shift vertically
              const translateX = Math.abs(diff) * -8; // Curve inward on edges
              const scale = isActive ? 1.05 : 1 - Math.min(Math.abs(diff) * 0.08, 0.3);

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group flex flex-wrap items-center gap-6 cursor-pointer py-1.5 origin-left transition-all duration-500 ease-out"
                  style={{
                    transform: `perspective(600px) rotateX(${rotateX}deg) translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`,
                    opacity: isActive ? 1 : Math.max(1 - Math.abs(diff) * 0.25, 0.15),
                  }}
                >
                  <h2 
                    className={`font-syne font-bold text-[6vw] sm:text-[4.5vw] md:text-[5vw] leading-none transition-all duration-500 ${
                      isActive 
                        ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                        : 'text-gray-600 group-hover:text-gray-300'
                    }`}
                  >
                    {client.name}
                  </h2>

                  {/* Tag label revealing next to client name */}
                  <span 
                    className={`font-syne text-[10px] sm:text-[11px] font-medium tracking-[0.25em] text-accent border border-accent/20 px-2 py-0.5 rounded-xs bg-accent/5 transition-all duration-500 ${
                      isActive 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-4 pointer-events-none'
                    }`}
                  >
                    {client.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Explanatory Paragraph */}
        <div className="flex flex-col justify-start md:border-l border-[#1b1d24]/60 md:pl-8 h-full py-4 justify-between">
          <p className="font-outfit text-sm sm:text-base text-gray-400 leading-relaxed max-w-sm">
            From multinational companies to independent brands, we have been fortunate to work on a diversity of projects and clients. We believe in crafting tailor-made digital landmarks rather than copying standard templates.
          </p>
          
          {/* Subtle animated detail showing current project highlight */}
          <div className="mt-8 pt-8 border-t border-[#1b1d24]/40">
            <span className="block text-[10px] font-syne text-gray-500 uppercase tracking-widest mb-2">
              Current Spotlight
            </span>
            <span className="block text-xs font-outfit text-white font-medium">
              Re-envisioning digital core interfaces with {clients[activeIndex].name}.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
