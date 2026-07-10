'use client';

import { ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function FooterSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    // Magnetic CTA hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cta.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Soft pull effect
      gsap.to(cta, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.4,
        ease: 'power2.out',
      });

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          x: x * 0.25,
          rotate: x * 0.1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cta, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          x: 0,
          rotate: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    cta.addEventListener('mousemove', handleMouseMove);
    cta.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cta.removeEventListener('mousemove', handleMouseMove);
      cta.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <footer className="w-full bg-[#e8e9eb] text-[#0d0e11] py-24 px-6 sm:px-12 flex flex-col justify-between relative overflow-hidden select-none">
      
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-20">
        
        {/* Giant Magnetic Call to Action */}
        <div className="border-b border-[#0d0e11]/10 pb-16 flex justify-start">
          <div 
            ref={ctaRef}
            className="group cursor-pointer inline-flex items-center gap-6 py-2 transition-all duration-300"
          >
            <h2 className="font-syne font-extrabold text-[7vw] sm:text-[5vw] leading-none tracking-tight uppercase hover:text-accent transition-colors duration-300">
              Iniziamo il progetto
            </h2>
            <span 
              ref={arrowRef}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0d0e11] text-[#e8e9eb] flex items-center justify-center group-hover:bg-accent group-hover:text-[#0d0e11] transition-all duration-300 shadow-md"
            >
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </span>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-8">
          
          {/* Col 1: Servizi */}
          <div className="flex flex-col gap-6">
            <h4 className="font-syne text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Servizi
            </h4>
            <ul className="flex flex-col gap-3 font-outfit text-sm font-medium text-[#0d0e11]/80">
              <li className="hover:text-accent cursor-pointer transition-colors">Siti Web</li>
              <li className="hover:text-accent cursor-pointer transition-colors">E-commerce</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Consulenza SEO</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Integrazione AI</li>
            </ul>
          </div>

          {/* Col 2: Naviga */}
          <div className="flex flex-col gap-6">
            <h4 className="font-syne text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Naviga
            </h4>
            <ul className="flex flex-col gap-3 font-outfit text-sm font-medium text-[#0d0e11]/80">
              <li className="hover:text-accent cursor-pointer transition-colors">Home</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Web Agency a Milano</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Contatti</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Cookie Policy</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Gestisci cookie</li>
            </ul>
          </div>

          {/* Col 3: Contatti */}
          <div className="flex flex-col gap-6">
            <h4 className="font-syne text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Contatti
            </h4>
            <ul className="flex flex-col gap-2 font-outfit text-sm text-[#0d0e11]/80">
              <li className="font-semibold text-base mb-1">+39 327 1573498</li>
              <li>info@myweblab.it</li>
              <li className="text-gray-500 text-xs mt-2 leading-relaxed">
                Via Cassanese 41, 20054 Segrate (MI)<br />
                P.IVA 11659180969
              </li>
            </ul>
          </div>

          {/* Col 4: Social & Recognition */}
          <div className="flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-6">
              <h4 className="font-syne text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Social
              </h4>
              <ul className="flex flex-col gap-3 font-outfit text-sm font-medium text-[#0d0e11]/80">
                <li className="hover:text-accent cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Dribbble</li>
              </ul>
            </div>
            
            {/* Awwwards Recognition badge */}
            <div className="pt-6 border-t border-[#0d0e11]/10 flex flex-col gap-1.5">
              <span className="font-syne text-[9px] font-extrabold tracking-widest text-[#0d0e11]">
                awwwards.<span className="text-accent">winners</span>
              </span>
              <span className="text-[8px] font-outfit text-gray-500 uppercase tracking-wider">
                Honorable Mention 2026
              </span>
            </div>
          </div>

        </div>

        {/* Legal Bottom line */}
        <div className="border-t border-[#0d0e11]/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-outfit text-gray-400">
          <span>© 2026 WebLab. Rebuilt by ZaysBerkuasa.</span>
          <span>Designed with first principles.</span>
        </div>

      </div>
    </footer>
  );
}
