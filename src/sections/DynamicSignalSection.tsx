import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Sliders,
  Cpu,
  Zap,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { DynamicSignalCanvas } from '../components/DynamicSignalCanvas';

export const DynamicSignalSection: React.FC = () => {
  const [harmonicMode, setHarmonicMode] = useState<'fundamental' | 'harmonic' | 'chirp'>('fundamental');
  const [activeSpeed, setActiveSpeed] = useState<number>(1);

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
    <section
      id="dynamic-signal"
      className="relative py-20 sm:py-24 border-t border-[#27272A] light:border-[#E5E7EB] bg-[#030712] light:bg-white text-[#FFFFFF] light:text-[#111827] overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient lighting - reduced on mobile */}
      <div className="absolute top-1/4 -left-48 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#4ADEDE]/5 light:bg-[#EA580C]/5 rounded-full blur-[60px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#60F1AD]/5 light:bg-[#FDBA74]/5 rounded-full blur-[60px] md:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] light:bg-[#191C21] text-white border border-[#27272A] light:border-[#374151] text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#60F1AD] light:bg-[#FDBA74] animate-pulse" />
            <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">[ NEXUS-CORE // V.8.0 ]</span>
            <span className="text-[#60F1AD] light:text-[#FDBA74] font-semibold">SYS.ON</span>
            <span className="text-[#A1A1AA] light:text-gray-300">Dynamic Signal Orchestration</span>
          </div>

          <h2
            className="text-4xl sm:text-6xl lg:text-[64px] font-medium text-[#FFFFFF] light:text-[#111827] tracking-normal font-sans"
            style={{ lineHeight: '1.04' }}
          >
            Dynamic Signal <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">Orchestration</span>
          </h2>

          <p className="text-[#A1A1AA] light:text-[#4B5563] text-sm sm:text-base leading-[1.6] font-mono">
            An intelligent synchronization layer designed to process real-time telemetry into definitive execution states.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Card 1: Neural Pathway (Wide Flagship Canvas Card - 8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-8 rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] transition-all p-6 flex flex-col justify-between shadow-card relative overflow-hidden group"
          >
            <div>
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
                <div className="flex items-center gap-2 text-[#4ADEDE] light:text-[#EA580C] font-bold">
                  <Activity className="w-4 h-4" />
                  <span className="uppercase tracking-wider">// NEURAL PATHWAY</span>
                </div>

                {/* Harmonic Mode Toggles */}
                <div className="flex items-center gap-1.5 bg-[#030712] light:bg-[#0E1013] p-1 rounded-lg border border-[#27272A] light:border-[#2E353F]">
                  {(['fundamental', 'harmonic', 'chirp'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setHarmonicMode(mode)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono transition-all duration-150 cursor-pointer ${
                        harmonicMode === mode
                          ? 'bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-bold shadow-sm'
                          : 'text-[#A1A1AA] light:text-gray-400 hover:text-[#FFFFFF] light:hover:text-white'
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Signal Canvas Viewport */}
              <div className="relative w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden border border-[#27272A] light:border-[#2E353F] bg-[#030712] light:bg-[#0E1013] mb-5 shadow-inner">
                <DynamicSignalCanvas
                  className="w-full h-full"
                  harmonicMode={harmonicMode}
                  activeSpeed={activeSpeed}
                />

                {/* Top Quick Readout */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181B]/90 light:bg-[#191C21]/90 border border-[#27272A] light:border-[#2E353F] backdrop-blur-sm text-xs font-mono text-white pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#60F1AD] light:bg-[#FDBA74] animate-pulse" />
                  <span className="text-[#4ADEDE] light:text-[#EA580C]">FREQUENCY: 50.0 MHz</span>
                  <span className="text-[#A1A1AA] light:text-gray-400 hidden sm:inline">| HARMONIC PHASE 0.0°</span>
                </div>

                {/* Bottom Speed Modulation Slider */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181B]/90 light:bg-[#191C21]/90 border border-[#27272A] light:border-[#2E353F] backdrop-blur-sm text-xs font-mono text-white">
                  <Sliders className="w-3 h-3 text-[#4ADEDE] light:text-[#EA580C]" />
                  <span className="text-[#A1A1AA] light:text-gray-400 text-[11px]">RATE:</span>
                  <button
                    type="button"
                    onClick={() => setActiveSpeed((prev) => (prev === 1 ? 1.8 : prev === 1.8 ? 0.5 : 1))}
                    className="text-[#60F1AD] light:text-[#FDBA74] font-bold text-[11px] hover:underline cursor-pointer"
                  >
                    {activeSpeed}X SPEED
                  </button>
                </div>
              </div>

              {/* Card Description */}
              <h3 className="text-xl sm:text-2xl font-medium text-[#FFFFFF] light:text-white font-sans mb-2">
                Real-Time Atmospheric Waveform Modulation
              </h3>
              <p className="text-[#A1A1AA] light:text-gray-300 text-sm leading-[1.6] font-mono">
                Continuous harmonic synthesis translating raw multi-channel biopotential and telemetry streams into low-jitter execution vectors with sub-1.2ms deterministic phase coherence.
              </p>
            </div>

            {/* Bottom telemetry indicators */}
            <div className="mt-5 pt-3 border-t border-[#27272A] light:border-[#2E353F] text-xs font-mono text-[#A1A1AA] light:text-gray-400 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#4ADEDE] light:text-[#EA580C]" />
                <span>CARRIER BAND: 50MHz RTL</span>
              </span>
              <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">QOS: SYNCHRONIZED</span>
            </div>
          </motion.div>

          {/* Right Column: Cards 2, 3, 4 (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Card 2: Telemetry Ingress */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#60F1AD] light:hover:border-[#FDBA74] transition-all p-6 flex flex-col justify-between shadow-card"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#60F1AD] light:text-[#FDBA74] font-bold">
                    <Cpu className="w-4 h-4" />
                    <span className="uppercase tracking-wider">// TELEMETRY INGRESS</span>
                  </div>
                  <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">01 NORMALIZING</span>
                </div>

                <div className="text-base font-semibold text-[#FFFFFF] light:text-white font-sans mb-1">
                  Multi-Channel Ingest Stream
                </div>
                <p className="text-[#A1A1AA] light:text-gray-300 text-xs leading-[1.6] font-mono mb-3">
                  Pipelined FPGA circular ring buffers receiving 12+ parallel sensor feeds with hardware zero-copy DMA synchronization.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-[#030712] light:bg-[#0E1013] border border-[#27272A] light:border-[#2E353F]">
                    <span className="text-[10px] text-[#A1A1AA] light:text-gray-400 block">BANDWIDTH</span>
                    <span className="text-[#FFFFFF] light:text-white font-bold">50 MB/s</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#030712] light:bg-[#0E1013] border border-[#27272A] light:border-[#2E353F]">
                    <span className="text-[10px] text-[#A1A1AA] light:text-gray-400 block">BUFFER LAG</span>
                    <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">&lt; 0.3 ms</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#27272A] light:border-[#2E353F] text-[11px] font-mono text-[#A1A1AA] light:text-gray-400 flex justify-between">
                <span>STAGE: INGESTION</span>
                <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">LOCK 100%</span>
              </div>
            </motion.div>

            {/* Card 3: Vector Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] transition-all p-6 flex flex-col justify-between shadow-card"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#4ADEDE] light:text-[#EA580C] font-bold">
                    <Zap className="w-4 h-4" />
                    <span className="uppercase tracking-wider">// VECTOR ANALYSIS</span>
                  </div>
                  <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">02 PREDICTIVE</span>
                </div>

                <div className="text-base font-semibold text-[#FFFFFF] light:text-white font-sans mb-1">
                  6-DoF Kinematic Projection
                </div>
                <p className="text-[#A1A1AA] light:text-gray-300 text-xs leading-[1.6] font-mono mb-3">
                  Fixed-point matrix factorization computing real-time spatial trajectories, angle-of-attack, and attitude vectors.
                </p>

                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#4ADEDE] light:text-[#EA580C] border border-[#27272A] light:border-[#2E353F]">
                    Eigen-Decomp
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#60F1AD] light:text-[#FDBA74] border border-[#27272A] light:border-[#2E353F]">
                    6-DoF EKF
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#030712] light:bg-[#0E1013] text-[#FFFFFF] light:text-white border border-[#27272A] light:border-[#2E353F]">
                    Zero Drift
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#27272A] light:border-[#2E353F] text-[11px] font-mono text-[#A1A1AA] light:text-gray-400 flex justify-between">
                <span>ACCURACY: 99.8%</span>
                <span className="text-[#4ADEDE] light:text-[#EA580C] font-bold">EIGEN READY</span>
              </div>
            </motion.div>

            {/* Card 4: Variance Mitigation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#60F1AD] light:hover:border-[#FDBA74] transition-all p-6 flex flex-col justify-between shadow-card"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272A] light:border-[#2E353F] font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#60F1AD] light:text-[#FDBA74] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="uppercase tracking-wider">// VARIANCE MITIGATION</span>
                  </div>
                  <span className="text-[#FFFFFF] light:text-white font-bold">03 CLOSED-LOOP</span>
                </div>

                <div className="text-base font-semibold text-[#FFFFFF] light:text-white font-sans mb-1">
                  PID Feedback Stabilization
                </div>
                <p className="text-[#A1A1AA] light:text-gray-300 text-xs leading-[1.6] font-mono mb-3">
                  Dynamic noise cancellation suppressing environmental jitter and clock drift down to 0.04 picoseconds.
                </p>

                <div className="w-full h-1.5 rounded-full bg-[#030712] light:bg-[#0E1013] overflow-hidden border border-[#27272A] light:border-[#2E353F]">
                  <div className="w-[94%] h-full rounded-full bg-gradient-to-r from-[#4ADEDE] to-[#60F1AD] light:from-[#EA580C] light:to-[#FDBA74]" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#A1A1AA] light:text-gray-400 mt-1.5">
                  <span>VARIANCE REJECTION</span>
                  <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">-32 dB NOISE</span>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#27272A] light:border-[#2E353F] text-[11px] font-mono text-[#A1A1AA] light:text-gray-400 flex justify-between">
                <span>LATENCY: &lt; 1.2ms</span>
                <span className="text-[#60F1AD] light:text-[#FDBA74] font-bold">MITIGATED</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4ADEDE] light:bg-[#EA580C] hover:bg-[#60F1AD] light:hover:bg-[#C2410C] text-[#030712] light:text-white font-bold font-mono text-xs transition-all duration-150 shadow-md shadow-[#4ADEDE]/20 light:shadow-[#EA580C]/20 cursor-pointer"
            >
              <span>Explore Signal Processing Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Secondary Action Button */}
            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#030712] light:bg-[#0E1013] hover:bg-[#27272A] light:hover:bg-[#2E353F] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] text-[#4ADEDE] light:text-[#EA580C] font-medium font-mono text-xs transition-all duration-150 cursor-pointer"
            >
              <span>Inspect Hardware Architectures</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#A1A1AA] light:text-gray-400">
            // NEUFORM STAFF FEATURED // DYNAMIC SIGNAL ORCHESTRATION
          </div>
        </div>
      </div>
    </section>
  );
};
