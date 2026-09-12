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
  { text: 'cardiac arrhythmia biopotentials', tag: 'MIT-BIH SUB-10MS' },
  { text: 'FPGA timing closure at 50MHz', tag: 'VIVADO RTL SYNTHESIS' },
  { text: '12+ node CAN telemetry packets', tag: 'FORMULA DAQ STREAM' },
  { text: 'quantized CNN neural weights', tag: '8-BIT FIXED POINT' },
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
    <section id="gridscan" className="relative py-20 sm:py-28 border-t border-[#D4D4D4] bg-white overflow-hidden">
      {/* Main Content Container inside Dark Algorithmic Matrix Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[15px] bg-[#050505] border border-[#D4D4D4] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden text-white">
          {/* Background Interactive Canvas GridScan Layer */}
          <div className="absolute inset-0 z-0 pointer-events-auto opacity-80">
            <GridScanCanvas
              scanColor="#FFFFFF"
              gridColor="rgba(255, 255, 255, 0.08)"
              className="w-full h-full"
            />
          </div>

          <div className="relative z-10">
            {/* Top Pill Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-mono">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="font-bold text-white tracking-wide">CALIBRATED</span>
                <span className="text-neutral-400">v2.0 hardware telemetry matrix</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Radar className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
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
                    className="inline-block text-white font-bold underline decoration-[#D4D4D4] decoration-4 underline-offset-8"
                  >
                    {currentTarget.text}
                  </motion.span>
                </AnimatePresence>
              </h2>

              <p className="text-neutral-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans pt-2">
                High-throughput scanning matrix indexing real-time digital signal processing, RTL synthesis, and edge neural networks synthesized for biomedical and motorsport applications.
              </p>
            </div>

            {/* 4 Detected Telemetry Lock-On Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
              {/* Target 1: FPGA Vivado */}
              <div className="rounded-[15px] bg-neutral-900/90 border border-neutral-750 hover:border-white p-4 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white flex items-center gap-1.5 font-bold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>FPGA_CORE_01</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">LOCKED</span>
                </div>
                <div className="text-sm font-semibold text-white">Xilinx Vivado RTL</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">50MHz Timing Closure</div>
              </div>

              {/* Target 2: ECG Arrhythmia */}
              <div className="rounded-[15px] bg-neutral-900/90 border border-neutral-750 hover:border-white p-4 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white flex items-center gap-1.5 font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>BIOPOTENTIAL</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">&lt;10ms</span>
                </div>
                <div className="text-sm font-semibold text-white">ECG Arrhythmia CNN</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">SPI Analog Front-End</div>
              </div>

              {/* Target 3: CAN Bus */}
              <div className="rounded-[15px] bg-neutral-900/90 border border-neutral-750 hover:border-white p-4 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white flex items-center gap-1.5 font-bold">
                    <Radio className="w-3.5 h-3.5" />
                    <span>CAN_TELEMETRY</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">12+ NODES</span>
                </div>
                <div className="text-sm font-semibold text-white">Formula Racecar DAQ</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">RF Pit-to-Vehicle</div>
              </div>

              {/* Target 4: Vibration FFT */}
              <div className="rounded-[15px] bg-neutral-900/90 border border-neutral-750 hover:border-white p-4 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white flex items-center gap-1.5 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>FFT_SPECTRAL</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">92% ACC</span>
                </div>
                <div className="text-sm font-semibold text-white">Predictive Maintenance</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">Bearing Fault Detection</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-white hover:bg-neutral-200 text-[#050505] font-bold font-sans text-sm shadow-lg transition-all focus:outline-none cursor-pointer"
              >
                <span>Explore Flagship Implementations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('skills')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-medium font-sans text-sm transition-all focus:outline-none cursor-pointer"
              >
                <span>Inspect Technology Stack</span>
              </button>

              <span className="text-xs font-mono text-neutral-400 ml-auto hidden md:inline-block">
                // REACT BITS GRIDSCAN MATRIX // TELEMETRY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
