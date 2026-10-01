import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Activity,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { NeuralPathwayCanvas } from '../components/NeuralPathwayCanvas';

export const NeuroSyncSection: React.FC = () => {
  const [activeBand, setActiveBand] = useState<'alpha' | 'beta' | 'theta' | 'gamma'>('alpha');

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
    <section id="neurosync" className="relative py-20 sm:py-24 lg:py-28 border-t border-[#27272A] light:border-[#E5E7EB] bg-[#030712] light:bg-white text-[#FFFFFF] light:text-[#111827] overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting - reduced on mobile */}
      <div className="absolute top-1/4 -right-48 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#4ADEDE]/5 light:bg-[#EA580C]/5 rounded-full blur-[60px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#60F1AD]/5 light:bg-[#FDBA74]/5 rounded-full blur-[60px] md:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#60F1AD] light:bg-[#FDBA74] animate-pulse" />
            <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">NeuroSync Engine</span>
            <span className="text-[#A1A1AA] light:text-gray-300">Neural Signal Telemetry v2.0</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-medium text-[#FFFFFF] light:text-[#111827] tracking-tight font-sans leading-[1.04]">
            Think Faster. <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">Master Your Mind.</span>
          </h2>

          <p className="text-[#A1A1AA] light:text-[#4B5563] text-base sm:text-lg leading-relaxed font-sans pt-1">
            Real-time mental bandwidth tracking, synaptic pathway mapping, and closed-loop FPGA digital signal processing engineered for sub-5ms low-latency neural interfaces.
          </p>
        </div>

        {/* Bento Grid Layout in Surface */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Bento Item 1: Wide Hero Card - Neural Pathway Mapping with Live Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card relative overflow-hidden group"
          >
            {/* Top row: Label + Status */}
            <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
              <div className="flex items-center gap-2 text-[#4ADEDE] light:text-[#EA580C] font-bold">
                <Brain className="w-4 h-4" />
                <span className="uppercase tracking-wider">// NEURAL PATHWAY MAPPING</span>
              </div>
              <span className="text-[#A1A1AA] light:text-gray-400 text-[11px] font-semibold">SYNAPTIC TOPOLOGY</span>
            </div>

            {/* Interactive Neural Pathway Canvas Window */}
            <div className="relative z-10 w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-[#27272A] light:border-[#2E353F] bg-[#030712] light:bg-[#0E1013] mb-5 shadow-inner">
              <NeuralPathwayCanvas className="w-full h-full" />
              <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-white pointer-events-none bg-[#030712]/90 light:bg-[#0E1013]/90 px-3 py-1.5 rounded-md border border-[#27272A] light:border-[#2E353F] backdrop-blur-sm">
                <span className="text-[#A1A1AA] light:text-gray-300">ACTION POTENTIAL: 1.2 mV</span>
                <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">PROPAGATION: 120 m/s</span>
                <span className="hidden sm:inline text-[#60F1AD] light:text-[#FDBA74]">BANDWIDTH: 50.0 MHz</span>
              </div>
            </div>

            {/* Content & Description */}
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] light:text-white font-sans">
                Visualizing Thought Patterns &amp; Synaptic Flow States
              </h3>
              <p className="text-[#A1A1AA] light:text-gray-300 text-sm leading-relaxed font-sans">
                Mapping high-density multi-channel EEG electrode telemetry into coherent cognitive states through pipelined spatial covariance matrices and fixed-point DSP spectral decomposition.
              </p>
            </div>
          </motion.div>

          {/* Bento Item 2: Cognitive Load Tracking (Dashboard & Charts) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#60F1AD] light:hover:border-[#FDBA74] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
                <div className="flex items-center gap-2 text-[#60F1AD] light:text-[#FDBA74] font-bold">
                  <Activity className="w-4 h-4" />
                  <span className="uppercase tracking-wider">// COGNITIVE LOAD</span>
                </div>
                <span className="text-[#A1A1AA] light:text-gray-400">METRICS</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] light:text-white font-sans mb-3">
                Cognitive Load Tracking
              </h3>

              <p className="text-[#A1A1AA] light:text-gray-300 text-xs sm:text-sm leading-relaxed font-sans mb-5">
                Real-time mental bandwidth metrics calibrated from power spectral density across standard physiological frequency bands.
              </p>

              {/* Bandwidth Progress Gauges */}
              <div className="space-y-3 font-mono text-xs">
                {/* Alpha Band */}
                <div
                  onClick={() => setActiveBand('alpha')}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    activeBand === 'alpha'
                      ? 'bg-[#030712] light:bg-[#0E1013] border-[#4ADEDE] light:border-[#EA580C]'
                      : 'bg-[#030712]/60 light:bg-[#0E1013]/60 border-[#27272A] light:border-[#2E353F] hover:border-[#4ADEDE]/40 light:hover:border-[#EA580C]/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[#FFFFFF] light:text-white font-bold">Alpha (8–12 Hz)</span>
                    <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">Flow / Focus 84%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#27272A] light:bg-[#2E353F] overflow-hidden">
                    <div className="h-full bg-[#4ADEDE] light:bg-[#EA580C] rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                {/* Beta Band */}
                <div
                  onClick={() => setActiveBand('beta')}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    activeBand === 'beta'
                      ? 'bg-[#030712] light:bg-[#0E1013] border-[#60F1AD] light:border-[#FDBA74]'
                      : 'bg-[#030712]/60 light:bg-[#0E1013]/60 border-[#27272A] light:border-[#2E353F] hover:border-[#60F1AD]/40 light:hover:border-[#FDBA74]/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[#FFFFFF] light:text-white font-bold">Beta (13–30 Hz)</span>
                    <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">Active Logic 68%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#27272A] light:bg-[#2E353F] overflow-hidden">
                    <div className="h-full bg-[#60F1AD] light:bg-[#FDBA74] rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>

                {/* Theta Band */}
                <div
                  onClick={() => setActiveBand('theta')}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    activeBand === 'theta'
                      ? 'bg-[#030712] light:bg-[#0E1013] border-[#4ADEDE] light:border-[#EA580C]'
                      : 'bg-[#030712]/60 light:bg-[#0E1013]/60 border-[#27272A] light:border-[#2E353F] hover:border-[#4ADEDE]/40 light:hover:border-[#EA580C]/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[#FFFFFF] light:text-white font-bold">Theta (4–7 Hz)</span>
                    <span className="text-[#A1A1AA] light:text-gray-400">Memory Recall 32%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#27272A] light:bg-[#2E353F] overflow-hidden">
                    <div className="h-full bg-[#A1A1AA] rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#27272A] light:border-[#2E353F] text-[11px] font-mono text-[#A1A1AA] light:text-gray-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#60F1AD] light:bg-[#FDBA74]" />
                <span>Live Spectral FFT</span>
              </span>
              <span className="text-[#FFFFFF] light:text-white font-semibold">1024-PT TRANSFORM</span>
            </div>
          </motion.div>

          {/* Bento Item 3: Adaptive Focus Protocols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-6 rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
                <div className="flex items-center gap-2 text-[#4ADEDE] light:text-[#EA580C] font-bold">
                  <Sliders className="w-4 h-4" />
                  <span className="uppercase tracking-wider">// ADAPTIVE FOCUS PROTOCOLS</span>
                </div>
                <span className="text-[#A1A1AA] light:text-gray-400">CLOSED LOOP</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] light:text-white font-sans mb-2">
                Real-Time Noise &amp; Ocular Artifact Rejection
              </h3>

              <p className="text-[#A1A1AA] light:text-gray-300 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                Adaptive LMS filter engines operating continuously on incoming analog bio-signals to eliminate electrooculogram (EOG) blink spikes and electromyogram (EMG) muscle tremor interference.
              </p>

              {/* Protocol Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#4ADEDE] light:text-[#EA580C] border border-[#27272A] light:border-[#2E353F] font-semibold">
                  Adaptive LMS Filter
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#60F1AD] light:text-[#FDBA74] border border-[#27272A] light:border-[#2E353F] font-semibold">
                  50Hz Notch Removal
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#A1A1AA] light:text-gray-300 border border-[#27272A] light:border-[#2E353F]">
                  Sub-5ms Latency
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#60F1AD] light:text-[#FDBA74] border border-[#27272A] light:border-[#2E353F] font-bold">
                  &gt;99% SNR Gain
                </span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#27272A] light:border-[#2E353F] text-[11px] font-mono text-[#A1A1AA] light:text-gray-400 flex items-center justify-between">
              <span>ACTIVE ELECTRODE FRONT-END</span>
              <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">LOW IMPEDANCE</span>
            </div>
          </motion.div>

          {/* Bento Item 4: Edge AI & Quantized BCI Synthesis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#60F1AD] light:hover:border-[#FDBA74] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
                <div className="flex items-center gap-2 text-[#60F1AD] light:text-[#FDBA74] font-bold">
                  <Zap className="w-4 h-4" />
                  <span className="uppercase tracking-wider">// ON-CHIP EDGE AI</span>
                </div>
                <span className="text-[#A1A1AA] light:text-gray-400">VIVADO RTL</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] light:text-white font-sans mb-2">
                Quantized Neural State Classification
              </h3>

              <p className="text-[#A1A1AA] light:text-gray-300 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                Embedding quantized 8-bit convolutional layers into Xilinx FPGA DSP slices, predicting user attentional focus and mental fatigue states with zero cloud communication overhead.
              </p>

              {/* Protocol Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#4ADEDE] light:text-[#EA580C] border border-[#27272A] light:border-[#2E353F] font-semibold">
                  8-Bit Fixed-Point
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#60F1AD] light:text-[#FDBA74] border border-[#27272A] light:border-[#2E353F] font-semibold">
                  Zero OS Jitter
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#A1A1AA] light:text-gray-300 border border-[#27272A] light:border-[#2E353F]">
                  &lt;350mW Thermal Power
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#4ADEDE] light:text-[#EA580C] border border-[#27272A] light:border-[#2E353F] font-bold">
                  Deterministic Clock
                </span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#27272A] light:border-[#2E353F] text-[11px] font-mono text-[#A1A1AA] light:text-gray-400 flex items-center justify-between">
              <span>HARDWARE ACCELERATOR PIPELINE</span>
              <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">50.0 MHz CLK</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151]">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-bold font-mono text-sm hover:bg-[#60F1AD] light:hover:bg-[#C2410C] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#4ADEDE]/20 light:shadow-[#EA580C]/20 focus:outline-none cursor-pointer"
            >
              <span>Explore Neural Hardware Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#030712] light:bg-[#0E1013] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] text-[#4ADEDE] light:text-[#EA580C] font-medium font-mono text-sm transition-all hover:-translate-y-0.5 focus:outline-none cursor-pointer"
            >
              <span>Inspect Bio-DSP Tech Stack</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#A1A1AA] light:text-gray-400">
            // NEUROSYNC COGNITIVE ARCHITECTURE // FEATURED
          </div>
        </div>
      </div>
    </section>
  );
};
