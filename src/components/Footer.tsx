import React from 'react';
import { personalInfo } from '../data/portfolio';
import { Mail, Phone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[#D4D4D4] bg-[#FAFAFA] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding & Status */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#050505] tracking-wider">&lt;TM /&gt;</span>
              <span className="text-[#111827] font-sans font-bold text-sm">{personalInfo.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            </div>
            <p className="font-mono text-xs text-[#4B5563] max-w-md">
              Electronics &amp; Telecommunication Engineer • Hardware &amp; AI/ML Systems
            </p>
          </div>

          {/* Center: Social & Contact Links */}
          <div className="flex items-center space-x-4 text-[#4B5563]">
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-lg bg-white border border-[#D4D4D4] hover:border-[#050505] hover:text-[#050505] shadow-sm transition-all"
              aria-label="Email Tanuj Mistry"
              title={personalInfo.email}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white border border-[#D4D4D4] hover:border-[#050505] hover:text-[#050505] shadow-sm transition-all"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white border border-[#D4D4D4] hover:border-[#050505] hover:text-[#050505] shadow-sm transition-all"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            <a
              href={`tel:${personalInfo.phone}`}
              className="p-2.5 rounded-lg bg-white border border-[#D4D4D4] hover:border-[#050505] hover:text-[#050505] shadow-sm transition-all"
              aria-label="Phone"
              title={personalInfo.phone}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Copyright & Stack info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-1">
            <div className="font-mono text-xs text-[#4B5563] flex items-center gap-1.5">
              <span>Designed &amp; Engineered by Tanuj</span>
            </div>
            <div className="font-mono text-[11px] text-[#6B7280]">
              © {currentYear} • Algorithmic Monochromatic System
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
