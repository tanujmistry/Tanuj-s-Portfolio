import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Wrench, Activity, Sparkles, ArrowRight } from 'lucide-react';
import { type ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-[#FFFFFF] light:text-white"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#27272A] light:border-[#2E353F]">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#030712] light:bg-[#0E1013] text-[#4ADEDE] light:text-[#EA580C] border border-[#27272A] light:border-[#2E353F] font-semibold">
                  {project.category}
                </span>
                {project.isFlagship && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-bold shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#030712] light:text-white" />
                    FLAGSHIP HERO PROJECT
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] light:text-white font-sans tracking-tight">
                {project.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A1A1AA] light:text-gray-400 hover:text-[#FFFFFF] light:hover:text-white hover:bg-[#27272A] light:hover:bg-[#2E353F] border border-transparent hover:border-[#27272A] transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Performance Metric Banner */}
          {project.metrics && (
            <div className="my-5 p-3 rounded-lg bg-[#030712] light:bg-[#0E1013] border border-[#27272A] light:border-[#2E353F] flex items-center gap-2.5 text-xs font-mono text-[#60F1AD] light:text-[#FDBA74] font-semibold">
              <Activity className="w-4 h-4 shrink-0 text-[#60F1AD] light:text-[#FDBA74]" />
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Full Engineering Description */}
          <div className="space-y-4 my-5">
            <div className="text-xs font-mono text-[#4ADEDE] light:text-[#EA580C] uppercase tracking-wider font-bold">
              // ARCHITECTURAL OVERVIEW
            </div>
            <p className="text-sm sm:text-base text-[#A1A1AA] light:text-gray-300 leading-relaxed font-sans">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3 my-5 pt-4 border-t border-[#27272A] light:border-[#2E353F]">
              <div className="text-xs font-mono text-[#4ADEDE] light:text-[#EA580C] uppercase tracking-wider font-bold">
                // KEY IMPLEMENTATION HIGHLIGHTS
              </div>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA] light:text-gray-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#60F1AD] light:text-[#FDBA74] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools & Frameworks */}
          <div className="my-5 pt-4 border-t border-[#27272A] light:border-[#2E353F] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] light:text-gray-400 uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-[#4ADEDE] light:text-[#EA580C]" />
              <span>TOOLS &amp; HARDWARE ENVIRONMENT</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#030712] light:bg-[#0E1013] text-[#FFFFFF] light:text-white border border-[#27272A] light:border-[#2E353F]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#27272A] light:border-[#2E353F] flex flex-wrap items-center justify-between gap-4">
            <a
              href="#contact"
              onClick={() => {
                onClose();
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#4ADEDE] light:text-[#EA580C] hover:underline"
            >
              <span>Discuss this implementation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#030712] light:bg-[#0E1013] hover:bg-[#27272A] light:hover:bg-[#2E353F] border border-[#27272A] light:border-[#2E353F] text-[#FFFFFF] light:text-white text-xs font-mono transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
