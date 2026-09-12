import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#030712] light:bg-white text-white light:text-[#111827] font-sans selection:bg-[#4ADEDE] selection:text-[#030712] flex flex-col transition-colors duration-300">
        {/* Background Cyber Ambience */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-20 light:opacity-40" />

          {/* Ambient cyan and mint radial highlights */}
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#4ADEDE]/5 light:bg-black/[0.02] rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[#60F1AD]/5 light:bg-black/[0.02] rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-[#4ADEDE]/4 light:bg-black/[0.015] rounded-full blur-[140px]" />
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
              className="fixed bottom-6 right-6 z-40 p-2.5 rounded-lg bg-[#18181B] light:bg-white border border-[#27272A] light:border-[#D4D4D4] hover:border-[#4ADEDE] text-white light:text-[#111827] hover:text-[#4ADEDE] shadow-lg backdrop-blur-md transition-all focus:outline-none cursor-pointer"
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
