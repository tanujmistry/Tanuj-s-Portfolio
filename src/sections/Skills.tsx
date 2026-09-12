import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Microchip,
  BrainCircuit,
  Activity,
  Network,
  Code,
  Wrench,
  Layers,
} from 'lucide-react';
import { skillCategories, type SkillCategory } from '../data/portfolio';

// Icon resolver for dynamic icon rendering
const getCategoryIcon = (iconName: string) => {
  const iconProps = { className: 'w-5 h-5 text-circuit-teal' };
  switch (iconName) {
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'Microchip':
      return <Microchip {...iconProps} />;
    case 'BrainCircuit':
      return <BrainCircuit {...iconProps} />;
    case 'Activity':
      return <Activity {...iconProps} />;
    case 'Network':
      return <Network {...iconProps} />;
    case 'Code':
      return <Code {...iconProps} />;
    case 'Wrench':
      return <Wrench {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
};

// Priority/Flagship skills that receive an electric accent marker
const highlightSkills = new Set([
  'Xilinx Vivado',
  'Verilog HDL',
  'ARM Cortex',
  'CAN Bus',
  'TensorFlow',
  'Convolutional Neural Networks (CNN)',
  'Digital Signal Processing (DSP)',
  'Embedded C',
  'MATLAB / Simulink',
]);

type FilterTab = 'all' | 'hardware' | 'ai-dsp' | 'software';

export const Skills: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // Filter categories according to engineering domains
  const filteredCategories = skillCategories.filter((cat) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'hardware') return cat.id === 'fpga' || cat.id === 'embedded';
    if (activeFilter === 'ai-dsp') return cat.id === 'ml-ai' || cat.id === 'dsp-rf';
    if (activeFilter === 'software') return cat.id === 'languages' || cat.id === 'protocols' || cat.id === 'tools';
    return true;
  });

  return (
    <section id="skills" className="relative py-24 border-t border-navy-700/50 overflow-hidden">
      {/* Subtle background ambient radial glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-circuit-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-circuit-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-circuit-teal tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal" />
              <span>// 02 — TECHNICAL SKILLS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
              Hardware &amp; Software Matrix
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Curated technical stack spanning silicon RTL synthesis, embedded microcontrollers, signal processing pipelines, and deep neural networks.
            </p>
          </div>

          {/* Quick Domain Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-navy-950 border border-navy-700/70 text-xs font-mono">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'hardware', label: 'Hardware & FPGA' },
              { id: 'ai-dsp', label: 'AI/ML & DSP' },
              { id: 'software', label: 'Protocols & Code' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterTab)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeFilter === tab.id
                    ? 'bg-circuit-teal/15 text-circuit-teal border border-circuit-teal/40 font-semibold shadow-glow-subtle'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCategories.map((cat: SkillCategory, index: number) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative rounded-xl bg-navy-800/80 border border-navy-700/70 hover:border-circuit-teal/50 transition-all duration-300 p-6 flex flex-col justify-between shadow-card hover:shadow-glow-subtle backdrop-blur-sm"
              >
                <div>
                  {/* Card Header: Icon + Title + Skill Count */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-navy-700/60">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-navy-900 border border-navy-700 group-hover:border-circuit-teal/40 transition-colors">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white font-sans group-hover:text-circuit-teal transition-colors">
                          {cat.title}
                        </h3>
                        <span className="font-mono text-[10px] text-slate-400">
                          // DOMAIN 0{index + 1}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-900 text-slate-400 border border-navy-700">
                      {cat.skills.length} skills
                    </span>
                  </div>

                  {/* Skill Badges / Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => {
                      const isHighlighted = highlightSkills.has(skill);
                      return (
                        <span
                          key={skill}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-default select-none ${
                            isHighlighted
                              ? 'bg-circuit-teal/10 text-circuit-teal border border-circuit-teal/30 hover:border-circuit-teal hover:bg-circuit-teal/20 font-medium'
                              : 'bg-navy-900/90 text-slate-300 border border-navy-700/80 hover:border-navy-600 hover:text-white hover:bg-navy-850'
                          }`}
                        >
                          {isHighlighted && (
                            <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal" />
                          )}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Subdued Bottom Indicator */}
                <div className="mt-6 pt-3 border-t border-navy-700/30 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-circuit-teal/60" />
                    Verified Production / Lab Experience
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Legend */}
        <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-navy-700/30 px-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-circuit-teal">
              <span className="w-2 h-2 rounded-full bg-circuit-teal" />
              <span>Teal Badge:</span>
            </span>
            <span>Flagship project / core specialization stack</span>
          </div>

          <div className="text-slate-400">
            Total verified skills: {skillCategories.reduce((acc, c) => acc + c.skills.length, 0)} across 7 technical disciplines
          </div>
        </div>
      </div>
    </section>
  );
};
