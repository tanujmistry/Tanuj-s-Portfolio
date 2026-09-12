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
  { text: 'cardiac arrhythmia biopotentials', tag: 'MIT-BIH SUB-10MS', color: '#4ADEDE' },
  { text: 'FPGA timing closure at 50MHz', tag: 'VIVADO RTL SYNTHESIS', color: '#60F1AD' },
  { text: '12+ node CAN telemetry packets', tag: 'FORMULA DAQ STREAM', color: '#4ADEDE' },
  { text: 'quantized CNN neural weights', tag: '8-BIT FIXED POINT', color: '#60F1AD' },
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
    <section id="gridscan" className="relative py-20 sm:py-24 lg:py-28 border-t border-[#27272A] light:border-gray-200 bg-[#030712] light:bg-white text-[#FFFFFF] light:text-[#111827] overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting in cyber cyan & electric mint */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-[#4ADEDE]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-[#60F1AD]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#18181B] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-200 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          {/* Background Interactive Canvas GridScan Layer */}
          <div className="absolute inset-0 z-0 pointer-events-auto opacity-75">
            <GridScanCanvas
              scanColor="#4ADEDE"
              gridColor="rgba(74, 222, 222, 0.08)"
              className="w-full h-full"
            />
          </div>

          <div className="relative z-10">
            {/* Top Pill Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-300 text-xs font-mono shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60F1AD] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60F1AD]" />
                </span>
                <span className="font-bold text-[#4ADEDE] light:text-[#0284C7] tracking-wide">CALIBRATED</span>
                <span className="text-[#A1A1AA] light:text-[#4B5563]">v2.0 hardware telemetry matrix</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] light:text-[#4B5563]">
                <Radar className="w-3.5 h-3.5 text-[#4ADEDE] animate-spin" style={{ animationDuration: '6s' }} />
                <span>RADAR SCAN ACTIVE</span>
              </div>
            </div>

            {/* Dynamic Headline: Hold on, scanning for... */}
            <div className="space-y-3 mb-6">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-[#FFFFFF] light:text-[#111827] tracking-tight leading-[1.08] font-sans">
                Hold on, scanning for{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTarget.text}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-[#4ADEDE] light:text-[#0284C7] font-bold underline decoration-[#60F1AD] decoration-4 underline-offset-8"
                  >
                    {currentTarget.text}
                  </motion.span>
                </AnimatePresence>
              </h2>

              <p className="text-[#A1A1AA] light:text-[#4B5563] text-base sm:text-lg max-w-3xl leading-relaxed font-sans pt-2">
                High-throughput scanning matrix indexing real-time digital signal processing, RTL synthesis, and edge neural networks synthesized for biomedical and motorsport applications.
              </p>
            </div>

            {/* 4 Detected Telemetry Lock-On Cards in #18181B Surface */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
              {/* Target 1: FPGA Vivado */}
              <div className="rounded-xl bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200 hover:border-[#4ADEDE] p-4 transition-all hover:-translate-y-1 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#4ADEDE] light:text-[#0284C7] flex items-center gap-1.5 font-bold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>FPGA_CORE_01</span>
                  </span>
                  <span className="text-[10px] text-[#60F1AD]">LOCKED</span>
                </div>
                <div className="text-sm font-semibold text-[#FFFFFF] light:text-[#111827]">Xilinx Vivado RTL</div>
                <div className="text-xs font-mono text-[#A1A1AA] light:text-[#4B5563] mt-1">50MHz Timing Closure</div>
              </div>

              {/* Target 2: ECG Arrhythmia */}
              <div className="rounded-xl bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200 hover:border-[#60F1AD] p-4 transition-all hover:-translate-y-1 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#60F1AD] light:text-[#059669] flex items-center gap-1.5 font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>BIOPOTENTIAL</span>
                  </span>
                  <span className="text-[10px] text-[#4ADEDE]">&lt;10ms</span>
                </div>
                <div className="text-sm font-semibold text-[#FFFFFF] light:text-[#111827]">ECG Arrhythmia CNN</div>
                <div className="text-xs font-mono text-[#A1A1AA] light:text-[#4B5563] mt-1">SPI Analog Front-End</div>
              </div>

              {/* Target 3: CAN Bus */}
              <div className="rounded-xl bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200 hover:border-[#4ADEDE] p-4 transition-all hover:-translate-y-1 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#4ADEDE] light:text-[#0284C7] flex items-center gap-1.5 font-bold">
                    <Radio className="w-3.5 h-3.5" />
                    <span>CAN_TELEMETRY</span>
                  </span>
                  <span className="text-[10px] text-[#60F1AD]">12+ NODES</span>
                </div>
                <div className="text-sm font-semibold text-[#FFFFFF] light:text-[#111827]">Formula Racecar DAQ</div>
                <div className="text-xs font-mono text-[#A1A1AA] light:text-[#4B5563] mt-1">RF Pit-to-Vehicle</div>
              </div>

              {/* Target 4: Vibration FFT */}
              <div className="rounded-xl bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200 hover:border-[#60F1AD] p-4 transition-all hover:-translate-y-1 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#60F1AD] light:text-[#059669] flex items-center gap-1.5 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>FFT_SPECTRAL</span>
                  </span>
                  <span className="text-[10px] text-[#4ADEDE]">92% ACC</span>
                </div>
                <div className="text-sm font-semibold text-[#FFFFFF] light:text-[#111827]">Predictive Maintenance</div>
                <div className="text-xs font-mono text-[#A1A1AA] light:text-[#4B5563] mt-1">Bearing Fault Detection</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4ADEDE] hover:bg-[#60F1AD] text-[#030712] font-bold font-mono text-sm shadow-lg shadow-[#4ADEDE]/20 transition-all hover:-translate-y-0.5 focus:outline-none cursor-pointer"
              >
                <span>Explore Flagship Implementations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('skills')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#030712] light:bg-white hover:bg-[#27272A] light:hover:bg-gray-100 border border-[#27272A] light:border-gray-300 hover:border-[#4ADEDE] text-[#4ADEDE] light:text-[#0284C7] font-mono text-sm transition-all hover:-translate-y-0.5 focus:outline-none cursor-pointer"
              >
                <span>Inspect Technology Stack</span>
              </button>

              <span className="text-xs font-mono text-[#A1A1AA] light:text-[#4B5563] ml-auto hidden md:inline-block">
                // REACT BITS GRIDSCAN MATRIX // TELEMETRY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
