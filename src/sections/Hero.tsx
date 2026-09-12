import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Terminal, Cpu, Layers } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { OscilloscopeCanvas } from '../components/OscilloscopeCanvas';

export const Hero: React.FC = () => {
  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#030712] light:bg-white text-[#FFFFFF] light:text-[#111827] transition-colors duration-300"
    >
      {/* Background Subtle Circuit Traces (SVG vector graphics in #4ADEDE / #60F1AD) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <svg
          className="w-full h-full opacity-25 light:opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          fill="none"
        >
          {/* Circuit trace lines */}
          <path
            d="M-100 200 H 400 L 520 320 H 900 L 980 240 H 1540"
            stroke="#4ADEDE"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M-50 480 H 320 L 400 560 H 820 L 920 460 H 1500"
            stroke="#60F1AD"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            d="M200 -50 V 250 L 300 350 V 750 L 400 850 V 950"
            stroke="#27272A"
            strokeWidth="1.2"
            strokeDasharray="3 5"
          />
          <path
            d="M1100 -50 V 300 L 1020 380 V 800"
            stroke="#4ADEDE"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />

          {/* Electronic connection nodes */}
          <circle cx="400" cy="200" r="3.5" fill="#4ADEDE" />
          <circle cx="520" cy="320" r="3.5" fill="#60F1AD" />
          <circle cx="900" cy="320" r="3.5" fill="#4ADEDE" />
          <circle cx="320" cy="480" r="3" fill="#60F1AD" />
          <circle cx="820" cy="560" r="3" fill="#4ADEDE" />
        </svg>

        {/* Ambient backdrop glow in cyber cyan & electric mint */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#4ADEDE]/[0.05] light:bg-[#4ADEDE]/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#60F1AD]/[0.04] light:bg-[#60F1AD]/[0.02] rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Identity, Positioning & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] text-xs font-mono shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60F1AD] light:bg-[#FDBA74] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60F1AD] light:bg-[#FDBA74]" />
              </span>
              <span className="text-[#4ADEDE] light:text-[#EA580C] font-semibold tracking-wide">
                NIELIT Project Intern // Real-Time FPGA + CNN
              </span>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <div className="font-mono text-xs sm:text-sm text-[#A1A1AA] light:text-[#4B5563] tracking-wider uppercase">
                // Hello, World. I am
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] light:text-[#111827] font-sans">
                {personalInfo.name}
              </h1>
            </div>

            {/* Role Title */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-lg sm:text-xl lg:text-2xl text-[#4ADEDE] light:text-[#EA580C] font-semibold">
              <span>{personalInfo.title}</span>
              <span className="text-[#27272A] light:text-gray-300 hidden sm:inline">|</span>
              <span className="text-[#A1A1AA] light:text-[#4B5563] text-base sm:text-xl font-normal">AI/ML &amp; Embedded Systems</span>
            </div>

            {/* One-Sentence Value Proposition */}
            <p className="text-[#A1A1AA] light:text-[#4B5563] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-sans font-normal">
              Bridging the silicon-software divide by engineering custom <span className="text-[#FFFFFF] light:text-[#111827] font-semibold">FPGA accelerators</span>, <span className="text-[#FFFFFF] light:text-[#111827] font-semibold">real-time DSP pipelines</span>, and deploying <span className="text-[#60F1AD] light:text-[#EA580C] font-semibold underline decoration-[#4ADEDE] light:decoration-[#EA580C] underline-offset-4">quantized deep learning models</span> directly onto resource-constrained embedded hardware.
            </p>

            {/* Micro Hardware Specs Pill Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] text-xs font-mono text-[#FFFFFF] light:text-white">
                <Cpu className="w-3.5 h-3.5 text-[#4ADEDE] light:text-[#EA580C]" />
                Xilinx Vivado &amp; Verilog
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] text-xs font-mono text-[#FFFFFF] light:text-white">
                <Layers className="w-3.5 h-3.5 text-[#60F1AD] light:text-[#FDBA74]" />
                Quantized CNN Inference
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] text-xs font-mono text-[#FFFFFF] light:text-white">
                <Terminal className="w-3.5 h-3.5 text-[#4ADEDE] light:text-[#EA580C]" />
                ARM / ESP32 &amp; CAN Bus
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-mono text-sm font-bold hover:bg-[#60F1AD] light:hover:bg-[#C2410C] shadow-lg shadow-[#4ADEDE]/20 light:shadow-[#EA580C]/25 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4ADEDE] light:focus:ring-[#EA580C] cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#18181B] light:bg-[#191C21] hover:bg-[#27272A] light:hover:bg-[#272a30] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] text-[#FFFFFF] light:text-white font-mono text-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#4ADEDE] light:text-[#EA580C]" />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Quick Education / CGPA Snippet */}
            <div className="pt-4 border-t border-[#27272A] light:border-gray-200 text-xs font-mono text-[#A1A1AA] light:text-[#4B5563] flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>B.Tech E&amp;TC @ GEC Aurangabad</span>
              <span className="text-[#27272A] light:text-gray-300">•</span>
              <span className="text-[#60F1AD] light:text-[#EA580C] font-bold">CGPA: 8.65 / 10.0</span>
              <span className="text-[#27272A] light:text-gray-300">•</span>
              <span>Nov 2022 – June 2026</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Oscilloscope & Hardware Signal Monitor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient decorative border accent */}
            <div className="relative">
              {/* Interactive Real-Time Oscilloscope Canvas */}
              <OscilloscopeCanvas className="relative z-10" />

              {/* Decorative engineering label underneath */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#A1A1AA] light:text-[#4B5563] px-2">
                <span>// SIGNAL TELEMETRY &amp; EDGE AI MONITOR</span>
                <span className="text-[#4ADEDE] font-bold">LATENCY: &lt;10ms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
