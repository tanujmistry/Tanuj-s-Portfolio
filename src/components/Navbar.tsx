import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, ArrowUpRight, Mail, Terminal } from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { navLinks, personalInfo } from '../data/portfolio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Monitor scroll for subtle background blur and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky background blur
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['hero', ...navLinks.map((link) => link.href.replace('#', ''))];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-900/80 backdrop-blur-md border-b border-navy-700/40 shadow-nav py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo / Initials */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="group flex items-center gap-2.5 text-slate-100 focus:outline-none"
              aria-label="Tanuj Mistry - Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-navy-800 border border-navy-700/80 group-hover:border-circuit-teal/60 transition-colors">
                <span className="font-mono font-bold text-sm tracking-wider text-circuit-teal group-hover:text-circuit-cyan transition-colors">
                  TM
                </span>
                {/* Micro circuit trace node */}
                <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-circuit-teal animate-pulse" />
              </div>

              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm tracking-tight text-white group-hover:text-circuit-teal transition-colors">
                  {personalInfo.name}
                </span>
                <span className="font-mono text-[10px] text-slate-400 tracking-wider hidden sm:block">
                  E&amp;TC // HARDWARE+AI
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative px-3 py-1.5 text-xs font-mono transition-all duration-200 rounded-md group ${
                      isActive
                        ? 'text-circuit-teal font-medium'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-navy-800/50'
                    }`}
                  >
                    <span className="text-circuit-teal/40 group-hover:text-circuit-teal/70 mr-1 text-[10px]">
                      0{idx + 1}.
                    </span>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-circuit-teal to-circuit-cyan rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action: Resume Download Button + Mobile Menu Trigger */}
            <div className="flex items-center gap-3">
              <a
                href="/Tanuj_Mistry_Resume.pdf"
                download="Tanuj_Mistry_Resume.pdf"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono tracking-wide text-circuit-teal border border-circuit-teal/30 bg-circuit-teal/5 hover:bg-circuit-teal/15 hover:border-circuit-teal hover:shadow-glow-subtle transition-all duration-200"
                aria-label="Download Resume"
              >
                <FileDown className="w-3.5 h-3.5 text-circuit-teal" />
                <span>Resume</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 border border-transparent hover:border-navy-700/60 focus:outline-none transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-circuit-teal" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-50 md:hidden"
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-navy-900 border-l border-navy-700/70 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-navy-700/50">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-circuit-teal" />
                    <span className="font-mono text-xs text-circuit-teal tracking-wider uppercase">// Navigation</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-navy-800 focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="mt-8 space-y-2">
                  {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-mono transition-all ${
                          isActive
                            ? 'text-circuit-teal bg-circuit-teal/10 border border-circuit-teal/20 font-medium'
                            : 'text-slate-300 hover:text-white hover:bg-navy-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-circuit-teal/50">0{idx + 1}.</span>
                          <span>{link.name}</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-navy-700/50 space-y-4">
                <a
                  href="/Tanuj_Mistry_Resume.pdf"
                  download="Tanuj_Mistry_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-mono font-medium text-circuit-teal border border-circuit-teal/40 bg-circuit-teal/10 hover:bg-circuit-teal/20 transition-all shadow-glow-subtle"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>

                {/* Direct quick contact links */}
                <div className="flex items-center justify-around pt-2 text-slate-400 text-xs">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-1.5 hover:text-circuit-teal transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                  <span className="text-navy-700">•</span>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-circuit-teal transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
