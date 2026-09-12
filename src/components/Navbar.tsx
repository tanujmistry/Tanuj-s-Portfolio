import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, ArrowUpRight, Mail, Terminal, Sun, Moon } from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { navLinks, personalInfo } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/85 light:bg-white/90 backdrop-blur-md border-b border-[#27272A] light:border-[#D4D4D4] shadow-md py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo / Initials */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="group flex items-center gap-2.5 text-white light:text-[#111827] focus:outline-none"
              aria-label="Tanuj Mistry - Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#18181B] light:bg-[#050505] text-[#4ADEDE] border border-[#27272A] light:border-[#050505] group-hover:border-[#4ADEDE] transition-all">
                <span className="font-mono font-bold text-sm tracking-wider text-[#4ADEDE] light:text-white">
                  TM
                </span>
                {/* Micro algorithmic trace dot in #60F1AD */}
                <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#60F1AD] border border-[#030712]" />
              </div>

              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm tracking-tight text-white light:text-[#111827] group-hover:text-[#4ADEDE] transition-colors">
                  {personalInfo.name}
                </span>
                <span className="font-mono text-[10px] text-[#A1A1AA] light:text-[#4B5563] tracking-wider hidden sm:block">
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
                        ? 'text-[#4ADEDE] light:text-[#050505] font-semibold'
                        : 'text-[#A1A1AA] light:text-[#4B5563] hover:text-white light:hover:text-[#111827] hover:bg-[#18181B] light:hover:bg-[#F4F4F5]'
                    }`}
                  >
                    <span className="text-[#60F1AD] light:text-[#9CA3AF] mr-1 text-[10px]">
                      0{idx + 1}.
                    </span>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#4ADEDE] light:bg-[#050505] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action: Theme Toggle + Resume Download + Mobile Trigger */}
            <div className="flex items-center gap-2.5">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-[#18181B] light:bg-[#F4F4F5] border border-[#27272A] light:border-[#D4D4D4] hover:border-[#4ADEDE] transition-all cursor-pointer focus:outline-none"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#4ADEDE] transition-transform duration-300 hover:rotate-90" />
                ) : (
                  <Moon className="w-4 h-4 text-[#0284C7] transition-transform duration-300 hover:-rotate-12" />
                )}
              </button>

              <a
                href="/Tanuj_Mistry_Resume.pdf"
                download="Tanuj_Mistry_Resume.pdf"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wide text-[#030712] font-bold bg-[#4ADEDE] hover:bg-[#3bc4c4] border border-[#4ADEDE] shadow-md transition-all duration-200"
                aria-label="Download Resume"
              >
                <FileDown className="w-3.5 h-3.5 text-[#030712]" />
                <span>Resume</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-white light:text-[#111827] hover:bg-[#18181B] light:hover:bg-[#F4F4F5] border border-[#27272A] light:border-[#D4D4D4] focus:outline-none transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#4ADEDE]" /> : <Menu className="w-5 h-5" />}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#18181B] light:bg-white border-l border-[#27272A] light:border-[#D4D4D4] z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#27272A] light:border-[#D4D4D4]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#4ADEDE]" />
                    <span className="font-mono text-xs text-[#4ADEDE] font-bold tracking-wider uppercase">// Navigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Mobile theme toggle */}
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="p-1.5 rounded-md bg-[#030712] light:bg-[#F4F4F5] border border-[#27272A] light:border-[#D4D4D4] text-[#4ADEDE] light:text-[#0284C7] focus:outline-none"
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#27272A] focus:outline-none"
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
                        className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-mono transition-all ${
                          isActive
                            ? 'text-[#4ADEDE] bg-[#030712] border border-[#4ADEDE]/40 font-semibold'
                            : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]/50'
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
              <div className="pt-6 border-t border-[#27272A] light:border-[#D4D4D4] space-y-4">
                <a
                  href="/Tanuj_Mistry_Resume.pdf"
                  download="Tanuj_Mistry_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-mono font-bold text-[#030712] bg-[#4ADEDE] hover:bg-[#3bc4c4] transition-all shadow-md"
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
                  <span className="text-[#27272A]">•</span>
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
