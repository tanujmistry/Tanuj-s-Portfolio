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
  const iconProps = { className: 'w-5 h-5 text-[#4ADEDE]' };
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

// Priority/Flagship skills that receive high-contrast cyan badge
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
    <section id="skills" className="relative py-20 sm:py-24 lg:py-28 border-t border-[#27272A] light:border-gray-200 bg-[#030712] light:bg-white overflow-hidden text-[#FFFFFF] light:text-[#111827] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#4ADEDE] light:text-[#0284C7] tracking-wider uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60F1AD]" />
              <span>// 02 — TECHNICAL SKILLS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFFFF] light:text-[#111827] font-sans tracking-tight">
              Hardware &amp; Software Matrix
            </h2>
            <p className="text-[#A1A1AA] light:text-[#4B5563] text-sm sm:text-base leading-relaxed">
              Curated technical stack spanning silicon RTL synthesis, embedded microcontrollers, signal processing pipelines, and deep neural networks.
            </p>
          </div>

          {/* Quick Domain Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#18181B] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-300 text-xs font-mono">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'hardware', label: 'Hardware & FPGA' },
              { id: 'ai-dsp', label: 'AI/ML & DSP' },
              { id: 'software', label: 'Protocols & Code' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterTab)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#4ADEDE] text-[#030712] font-bold shadow-sm'
                    : 'text-[#A1A1AA] light:text-[#4B5563] hover:text-[#FFFFFF] light:hover:text-[#111827] hover:bg-[#27272A] light:hover:bg-[#E5E7EB]'
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
                className="group relative rounded-2xl bg-[#18181B] light:bg-white border border-[#27272A] light:border-gray-200 hover:border-[#4ADEDE] transition-all duration-300 p-6 flex flex-col justify-between shadow-card hover:-translate-y-1"
              >
                <div>
                  {/* Card Header: Icon + Title + Skill Count */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#27272A] light:border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#030712] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-200 text-[#4ADEDE]">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#FFFFFF] light:text-[#111827] font-sans">
                          {cat.title}
                        </h3>
                        <span className="font-mono text-[10px] text-[#A1A1AA] light:text-[#6B7280]">
                          // DOMAIN 0{index + 1}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#030712] light:bg-[#F3F4F6] text-[#60F1AD] light:text-[#059669] border border-[#27272A] light:border-gray-200">
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
                              ? 'bg-[#4ADEDE] text-[#030712] border border-[#4ADEDE] font-bold shadow-sm'
                              : 'bg-[#030712] light:bg-[#F3F4F6] text-[#FFFFFF] light:text-[#111827] border border-[#27272A] light:border-gray-300 hover:border-[#60F1AD]'
                          }`}
                        >
                          {isHighlighted && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#030712]" />
                          )}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Subdued Bottom Indicator */}
                <div className="mt-6 pt-3 border-t border-[#27272A] light:border-gray-200 flex items-center justify-between text-[10px] font-mono text-[#A1A1AA] light:text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#60F1AD]" />
                    Verified Production / Lab Experience
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Legend */}
        <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA] light:text-[#4B5563] border-t border-[#27272A] light:border-gray-200 px-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[#4ADEDE] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4ADEDE]" />
              <span>Cyan Badge:</span>
            </span>
            <span>Flagship project / core specialization stack</span>
          </div>

          <div className="text-[#A1A1AA] light:text-[#4B5563]">
            Total verified skills: {skillCategories.reduce((acc, c) => acc + c.skills.length, 0)} across 7 technical disciplines
          </div>
        </div>
      </div>
    </section>
  );
};
