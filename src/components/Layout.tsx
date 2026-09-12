import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="relative min-h-screen bg-navy-900 text-slate-100 font-sans selection:bg-circuit-teal/20 selection:text-circuit-teal flex flex-col">
      {/* Background Engineering Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Ambient radial glows */}
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-circuit-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-circuit-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-circuit-teal/4 rounded-full blur-3xl" />
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
            className="fixed bottom-6 right-6 z-40 p-2.5 rounded-lg bg-navy-800/90 border border-circuit-teal/30 hover:border-circuit-teal text-circuit-teal hover:bg-circuit-teal/10 shadow-card backdrop-blur-md transition-all focus:outline-none"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
