import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin, Cpu, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export const About: React.FC = () => {
  const { education } = personalInfo;

  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-28 border-t border-[#27272A] light:border-gray-200 bg-[#030712] light:bg-white overflow-hidden text-[#FFFFFF] light:text-[#111827] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Marker */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#4ADEDE] light:text-[#EA580C] tracking-wider uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#60F1AD] light:bg-[#FDBA74]" />
            <span>// 01 — ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFFFF] light:text-[#111827] font-sans tracking-tight">
            Bridging Silicon Architecture &amp; Machine Intelligence
          </h2>
        </div>

        {/* Two-Column Layout (Text + Visual Graphic) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Professional summary + Education block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Professional Summary */}
            <div className="space-y-4 text-[#A1A1AA] light:text-[#4B5563] text-base sm:text-lg leading-relaxed font-sans">
              <p>
                I am an <span className="text-[#FFFFFF] light:text-[#111827] font-semibold">Electronics &amp; Telecommunication Engineer</span> with a high-conviction hybrid profile spanning low-level digital hardware design and applied deep learning.
              </p>
              <p>
                My hands-on engineering is grounded in <span className="text-[#60F1AD] light:text-[#EA580C] font-semibold underline decoration-[#4ADEDE] light:decoration-[#EA580C] underline-offset-4">FPGA acceleration with Xilinx Vivado</span>, Verilog RTL synthesis, high-throughput digital signal processing, and architecting robust embedded telemetry systems.
              </p>
              <p>
                Currently, as a Project Intern at <span className="text-[#4ADEDE] light:text-[#EA580C] font-semibold">NIELIT Maharashtra</span>, I am engineering a flagship medical-grade system combining an analog front-end biopotential acquisition interface with an on-chip quantized CNN for sub-10ms real-time ECG arrhythmia classification.
              </p>
            </div>

            {/* Core Competency Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151]">
                <CheckCircle2 className="w-4 h-4 text-[#60F1AD] light:text-[#FDBA74] shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-[#A1A1AA] light:text-gray-300">
                  <span className="text-[#FFFFFF] light:text-white font-bold block mb-0.5">Silicon to Edge AI</span>
                  Verilog RTL • Vivado • CNN Quantization
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151]">
                <CheckCircle2 className="w-4 h-4 text-[#60F1AD] light:text-[#FDBA74] shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-[#A1A1AA] light:text-gray-300">
                  <span className="text-[#FFFFFF] light:text-white font-bold block mb-0.5">Real-Time Embedded</span>
                  ARM Cortex • CAN Bus • DSP Filtering
                </div>
              </div>
            </div>

            {/* Education Block */}
            <div className="relative rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] transition-all p-6 shadow-card">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#27272A] light:border-[#374151]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#030712] light:bg-[#0E1013] border border-[#27272A] light:border-[#374151] text-[#4ADEDE] light:text-[#EA580C]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FFFFFF] light:text-white font-sans">
                      {education.degree}
                    </h3>
                    <p className="text-xs font-mono text-[#A1A1AA] light:text-gray-400 mt-0.5">
                      {education.institution}
                    </p>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-mono text-xs font-bold shadow-md shadow-[#4ADEDE]/20 light:shadow-[#EA580C]/25">
                    <Award className="w-3.5 h-3.5" />
                    <span>CGPA {education.cgpa}</span>
                  </div>
                </div>
              </div>

              {/* Education Meta Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono text-[#A1A1AA] light:text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#4ADEDE] light:text-[#EA580C]" />
                  <span>Timeline: {education.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#60F1AD] light:text-[#FDBA74]" />
                  <span>Chhatrapati Sambhajinagar (Aurangabad), MH</span>
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="mt-4 pt-4 border-t border-[#27272A] light:border-[#374151]">
                <div className="text-[11px] font-mono text-[#A1A1AA] light:text-gray-400 mb-2 font-semibold">// KEY COURSEWORK</div>
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
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#030712] light:bg-[#0E1013] text-[#4ADEDE] light:text-[#FDBA74] border border-[#27272A] light:border-[#374151]"
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
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative group rounded-2xl overflow-hidden bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] transition-all duration-300 shadow-card text-white">
              {/* Top HUD Frame Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181B] light:bg-[#191C21] border-b border-[#27272A] light:border-[#374151] text-[11px] font-mono">
                <div className="flex items-center gap-2 text-[#4ADEDE] light:text-[#EA580C]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="font-bold tracking-wider">HARDWARE FABRIC // SOC</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#A1A1AA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#60F1AD] light:bg-[#FDBA74] animate-pulse" />
                  <span className="text-[10px] text-[#60F1AD] light:text-[#FDBA74]">FPGA CORE: ACTIVE</span>
                </div>
              </div>

              {/* Silicon Architecture Graphic */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#030712]">
                <img
                  src="/assets/silicon_architecture.jpg"
                  alt="Silicon Microprocessor and FPGA Circuit Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-110"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-75 pointer-events-none" />

                {/* Technical Overlay Badges on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="px-2.5 py-1 rounded bg-[#030712]/90 border border-[#27272A] backdrop-blur-md text-[10px] font-mono text-[#4ADEDE] light:text-[#EA580C]">
                    ARCH: XILINX VIVADO RTL
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#030712]/90 border border-[#27272A] backdrop-blur-md text-[10px] font-mono text-[#60F1AD] light:text-[#FDBA74]">
                    QUANTIZED CNN
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Readout */}
              <div className="p-4 bg-[#18181B] light:bg-[#191C21] border-t border-[#27272A] light:border-[#374151] font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-[#A1A1AA] text-[11px]">
                  <span>SYNTHESIS DOMAIN</span>
                  <span className="text-[#FFFFFF]">50MHz Real-Time Clock</span>
                </div>
                <div className="flex justify-between text-[#A1A1AA] text-[11px]">
                  <span>INTERFACES</span>
                  <span className="text-[#60F1AD] light:text-[#FDBA74]">SPI • CAN • UART • I2C</span>
                </div>
                <div className="flex justify-between text-[#A1A1AA] text-[11px]">
                  <span>DEPLOYMENT</span>
                  <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">Hardware-Accelerated Edge AI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
