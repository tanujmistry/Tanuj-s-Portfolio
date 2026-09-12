import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radar,
  ArrowRight,
  Cpu,
  Activity,
  Radio,
  Zap,
} from 'lucide-react';
import { GridScanCanvas } from '../components/GridScanCanvas';

const scanningTargets = [
  { text: 'cardiac arrhythmia biopotentials', tag: 'MIT-BIH SUB-10MS', color: '#4ADE80' },
  { text: 'FPGA timing closure at 50MHz', tag: 'VIVADO RTL SYNTHESIS', color: '#00e5c7' },
  { text: '12+ node CAN telemetry packets', tag: 'FORMULA DAQ STREAM', color: '#22d3ee' },
  { text: 'quantized CNN neural weights', tag: '8-BIT FIXED POINT', color: '#DFB8F2' },
];

export const GridScanSection: React.FC = () => {
  const [targetIndex, setTargetIndex] = useState(0);

  // Cycle through scanning targets
  useEffect(() => {
    const interval = setInterval(() => {
      setTargetIndex((prev) => (prev + 1) % scanningTargets.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const currentTarget = scanningTargets[targetIndex];

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
    <section id="gridscan" className="relative py-20 sm:py-28 border-t border-[#27272A] overflow-hidden">
      {/* Background Interactive Canvas GridScan Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-70">
        <GridScanCanvas
          scanColor="#4ADE80"
          gridColor="rgba(74, 222, 128, 0.08)"
          className="w-full h-full"
        />
      </div>

      {/* Atmospheric Vignette & Color Gradients matching the design spec */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0e17] via-transparent to-[#0a0e17] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7E3B97]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[15px] bg-[#0a0e17]/85 border border-[#27272A] p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
          {/* Top Pill Badge (Neuform style) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7E3B97]/20 border border-[#7E3B97]/50 text-xs font-mono">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
              </span>
              <span className="font-bold text-[#4ADE80] tracking-wide">NEW</span>
              <span className="text-slate-400">Just calibrated v2.0 hardware telemetry</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Radar className="w-3.5 h-3.5 text-[#4ADE80] animate-spin" style={{ animationDuration: '6s' }} />
              <span>RADAR SCAN ACTIVE</span>
            </div>
          </div>

          {/* Dynamic Headline: Hold on, scanning for... */}
          <div className="space-y-3 mb-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.08] font-sans">
              Hold on, scanning for{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTarget.text}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block text-[#4ADE80] font-semibold underline decoration-[#7E3B97] decoration-4 underline-offset-8"
                >
                  {currentTarget.text}
                </motion.span>
              </AnimatePresence>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans pt-2">
              High-throughput scanning matrix indexing real-time digital signal processing, RTL synthesis, and edge neural networks synthesized for biomedical and motorsport applications.
            </p>
          </div>

          {/* 4 Detected Telemetry Lock-On Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {/* Target 1: FPGA Vivado */}
            <div className="rounded-[15px] bg-navy-900/90 border border-[#27272A] hover:border-[#4ADE80]/50 p-4 transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#4ADE80] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>FPGA_CORE_01</span>
                </span>
                <span className="text-[10px] text-slate-400">LOCKED</span>
              </div>
              <div className="text-sm font-semibold text-white">Xilinx Vivado RTL</div>
              <div className="text-xs font-mono text-slate-400 mt-1">50MHz Timing Closure</div>
            </div>

            {/* Target 2: ECG Arrhythmia */}
            <div className="rounded-[15px] bg-navy-900/90 border border-[#27272A] hover:border-[#00e5c7]/50 p-4 transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#00e5c7] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>BIOPOTENTIAL</span>
                </span>
                <span className="text-[10px] text-slate-400">&lt;10ms</span>
              </div>
              <div className="text-sm font-semibold text-white">ECG Arrhythmia CNN</div>
              <div className="text-xs font-mono text-slate-400 mt-1">SPI Analog Front-End</div>
            </div>

            {/* Target 3: CAN Bus */}
            <div className="rounded-[15px] bg-navy-900/90 border border-[#27272A] hover:border-[#22d3ee]/50 p-4 transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#22d3ee] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5" />
                  <span>CAN_TELEMETRY</span>
                </span>
                <span className="text-[10px] text-slate-400">12+ NODES</span>
              </div>
              <div className="text-sm font-semibold text-white">Formula Racecar DAQ</div>
              <div className="text-xs font-mono text-slate-400 mt-1">RF Pit-to-Vehicle</div>
            </div>

            {/* Target 4: Vibration FFT */}
            <div className="rounded-[15px] bg-navy-900/90 border border-[#27272A] hover:border-[#DFB8F2]/50 p-4 transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#DFB8F2] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>FFT_SPECTRAL</span>
                </span>
                <span className="text-[10px] text-slate-400">92% ACC</span>
              </div>
              <div className="text-sm font-semibold text-white">Predictive Maintenance</div>
              <div className="text-xs font-mono text-slate-400 mt-1">Bearing Fault Detection</div>
            </div>
          </div>

          {/* Action CTAs (Matching button tokens from react-bits-gridscan-DESIGN.md) */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-[#4ADE80] hover:bg-[#3ec470] text-navy-950 font-bold font-sans text-sm shadow-lg transition-all focus:outline-none cursor-pointer"
            >
              <span>Explore Flagship Implementations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-[#7E3B97]/25 hover:bg-[#7E3B97]/40 border border-[#7E3B97] text-white font-medium font-sans text-sm transition-all focus:outline-none cursor-pointer"
            >
              <span>Inspect Technology Stack</span>
            </button>

            <span className="text-xs font-mono text-slate-400 ml-auto hidden md:inline-block">
              // REACT BITS GRIDSCAN MATRIX // NEUFORM STAFF FEATURED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
