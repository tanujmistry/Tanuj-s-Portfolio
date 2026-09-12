import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin, Cpu, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export const About: React.FC = () => {
  const { education } = personalInfo;

  return (
    <section id="about" className="relative py-24 border-t border-navy-700/50 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-circuit-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Marker */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-circuit-teal tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal" />
            <span>// 01 — ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Bridging Silicon Architecture &amp; Machine Intelligence
          </h2>
        </div>

        {/* Two-Column Layout (Text + Visual Graphic) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: 3-4 sentence professional summary + Education block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* 3-4 Sentence Professional Summary */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>
                I am an <span className="text-white font-medium">Electronics &amp; Telecommunication Engineer</span> with a high-conviction hybrid profile spanning low-level digital hardware design and applied deep learning.
              </p>
              <p>
                My hands-on engineering is grounded in <span className="text-circuit-teal font-medium">FPGA acceleration with Xilinx Vivado</span>, Verilog RTL synthesis, high-throughput digital signal processing, and architecting robust embedded telemetry systems.
              </p>
              <p>
                Currently, as a Project Intern at <span className="text-white font-medium">NIELIT Maharashtra</span>, I am engineering a flagship medical-grade system combining an analog front-end biopotential acquisition interface with an on-chip quantized CNN for sub-10ms real-time ECG arrhythmia classification.
              </p>
            </div>

            {/* Core Competency Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-navy-800/60 border border-navy-700/60">
                <CheckCircle2 className="w-4 h-4 text-circuit-teal shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-slate-300">
                  <span className="text-white font-semibold block mb-0.5">Silicon to Edge AI</span>
                  Verilog RTL • Vivado • CNN Quantization
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-navy-800/60 border border-navy-700/60">
                <CheckCircle2 className="w-4 h-4 text-circuit-cyan shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-slate-300">
                  <span className="text-white font-semibold block mb-0.5">Real-Time Embedded</span>
                  ARM Cortex • CAN Bus • DSP Filtering
                </div>
              </div>
            </div>

            {/* Education Block */}
            <div className="relative rounded-xl bg-navy-800/80 border border-navy-700/80 hover:border-circuit-teal/40 transition-colors p-6 shadow-card backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-navy-700/60">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-circuit-teal/10 border border-circuit-teal/30 text-circuit-teal">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white font-sans">
                      {education.degree}
                    </h3>
                    <p className="text-xs font-mono text-circuit-teal mt-0.5">
                      {education.institution}
                    </p>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-circuit-teal/10 border border-circuit-teal/30 text-circuit-teal font-mono text-xs font-bold shadow-glow-subtle">
                    <Award className="w-3.5 h-3.5" />
                    <span>CGPA {education.cgpa}</span>
                  </div>
                </div>
              </div>

              {/* Education Meta Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-circuit-cyan" />
                  <span>Timeline: {education.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-circuit-cyan" />
                  <span>Chhatrapati Sambhajinagar (Aurangabad), MH</span>
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="mt-4 pt-4 border-t border-navy-700/40">
                <div className="text-[11px] font-mono text-slate-400 mb-2">// KEY COURSEWORK</div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'VLSI Design',
                    'Digital Signal Processing (DSP)',
                    'Embedded Systems',
                    'Microprocessors & Microcontrollers',
                    'Analog & Digital Circuits',
                    'Artificial Intelligence & Deep Learning',
                  ].map((subject) => (
                    <span
                      key={subject}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-navy-900 text-slate-300 border border-navy-700/80"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Abstract Silicon Architecture Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative group rounded-2xl overflow-hidden bg-navy-950 border border-circuit-border hover:border-circuit-border-active transition-all duration-300 shadow-card">
              {/* Top HUD Frame Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-navy-900/90 border-b border-navy-700/60 text-[11px] font-mono">
                <div className="flex items-center gap-2 text-circuit-teal">
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="font-semibold tracking-wider">HARDWARE FABRIC // SOC</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal animate-pulse" />
                  <span className="text-[10px]">FPGA CORE: ACTIVE</span>
                </div>
              </div>

              {/* Silicon Architecture Graphic */}
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src="/assets/silicon_architecture.jpg"
                  alt="Silicon Microprocessor and FPGA Circuit Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay to ensure seamless blending with dark aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Technical Overlay Badges on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="px-2.5 py-1 rounded bg-navy-950/80 border border-circuit-teal/30 backdrop-blur-md text-[10px] font-mono text-circuit-teal">
                    ARCH: XILINX VIVADO RTL
                  </div>
                  <div className="px-2.5 py-1 rounded bg-navy-950/80 border border-circuit-cyan/30 backdrop-blur-md text-[10px] font-mono text-circuit-cyan">
                    QUANTIZED CNN
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Readout */}
              <div className="p-4 bg-navy-900/70 border-t border-navy-700/60 font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>SYNTHESIS DOMAIN</span>
                  <span className="text-white">50MHz Real-Time Clock</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>INTERFACES</span>
                  <span className="text-circuit-teal">SPI • CAN • UART • I2C</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>DEPLOYMENT</span>
                  <span className="text-circuit-cyan">Hardware-Accelerated Edge AI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
