import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin, Cpu, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export const About: React.FC = () => {
  const { education } = personalInfo;

  return (
    <section id="about" className="relative py-24 border-t border-[#D4D4D4] bg-white overflow-hidden text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Marker */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#050505] tracking-wider uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            <span>// 01 — ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] font-sans tracking-tight">
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
            <div className="space-y-4 text-[#374151] text-base sm:text-lg leading-relaxed font-sans">
              <p>
                I am an <span className="text-[#111827] font-semibold">Electronics &amp; Telecommunication Engineer</span> with a high-conviction hybrid profile spanning low-level digital hardware design and applied deep learning.
              </p>
              <p>
                My hands-on engineering is grounded in <span className="text-[#050505] font-semibold underline decoration-[#D4D4D4] underline-offset-4">FPGA acceleration with Xilinx Vivado</span>, Verilog RTL synthesis, high-throughput digital signal processing, and architecting robust embedded telemetry systems.
              </p>
              <p>
                Currently, as a Project Intern at <span className="text-[#111827] font-semibold">NIELIT Maharashtra</span>, I am engineering a flagship medical-grade system combining an analog front-end biopotential acquisition interface with an on-chip quantized CNN for sub-10ms real-time ECG arrhythmia classification.
              </p>
            </div>

            {/* Core Competency Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F4F4F5] border border-[#D4D4D4]">
                <CheckCircle2 className="w-4 h-4 text-[#050505] shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-[#374151]">
                  <span className="text-[#111827] font-bold block mb-0.5">Silicon to Edge AI</span>
                  Verilog RTL • Vivado • CNN Quantization
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F4F4F5] border border-[#D4D4D4]">
                <CheckCircle2 className="w-4 h-4 text-[#050505] shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-[#374151]">
                  <span className="text-[#111827] font-bold block mb-0.5">Real-Time Embedded</span>
                  ARM Cortex • CAN Bus • DSP Filtering
                </div>
              </div>
            </div>

            {/* Education Block */}
            <div className="relative rounded-2xl bg-white border border-[#D4D4D4] hover:border-[#050505] transition-colors p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#D4D4D4]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#F4F4F5] border border-[#D4D4D4] text-[#050505]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] font-sans">
                      {education.degree}
                    </h3>
                    <p className="text-xs font-mono text-[#4B5563] mt-0.5">
                      {education.institution}
                    </p>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505] text-white font-mono text-xs font-bold shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    <span>CGPA {education.cgpa}</span>
                  </div>
                </div>
              </div>

              {/* Education Meta Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#050505]" />
                  <span>Timeline: {education.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#050505]" />
                  <span>Chhatrapati Sambhajinagar (Aurangabad), MH</span>
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="mt-4 pt-4 border-t border-[#D4D4D4]">
                <div className="text-[11px] font-mono text-[#4B5563] mb-2 font-semibold">// KEY COURSEWORK</div>
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
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#F4F4F5] text-[#111827] border border-[#D4D4D4]"
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
            <div className="relative group rounded-2xl overflow-hidden bg-[#050505] border border-[#D4D4D4] hover:border-[#050505] transition-all duration-300 shadow-card text-white">
              {/* Top HUD Frame Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-[11px] font-mono">
                <div className="flex items-center gap-2 text-white">
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="font-bold tracking-wider">HARDWARE FABRIC // SOC</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px]">FPGA CORE: ACTIVE</span>
                </div>
              </div>

              {/* Silicon Architecture Graphic */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#050505]">
                <img
                  src="/assets/silicon_architecture.jpg"
                  alt="Silicon Microprocessor and FPGA Circuit Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Technical Overlay Badges on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="px-2.5 py-1 rounded bg-[#050505]/90 border border-neutral-700 backdrop-blur-md text-[10px] font-mono text-white">
                    ARCH: XILINX VIVADO RTL
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#050505]/90 border border-neutral-700 backdrop-blur-md text-[10px] font-mono text-neutral-300">
                    QUANTIZED CNN
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Readout */}
              <div className="p-4 bg-neutral-900 border-t border-neutral-800 font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>SYNTHESIS DOMAIN</span>
                  <span className="text-white">50MHz Real-Time Clock</span>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>INTERFACES</span>
                  <span className="text-neutral-200">SPI • CAN • UART • I2C</span>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>DEPLOYMENT</span>
                  <span className="text-white font-bold">Hardware-Accelerated Edge AI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
