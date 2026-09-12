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
    <section id="projects" className="relative py-24 border-t border-navy-700/50 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-circuit-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-circuit-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-circuit-teal tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal" />
            <span>// 04 — FEATURED PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Engineering Implementations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Prioritized engineering work spanning custom FPGA silicon architectures, high-frequency signal processing, competitive motorsport telemetry, and machine learning models.
          </p>
        </div>

        {/* 1. Flagship Hero Project Card (Top, Wider prominence) */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-2xl bg-gradient-to-br from-navy-800/95 to-navy-850/90 border border-circuit-teal/40 hover:border-circuit-teal/70 p-6 sm:p-8 lg:p-10 shadow-card hover:shadow-glow-teal hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Flagship Details */}
              <div className="lg:col-span-7 space-y-5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-circuit-teal/15 text-circuit-teal border border-circuit-teal/40 shadow-glow-subtle">
                    <Sparkles className="w-3.5 h-3.5" />
                    FLAGSHIP PROJECT // 01
                  </span>

                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-navy-900 text-circuit-cyan border border-navy-700">
                    {flagshipProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight group-hover:text-circuit-teal transition-colors">
                  {flagshipProject.title}
                </h3>

                {/* 2-line Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                  {flagshipProject.shortDescription}
                </p>

                {/* Metrics Banner */}
                {flagshipProject.metrics && (
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-circuit-teal/30 flex items-center gap-2.5 text-xs font-mono text-circuit-teal">
                    <Activity className="w-4 h-4 shrink-0" />
                    <span>{flagshipProject.metrics}</span>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {flagshipProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-navy-900 text-slate-300 border border-navy-700/80 group-hover:border-navy-600 transition-colors"
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-circuit-teal text-navy-950 font-mono text-xs font-semibold hover:bg-circuit-cyan transition-all shadow-glow-subtle focus:outline-none"
                  >
                    <span>View Full Architecture &amp; RTL Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Signal & Pipeline Architecture HUD */}
              <div className="lg:col-span-5">
                <div className="p-5 rounded-xl bg-navy-950/90 border border-navy-700/80 font-mono space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-navy-800 text-[11px] text-slate-400">
                    <span className="flex items-center gap-2 text-circuit-teal">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>HARDWARE PIPELINE SCHEMATIC</span>
                    </span>
                    <span className="text-[10px] text-circuit-green flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-circuit-green animate-pulse" />
                      SIMULATION VALIDATED
                    </span>
                  </div>

                  {/* Flow Diagram */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-navy-900/90 border border-navy-700 flex items-center justify-between">
                      <span className="text-slate-300">1. Analog Front-End (AFE)</span>
                      <span className="text-[10px] text-circuit-cyan">SPI Biopotential</span>
                    </div>
                    <div className="text-center text-circuit-teal/50 text-xs">↓</div>
                    <div className="p-2.5 rounded bg-navy-900/90 border border-navy-700 flex items-center justify-between">
                      <span className="text-slate-300">2. Verilog FIR &amp; Notch Filter</span>
                      <span className="text-[10px] text-circuit-teal">50Hz Rejection</span>
                    </div>
                    <div className="text-center text-circuit-teal/50 text-xs">↓</div>
                    <div className="p-2.5 rounded bg-navy-900/90 border border-navy-700 flex items-center justify-between">
                      <span className="text-slate-300">3. Quantized CNN Engine</span>
                      <span className="text-[10px] text-circuit-green">&lt;10ms Inference</span>
                    </div>
                    <div className="text-center text-circuit-teal/50 text-xs">↓</div>
                    <div className="p-2.5 rounded bg-navy-900/90 border border-circuit-teal/40 flex items-center justify-between bg-circuit-teal/5">
                      <span className="text-circuit-teal font-semibold">4. MIT-BIH Arrhythmia Output</span>
                      <span className="text-[10px] font-bold text-circuit-teal">Real-Time</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-navy-800">
                    <span>TARGET: XILINX VIVADO FPGA</span>
                    <span>CLOCK: 50.0 MHz</span>
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
                className="group relative rounded-xl bg-navy-800/80 border border-navy-700/70 hover:border-circuit-teal/50 hover:shadow-glow-subtle hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between backdrop-blur-sm shadow-card"
              >
                <div className="space-y-4">
                  {/* Category + Index Marker */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-navy-900 text-circuit-cyan border border-navy-700">
                      {project.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      // 0{index + 2}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white font-sans tracking-tight group-hover:text-circuit-teal transition-colors">
                    {project.title}
                  </h3>

                  {/* Short 2-line Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-sans">
                    {project.shortDescription}
                  </p>

                  {/* Metric Tag */}
                  {project.metrics && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-950 text-[11px] font-mono text-circuit-teal border border-navy-700/80">
                      <Zap className="w-3 h-3 text-circuit-teal shrink-0" />
                      <span className="truncate">{project.metrics}</span>
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-navy-900 text-slate-300 border border-navy-700/70"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-navy-900 border border-navy-800">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-6 mt-4 border-t border-navy-700/40 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-circuit-teal hover:text-circuit-cyan transition-colors group-hover:translate-x-0.5"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] font-mono text-slate-400">
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
