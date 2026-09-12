import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  Activity,
  Cpu,
  Zap,
} from 'lucide-react';
import { projects, type ProjectItem } from '../data/portfolio';
import { ProjectModal } from '../components/ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const flagshipProject = projects.find((p) => p.isFlagship) || projects[0];
  const standardProjects = projects.filter((p) => !p.isFlagship);

  return (
    <section id="projects" className="relative py-24 border-t border-[#D4D4D4] bg-white text-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#050505] tracking-wider uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            <span>// 04 — FEATURED PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] font-sans tracking-tight">
            Engineering Implementations
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
            Prioritized engineering work spanning custom FPGA silicon architectures, high-frequency signal processing, competitive motorsport telemetry, and machine learning models.
          </p>
        </div>

        {/* 1. Flagship Hero Project Card (High Contrast #050505 Block) */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-2xl bg-[#050505] text-white border border-[#D4D4D4] hover:border-black p-6 sm:p-8 lg:p-10 shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Flagship Details */}
              <div className="lg:col-span-7 space-y-5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-[#050505] shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#050505]" />
                    FLAGSHIP PROJECT // 01
                  </span>

                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-neutral-900 text-neutral-300 border border-neutral-750">
                    {flagshipProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
                  {flagshipProject.title}
                </h3>

                {/* 2-line Description */}
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                  {flagshipProject.shortDescription}
                </p>

                {/* Metrics Banner */}
                {flagshipProject.metrics && (
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center gap-2.5 text-xs font-mono text-white font-semibold">
                    <Activity className="w-4 h-4 shrink-0 text-white" />
                    <span>{flagshipProject.metrics}</span>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {flagshipProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-neutral-900 text-neutral-300 border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(flagshipProject)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#050505] font-mono text-xs font-bold hover:bg-neutral-200 transition-all shadow-sm focus:outline-none cursor-pointer"
                  >
                    <span>View Full Architecture &amp; RTL Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Signal & Pipeline Architecture HUD */}
              <div className="lg:col-span-5">
                <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono space-y-4 text-white">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-2 text-white font-bold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>HARDWARE PIPELINE SCHEMATIC</span>
                    </span>
                    <span className="text-[10px] text-white flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      SYNTHESIZED
                    </span>
                  </div>

                  {/* Flow Diagram */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-200">1. Analog Front-End (AFE)</span>
                      <span className="text-[10px] text-neutral-400">SPI Biopotential</span>
                    </div>
                    <div className="text-center text-neutral-500 text-xs">↓</div>
                    <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-200">2. Verilog FIR &amp; Notch Filter</span>
                      <span className="text-[10px] text-white font-bold">50Hz Rejection</span>
                    </div>
                    <div className="text-center text-neutral-500 text-xs">↓</div>
                    <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-200">3. Quantized CNN Engine</span>
                      <span className="text-[10px] text-white font-bold">&lt;10ms Inference</span>
                    </div>
                    <div className="text-center text-neutral-500 text-xs">↓</div>
                    <div className="p-2.5 rounded bg-white text-[#050505] flex items-center justify-between font-bold">
                      <span>4. MIT-BIH Arrhythmia Output</span>
                      <span className="text-[10px]">Real-Time</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[10px] text-neutral-400 border-t border-neutral-800">
                    <span>TARGET: XILINX VIVADO FPGA</span>
                    <span className="text-white font-bold">CLOCK: 50.0 MHz</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. Standard Grid of Other 5 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standardProjects.map((project: ProjectItem, index: number) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative rounded-2xl bg-white border border-[#D4D4D4] hover:border-[#050505] hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between shadow-sm text-[#111827]"
              >
                <div className="space-y-4">
                  {/* Category + Index Marker */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded text-[10px] bg-[#F4F4F5] text-[#111827] border border-[#D4D4D4] font-medium">
                      {project.category}
                    </span>
                    <span className="text-[#6B7280] text-[11px]">
                      // 0{index + 2}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#111827] font-sans tracking-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  {/* Short 2-line Description */}
                  <p className="text-[#374151] text-xs sm:text-sm leading-relaxed line-clamp-2 font-sans">
                    {project.shortDescription}
                  </p>

                  {/* Metric Tag */}
                  {project.metrics && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F4F4F5] text-[11px] font-mono text-[#111827] border border-[#D4D4D4] font-medium">
                      <Zap className="w-3 h-3 text-[#050505] shrink-0" />
                      <span className="truncate">{project.metrics}</span>
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F4F4F5] text-[#374151] border border-[#D4D4D4]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#6B7280] bg-[#F4F4F5] border border-[#D4D4D4]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-6 mt-4 border-t border-[#D4D4D4] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#050505] hover:underline transition-colors group-hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] font-mono text-[#6B7280]">
                    {project.tools[0]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal Component */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
