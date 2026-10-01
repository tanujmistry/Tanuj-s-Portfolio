import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for Apple-grade smooth inertia scrolling
    const lenis = new Lenis({
      lerp: 0.09, // Silky smooth deceleration curve
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    let lastShow = false;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          if (shouldShow !== lastShow) {
            lastShow = shouldShow;
            setShowScrollTop(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#030712] light:bg-white text-white light:text-[#111827] font-sans selection:bg-[#4ADEDE] selection:text-[#030712] light:selection:bg-[#EA580C] light:selection:text-white flex flex-col transition-colors duration-300">
        {/* Background Cyber Ambience - Hardware GPU accelerated */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform transform-gpu">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-20 light:opacity-40" />

          {/* Ambient radial highlights - reduced on mobile for GPU perf */}
          <div className="absolute -top-40 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#4ADEDE]/5 light:bg-[#EA580C]/5 rounded-full blur-[60px] md:blur-[140px] transform-gpu" />
          <div className="absolute top-1/3 -left-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#60F1AD]/5 light:bg-[#FDBA74]/5 rounded-full blur-[60px] md:blur-[140px] transform-gpu" />
          <div className="absolute bottom-1/4 right-[-10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#4ADEDE]/4 light:bg-[#EA580C]/4 rounded-full blur-[60px] md:blur-[140px] transform-gpu" />
        </div>

        {/* Sticky Top Navbar */}
        <Navbar />

        {/* Main Content Body */}
        <main className="relative z-10 flex-grow pt-20 sm:pt-24">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Scroll to Top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 p-2.5 rounded-lg bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] text-white light:text-white hover:text-[#4ADEDE] light:hover:text-[#EA580C] shadow-lg backdrop-blur-md transition-all focus:outline-none cursor-pointer"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};
