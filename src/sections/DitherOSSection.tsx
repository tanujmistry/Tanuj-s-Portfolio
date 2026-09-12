import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Activity,
  Layers,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { DitherCanvas } from '../components/DitherCanvas';

export const DitherOSSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
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
    <section id="algorithmic-interfaces" className="relative py-20 sm:py-28 border-t border-[#D4D4D4] bg-white text-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Meng To DitherOS Style) */}
        <div className="space-y-4 mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F4F5] border border-[#D4D4D4] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#050505] animate-pulse" />
            <span className="text-[#050505] font-bold">DitherOS Architecture</span>
            <span className="text-[#6B7280]">Rendering Pipeline v2.4</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-medium text-[#111827] tracking-tight font-sans leading-[1.06]">
            Digital noise. <span className="font-bold underline decoration-[#D4D4D4] decoration-4 underline-offset-8">Analog soul.</span>
          </h2>

          <p className="text-[#374151] text-base sm:text-lg leading-relaxed font-sans pt-1">
            Leveraging real-time digital signal processing and FPGA acceleration to transform noisy, chaotic analog sensor biopotentials into deterministic mathematical intelligence.
          </p>
        </div>

        {/* Bento Grid Layout (15px rounded cards per DitherOS spec) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1: Wide Hero Card - Shader & Signal Processing with Live Dither Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 rounded-[15px] bg-white border border-[#D4D4D4] hover:border-[#050505] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group"
          >
            {/* Top row: Label + Status */}
            <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-[#D4D4D4] font-mono text-xs">
              <div className="flex items-center gap-2 text-[#050505] font-bold">
                <Sliders className="w-4 h-4" />
                <span className="uppercase tracking-wider">// SIGNAL &amp; SHADER PROCESSING</span>
              </div>
              <span className="text-[#6B7280] text-[11px] font-semibold">BAYER DITHER MATRIX</span>
            </div>

            {/* Interactive Dithered Canvas Visual Window */}
            <div className="relative z-10 w-full h-48 sm:h-56 rounded-[12px] overflow-hidden border border-[#D4D4D4] bg-[#050505] mb-5 shadow-inner">
              <DitherCanvas className="w-full h-full" />
              <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-white pointer-events-none bg-[#050505]/85 px-2.5 py-1 rounded backdrop-blur-sm border border-neutral-800">
                <span>ANALOG NOISE REJECTION: -60dB</span>
                <span className="font-bold text-white">SAMPLING: 50.0 MHz</span>
              </div>
            </div>

            {/* Content & Description */}
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] font-sans">
                Real-Time Biopotential De-noising &amp; Conditioning
              </h3>
              <p className="text-[#374151] text-sm leading-relaxed font-sans">
                Interfacing low-noise biopotential analog front-ends (AFE) with pipelined Verilog FIR bandpass and 50Hz notch filters, eliminating muscle tremor artifacts while preserving raw cardiac QRS wave topography.
              </p>
            </div>
          </motion.div>

          {/* Bento Item 2: Engineered for Modern Performance (Dark High-Contrast Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 rounded-[15px] bg-[#050505] text-white border border-[#D4D4D4] p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Cpu className="w-4 h-4" />
                  <span className="uppercase tracking-wider">// SILICON TIMING</span>
                </div>
                <span className="text-neutral-400">FPGA</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white font-sans mb-3">
                Engineered for Modern Performance
              </h3>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                Hardware timing closure synthesized in Xilinx Vivado maintaining bit-exact deterministic execution without CPU operating system jitter.
              </p>

              {/* Performance Metrics List */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-[10px] bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                  <span className="text-neutral-400">Clock Timing</span>
                  <span className="text-white font-bold">50.0 MHz</span>
                </div>
                <div className="p-2.5 rounded-[10px] bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                  <span className="text-neutral-400">Classification</span>
                  <span className="text-white font-bold">&lt; 10ms</span>
                </div>
                <div className="p-2.5 rounded-[10px] bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                  <span className="text-neutral-400">Thermal Budget</span>
                  <span className="text-white font-bold">Ultra Low Power</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Xilinx Vivado RTL Synthesis</span>
            </div>
          </motion.div>

          {/* Bento Item 3: Kinetic Interaction & Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-6 rounded-[15px] bg-white border border-[#D4D4D4] hover:border-[#050505] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D4D4D4] font-mono text-xs">
                <div className="flex items-center gap-2 text-[#050505] font-bold">
                  <Activity className="w-4 h-4" />
                  <span className="uppercase tracking-wider">// KINETIC TELEMETRY</span>
                </div>
                <span className="text-[#6B7280]">CAN BUS</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#111827] font-sans mb-2">
                Multi-Node High-Speed Telemetry
              </h3>

              <p className="text-[#374151] text-xs sm:text-sm leading-relaxed font-sans mb-4">
                Automotive sensor networks capturing live wheel velocities, steering kinematics, and suspension travel across a fault-tolerant CAN backbone streaming wirelessly to trackside MATLAB telemetry.
              </p>

              {/* Protocol pills */}
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#111827] border border-[#D4D4D4] font-medium">CAN Bus 2.0B</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#111827] border border-[#D4D4D4] font-medium">ESP32 RF Link</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#374151] border border-[#D4D4D4]">12+ Live Sensors</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#374151] border border-[#D4D4D4]">-8% Lap Times</span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#D4D4D4] text-[11px] font-mono text-[#6B7280] flex items-center justify-between">
              <span>TEAM ARYANS RACING FORMULA DAQ</span>
              <span className="text-[#050505] font-bold">100Hz LOGGING</span>
            </div>
          </motion.div>

          {/* Bento Item 4: Algorithmic Post-Processing & Edge AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 rounded-[15px] bg-white border border-[#D4D4D4] hover:border-[#050505] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D4D4D4] font-mono text-xs">
                <div className="flex items-center gap-2 text-[#050505] font-bold">
                  <Layers className="w-4 h-4" />
                  <span className="uppercase tracking-wider">// POST-PROCESSING &amp; EDGE AI</span>
                </div>
                <span className="text-[#6B7280]">8-BIT QUANT</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#111827] font-sans mb-2">
                Quantized Neural Network Inference
              </h3>

              <p className="text-[#374151] text-xs sm:text-sm leading-relaxed font-sans mb-4">
                Compressing full-precision deep learning classifiers into 8-bit fixed-point arithmetic blocks for direct execution on FPGA DSP multipliers with minimal loss in MIT-BIH diagnostic specificity.
              </p>

              {/* Architecture tags */}
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#111827] border border-[#D4D4D4] font-medium">TensorFlow / Keras</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#111827] border border-[#D4D4D4] font-medium">CNN Fixed-Point</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#374151] border border-[#D4D4D4]">Zero Multiplier Waste</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F4F4F5] text-[#374151] border border-[#D4D4D4]">MIT-BIH Tested</span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#D4D4D4] text-[11px] font-mono text-[#6B7280] flex items-center justify-between">
              <span>NIELIT RESEARCH PIPELINE</span>
              <span className="text-[#050505] font-bold">EDGE QUANTIZATION</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Actions matching 15px rounded control spec */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 p-6 rounded-[15px] bg-[#F4F4F5] border border-[#D4D4D4]">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[15px] bg-[#050505] text-white font-bold font-sans text-sm hover:bg-neutral-800 transition-all shadow-md focus:outline-none cursor-pointer"
            >
              <span>Explore Hardware Implementations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[15px] bg-white border border-[#D4D4D4] hover:border-[#050505] text-[#111827] font-medium font-sans text-sm transition-all focus:outline-none cursor-pointer"
            >
              <span>Inspect Full Tech Stack</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#6B7280]">
            // DITHEROS ALGORITHMIC CONTENT ARCHITECTURE // FEATURED
          </div>
        </div>
      </div>
    </section>
  );
};
