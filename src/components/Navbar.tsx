import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, ArrowUpRight, Mail, Sun, Moon } from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { navLinks, personalInfo } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Monitor scroll for subtle background blur and active section tracking without layout thrashing
  useEffect(() => {
    let lastScrolled = false;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 24;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Use IntersectionObserver for buttery-smooth active section tracking (zero DOM queries during scroll)
    const sectionIds = ['hero', ...navLinks.map((link) => link.href.replace('#', ''))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-70px 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
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
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(element, { offset: -70 });
      } else {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-macos-scrolled py-3'
            : 'glass-macos py-4 sm:py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo / Atom Icon */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="group flex items-center gap-2.5 text-white light:text-[#111827] focus:outline-none"
              aria-label="Tanuj Mistry - Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.08] light:bg-black/[0.04] backdrop-blur-md border border-white/15 light:border-black/10 group-hover:border-[#4ADEDE] light:group-hover:border-[#EA580C] shadow-sm transition-all overflow-visible p-1">
                <img
                  src="/assets/atom-logo.png"
                  alt="Tanuj Mistry Atom Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(74,222,222,0.4)] light:drop-shadow-[0_0_6px_rgba(234,88,12,0.3)] animate-atom-spin group-hover:drop-shadow-[0_0_14px_rgba(74,222,222,0.8)] light:group-hover:drop-shadow-[0_0_12px_rgba(234,88,12,0.6)] group-hover:scale-110 transition-all duration-300"
                />
                {/* Micro algorithmic trace dot in #60F1AD */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#60F1AD] light:bg-[#EA580C] border-2 border-[#030712] light:border-white shadow-sm" />
              </div>

              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm tracking-tight text-white light:text-[#111827] group-hover:text-[#4ADEDE] light:group-hover:text-[#EA580C] transition-colors">
                  {personalInfo.name}
                </span>
                <span className="font-mono text-[10px] text-[#A1A1AA] light:text-[#4B5563] tracking-wider hidden sm:block">
                  E&amp;TC // HARDWARE+AI
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (macOS style translucent glass pill group) */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 p-1 rounded-full bg-white/[0.05] light:bg-black/[0.04] border border-white/[0.08] light:border-black/[0.06] backdrop-blur-md shadow-inner">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative px-3.5 py-1.5 text-xs font-mono transition-all duration-200 rounded-full group ${
                      isActive
                        ? 'text-[#4ADEDE] light:text-[#EA580C] font-semibold'
                        : 'text-[#A1A1AA] light:text-[#4B5563] hover:text-white light:hover:text-[#111827] hover:bg-white/[0.08] light:hover:bg-black/[0.05]'
                    }`}
                  >
                    <span className="text-[#60F1AD] light:text-[#EA580C] mr-1 text-[10px]">
                      0{idx + 1}.
                    </span>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-white/10 light:bg-black/5 rounded-full border border-white/10 light:border-black/10 -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action: Theme Toggle + Resume Download + Mobile/Tablet Trigger */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* macOS Segmented Theme Switcher */}
              <div
                className="flex items-center p-0.5 rounded-full bg-white/[0.08] light:bg-black/[0.04] backdrop-blur-md border border-white/15 light:border-black/10 shadow-inner"
                role="radiogroup"
                aria-label="Theme switcher"
              >
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer min-h-[32px] ${
                    theme === 'dark'
                      ? 'bg-[#030712]/90 text-[#4ADEDE] border border-white/15 shadow-sm font-bold'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                  }`}
                  aria-checked={theme === 'dark'}
                  role="radio"
                  title="Activate Dark Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Dark</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer min-h-[32px] ${
                    theme === 'light'
                      ? 'bg-white text-[#EA580C] border border-black/10 shadow-sm font-bold'
                      : 'text-[#A1A1AA] light:text-[#6B7280] hover:text-[#111827] hover:bg-black/5'
                  }`}
                  aria-checked={theme === 'light'}
                  role="radio"
                  title="Activate Light Mode"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Light</span>
                </button>
              </div>

              <a
                href="/Tanuj_Mistry_Resume.pdf"
                download="Tanuj_Mistry_Resume.pdf"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wide text-[#030712] light:text-white font-bold bg-[#4ADEDE] light:bg-[#EA580C] hover:brightness-110 active:scale-95 shadow-[0_2px_14px_rgba(74,222,222,0.35)] light:shadow-[0_2px_14px_rgba(234,88,12,0.35)] transition-all duration-200 min-h-[34px]"
                aria-label="Download Resume"
              >
                <FileDown className="w-3.5 h-3.5 text-[#030712] light:text-white" />
                <span>Resume</span>
              </a>

              {/* Mobile / Tablet Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-w-[42px] min-h-[42px] p-2.5 rounded-full text-white light:text-[#111827] bg-white/[0.08] light:bg-black/[0.04] backdrop-blur-md border border-white/15 light:border-black/10 hover:bg-white/[0.14] light:hover:bg-black/[0.08] focus:outline-none transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#4ADEDE]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile & Tablet Slide-in Drawer */}
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-80 sm:w-96 max-w-[88vw] bg-[#030712]/85 light:bg-white/85 backdrop-blur-2xl backdrop-saturate-[190%] border-l border-white/10 light:border-black/10 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pr-[calc(1.5rem+env(safe-area-inset-right,0px))] overscroll-contain"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 light:border-black/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 light:bg-black/5 backdrop-blur-md border border-white/15 light:border-black/10 p-0.5 flex items-center justify-center">
                      <img src="/assets/atom-logo.png" alt="Atom Logo" className="w-full h-full object-contain animate-atom-spin" />
                    </div>
                    <span className="font-mono text-xs text-[#4ADEDE] font-bold tracking-wider uppercase">// Navigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Mobile segmented theme toggle */}
                    <div className="flex items-center p-0.5 rounded-full bg-white/10 light:bg-black/5 border border-white/15 light:border-black/10">
                      <button
                        type="button"
                        onClick={() => setTheme('dark')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                          theme === 'dark'
                            ? 'bg-[#18181B] text-[#4ADEDE] border border-[#4ADEDE]/40 font-bold shadow-sm'
                            : 'text-[#A1A1AA]'
                        }`}
                        title="Dark Mode"
                      >
                        <Moon className="w-3 h-3" />
                        <span>Dark</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme('light')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                          theme === 'light'
                            ? 'bg-white text-[#EA580C] border border-[#EA580C]/40 font-bold shadow-sm'
                            : 'text-[#A1A1AA] light:text-[#6B7280]'
                        }`}
                        title="Light Mode"
                      >
                        <Sun className="w-3 h-3" />
                        <span>Light</span>
                      </button>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 focus:outline-none"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
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
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono transition-all ${
                          isActive
                            ? 'text-[#4ADEDE] bg-white/10 border border-[#4ADEDE]/40 font-semibold shadow-sm'
                            : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#60F1AD]">0{idx + 1}.</span>
                          <span>{link.name}</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-white/10 light:border-black/10 space-y-4">
                <a
                  href="/Tanuj_Mistry_Resume.pdf"
                  download="Tanuj_Mistry_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-mono font-bold text-[#030712] bg-[#4ADEDE] hover:brightness-110 transition-all shadow-md"
                >
                  <FileDown className="w-4 h-4 text-[#030712]" />
                  <span>Download Resume (PDF)</span>
                </a>

                {/* Direct quick contact links */}
                <div className="flex items-center justify-around pt-2 text-[#A1A1AA] text-xs">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-1.5 hover:text-[#4ADEDE] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                  <span className="text-white/20">•</span>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#4ADEDE] transition-colors"
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
