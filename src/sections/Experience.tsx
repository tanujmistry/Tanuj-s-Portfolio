import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { experiences, type ExperienceItem } from '../data/portfolio';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 border-t border-[#D4D4D4] bg-white text-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#050505] tracking-wider uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            <span>// 03 — EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] font-sans tracking-tight">
            Engineering Trajectory
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
            Hands-on technical internships, applied R&amp;D research, and competitive formula student engineering across FPGA accelerators, MedTech diagnostics, and industrial plant instrumentation.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Central Line on Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#D4D4D4]" />

          {/* Vertical Line on Mobile */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-[2px] bg-[#D4D4D4]" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp: ExperienceItem, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className="relative md:grid md:grid-cols-2 md:gap-12 items-center"
                >
                  {/* Timeline Central Node */}
                  {/* Desktop Node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-20 items-center justify-center">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#050505] shadow-sm">
                      {exp.isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#050505] animate-ping" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#050505]" />
                      )}
                    </div>
                  </div>

                  {/* Mobile Node */}
                  <div className="md:hidden absolute left-5 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-[#050505] shadow-sm">
                      {exp.isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-[#050505] animate-ping" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
                      )}
                    </div>
                  </div>

                  {/* Left Column Content (on desktop: Even shows Card, Odd shows Date/Metadata) */}
                  <div
                    className={`${
                      isEven
                        ? 'md:col-start-1 md:text-left'
                        : 'md:col-start-1 md:text-right hidden md:block'
                    } pl-10 md:pl-0`}
                  >
                    {isEven ? (
                      <ExperienceCard exp={exp} />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className="space-y-1.5 pr-6"
                      >
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F5] border border-[#D4D4D4] text-xs font-mono text-[#050505] font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#050505]" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="text-xs font-mono text-[#4B5563]">
                          {exp.location}
                        </div>
                        <div className="text-xs font-mono text-[#6B7280]">
                          // ROLE 0{index + 1}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column Content (on desktop: Even shows Date/Metadata, Odd shows Card) */}
                  <div
                    className={`${
                      isEven
                        ? 'md:col-start-2 md:text-left hidden md:block'
                        : 'md:col-start-2 md:text-left'
                    } pl-10 md:pl-0`}
                  >
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className="space-y-1.5 pl-6"
                      >
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F5] border border-[#D4D4D4] text-xs font-mono text-[#050505] font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#050505]" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="text-xs font-mono text-[#4B5563]">
                          {exp.location}
                        </div>
                        <div className="text-xs font-mono text-[#6B7280]">
                          // ROLE 0{index + 1}
                        </div>
                      </motion.div>
                    ) : (
                      <ExperienceCard exp={exp} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Experience Card with reveal animations
const ExperienceCard: React.FC<{ exp: ExperienceItem }> = ({
  exp,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl bg-white border ${
        exp.isCurrent
          ? 'border-[#050505] shadow-md'
          : 'border-[#D4D4D4] hover:border-[#050505]'
      } p-6 transition-all duration-300 shadow-sm`}
    >
      {/* Top Header: Badge + Title + Company */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#D4D4D4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#111827] font-sans group-hover:text-black transition-colors">
              {exp.role}
            </h3>
            {exp.isCurrent && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#050505] text-white">
                ACTIVE
              </span>
            )}
          </div>

          <div className="text-sm font-mono text-[#050505] font-semibold">
            {exp.organization}
          </div>
        </div>

        {/* Mobile Date Tag (visible on smaller screens) */}
        <div className="md:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F4F4F5] border border-[#D4D4D4] text-xs font-mono text-[#111827]">
          <Calendar className="w-3 h-3 text-[#050505]" />
          <span>{exp.period}</span>
        </div>
      </div>

      {/* Role Meta Subtitle: Location & Type */}
      <div className="flex items-center gap-3 pt-2 text-xs font-mono text-[#4B5563]">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#050505]" />
          {exp.location}
        </span>
        <span>•</span>
        <span className="px-2 py-0.5 rounded bg-[#F4F4F5] text-[#374151] border border-[#D4D4D4]">
          {exp.type}
        </span>
      </div>

      {/* Concise summary */}
      <p className="text-sm text-[#374151] mt-3 leading-relaxed font-sans">
        {exp.description}
      </p>

      {/* Bullet Points from Resume */}
      <ul className="mt-4 space-y-2">
        {exp.achievements.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#374151] leading-relaxed"
          >
            <ChevronRight className="w-4 h-4 text-[#050505] shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Technology Tags */}
      <div className="mt-5 pt-4 border-t border-[#D4D4D4] flex flex-wrap gap-1.5">
        {exp.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#F4F4F5] text-[#111827] border border-[#D4D4D4] hover:border-[#050505] transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
