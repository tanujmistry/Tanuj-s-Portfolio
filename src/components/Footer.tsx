import React from 'react';
import { personalInfo } from '../data/portfolio';
import { Mail, Phone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-navy-700/60 bg-navy-950/80 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding & Status */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-circuit-teal tracking-wider">&lt;TM /&gt;</span>
              <span className="text-white font-sans font-medium text-sm">{personalInfo.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal animate-pulse" />
            </div>
            <p className="font-mono text-xs text-slate-400 max-w-md">
              Electronics &amp; Telecommunication Engineer • Hardware &amp; AI/ML Systems
            </p>
          </div>

          {/* Center: Social & Contact Links */}
          <div className="flex items-center space-x-5 text-slate-400">
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg bg-navy-900 border border-navy-700 hover:border-circuit-teal hover:text-circuit-teal transition-all"
              aria-label="Email Tanuj Mistry"
              title={personalInfo.email}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-navy-900 border border-navy-700 hover:border-circuit-teal hover:text-circuit-teal transition-all"
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
                className="p-2 rounded-lg bg-navy-900 border border-navy-700 hover:border-circuit-teal hover:text-circuit-teal transition-all"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            <a
              href={`tel:${personalInfo.phone}`}
              className="p-2 rounded-lg bg-navy-900 border border-navy-700 hover:border-circuit-teal hover:text-circuit-teal transition-all"
              aria-label="Phone"
              title={personalInfo.phone}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Copyright & Stack info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-1">
            <div className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
              <span>Designed &amp; Engineered by Tanuj</span>
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              © {currentYear} • Built with React &amp; Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
