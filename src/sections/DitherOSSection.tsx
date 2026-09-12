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
    <section id="algorithmic-interfaces" className="relative py-20 sm:py-28 border-t border-navy-700/60 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-circuit-teal/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-circuit-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Meng To DitherOS Style) */}
        <div className="space-y-4 mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-circuit-teal animate-pulse" />
            <span className="text-white font-semibold">DitherOS Architecture</span>
            <span className="text-slate-400">Rendering Pipeline v2.4</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-medium text-white tracking-tight font-sans leading-[1.06]">
            Digital noise. <span className="text-gradient-cyan">Analog soul.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans pt-1">
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
            className="md:col-span-8 rounded-[15px] bg-navy-800/85 border border-navy-700/80 hover:border-circuit-teal/40 transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card relative overflow-hidden group"
          >
            {/* Top row: Label + Status */}
            <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-navy-700/60 font-mono text-xs">
              <div className="flex items-center gap-2 text-circuit-teal">
                <Sliders className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">// SIGNAL &amp; SHADER PROCESSING</span>
              </div>
              <span className="text-slate-400 text-[11px]">BAYER DITHER MATRIX</span>
            </div>

            {/* Interactive Dithered Canvas Visual Window */}
            <div className="relative z-10 w-full h-48 sm:h-56 rounded-[12px] overflow-hidden border border-navy-700/70 bg-navy-950 mb-5 shadow-inner">
              <DitherCanvas className="w-full h-full" />
              <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-slate-300 pointer-events-none bg-navy-950/70 px-2.5 py-1 rounded backdrop-blur-sm">
                <span>ANALOG NOISE REJECTION: -60dB</span>
                <span className="text-circuit-teal">SAMPLING: 50.0 MHz</span>
              </div>
            </div>

            {/* Content & Description */}
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Real-Time Biopotential De-noising &amp; Conditioning
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                Interfacing low-noise biopotential analog front-ends (AFE) with pipelined Verilog FIR bandpass and 50Hz notch filters, eliminating muscle tremor artifacts while preserving raw cardiac QRS wave topography.
              </p>
            </div>
          </motion.div>

          {/* Bento Item 2: Engineered for Modern Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 rounded-[15px] bg-navy-800/85 border border-navy-700/80 hover:border-circuit-cyan/40 transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-700/60 font-mono text-xs">
                <div className="flex items-center gap-2 text-circuit-cyan">
                  <Cpu className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">// SILICON TIMING</span>
                </div>
                <span className="text-slate-400">FPGA</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white font-sans mb-3">
                Engineered for Modern Performance
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                Hardware timing closure synthesized in Xilinx Vivado maintaining bit-exact deterministic execution without CPU operating system jitter.
              </p>

              {/* Performance Metrics List */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-[10px] bg-navy-900 border border-navy-700 flex justify-between items-center">
                  <span className="text-slate-400">Clock Timing</span>
                  <span className="text-circuit-teal font-bold">50.0 MHz</span>
                </div>
                <div className="p-2.5 rounded-[10px] bg-navy-900 border border-navy-700 flex justify-between items-center">
                  <span className="text-slate-400">Classification</span>
                  <span className="text-circuit-cyan font-bold">&lt; 10ms</span>
                </div>
                <div className="p-2.5 rounded-[10px] bg-navy-900 border border-navy-700 flex justify-between items-center">
                  <span className="text-slate-400">Thermal Budget</span>
                  <span className="text-circuit-green font-bold">Ultra Low Power</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-navy-700/40 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal" />
              <span>Xilinx Vivado RTL Synthesis</span>
            </div>
          </motion.div>

          {/* Bento Item 3: Kinetic Interaction & Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-6 rounded-[15px] bg-navy-800/85 border border-navy-700/80 hover:border-circuit-teal/40 transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-700/60 font-mono text-xs">
                <div className="flex items-center gap-2 text-circuit-teal">
                  <Activity className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">// KINETIC TELEMETRY</span>
                </div>
                <span className="text-slate-400">CAN BUS</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white font-sans mb-2">
                Multi-Node High-Speed Telemetry
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                Automotive sensor networks capturing live wheel velocities, steering kinematics, and suspension travel across a fault-tolerant CAN backbone streaming wirelessly to trackside MATLAB telemetry.
              </p>

              {/* Protocol pills */}
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-circuit-teal border border-navy-700">CAN Bus 2.0B</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-circuit-cyan border border-navy-700">ESP32 RF Link</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-slate-300 border border-navy-700">12+ Live Sensors</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-slate-300 border border-navy-700">-8% Lap Times</span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-navy-700/40 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>TEAM ARYANS RACING FORMULA DAQ</span>
              <span className="text-circuit-teal">100Hz LOGGING</span>
            </div>
          </motion.div>

          {/* Bento Item 4: Algorithmic Post-Processing & Edge AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 rounded-[15px] bg-navy-800/85 border border-navy-700/80 hover:border-circuit-cyan/40 transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-700/60 font-mono text-xs">
                <div className="flex items-center gap-2 text-circuit-cyan">
                  <Layers className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">// POST-PROCESSING &amp; EDGE AI</span>
                </div>
                <span className="text-slate-400">8-BIT QUANT</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white font-sans mb-2">
                Quantized Neural Network Inference
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                Compressing full-precision deep learning classifiers into 8-bit fixed-point arithmetic blocks for direct execution on FPGA DSP multipliers with minimal loss in MIT-BIH diagnostic specificity.
              </p>

              {/* Architecture tags */}
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-circuit-teal border border-navy-700">TensorFlow / Keras</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-circuit-cyan border border-navy-700">CNN Fixed-Point</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-slate-300 border border-navy-700">Zero Multiplier Waste</span>
                <span className="px-2.5 py-1 rounded-[8px] bg-navy-900 text-slate-300 border border-navy-700">MIT-BIH Tested</span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-navy-700/40 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>NIELIT RESEARCH PIPELINE</span>
              <span className="text-circuit-cyan">EDGE QUANTIZATION</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Actions matching 15px rounded control spec */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 p-6 rounded-[15px] bg-navy-800/80 border border-navy-700/80">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[15px] bg-white text-navy-950 font-bold font-sans text-sm hover:bg-slate-200 transition-all shadow-md focus:outline-none cursor-pointer"
            >
              <span>Explore Hardware Implementations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[15px] bg-navy-900 border border-navy-700 hover:border-circuit-teal text-slate-200 hover:text-white font-medium font-sans text-sm transition-all focus:outline-none cursor-pointer"
            >
              <span>Inspect Full Tech Stack</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400">
            // DITHEROS ALGORITHMIC CONTENT ARCHITECTURE // FEATURED
          </div>
        </div>
      </div>
    </section>
  );
};
