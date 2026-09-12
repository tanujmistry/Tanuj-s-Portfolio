import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Radio,
  Activity,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { AeroNetCanvas, type AeroNode } from '../components/AeroNetCanvas';

export const AeroNetSection: React.FC = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>('2.4 GHz FHSS');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(1);

  // Automated pipeline cycle every 3500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev % 4) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const [selectedNode, setSelectedNode] = useState<AeroNode>({
    id: 'uav_01',
    name: 'UAV_SWARM_ALPHA',
    type: 'uav',
    x: 0.32,
    y: 0.44,
    altitude: '1,240 m',
    velocity: '84 km/h',
    rssi: '-58 dBm',
    status: 'active',
    color: '#FFFFFF',
  });

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

  const workflowSteps = [
    {
      id: 1,
      title: 'RF Packet Ingestion',
      category: 'PHYSICAL LAYER',
      description: 'SPI DMA circular ring buffer receiving 128-byte payload frames over sub-GHz transceivers at 50MHz.',
      metric: '0.4ms Ingest',
      tag: 'DMA RX',
    },
    {
      id: 2,
      title: 'Vivado FPGA Frame Sync',
      category: 'HARDWARE SYNTHESIS',
      description: 'Pipelined RTL CRC-32 integrity validation with zero-copy packet header demuxing on Xilinx Artix-7.',
      metric: '0.2ms Timing',
      tag: 'CRC-32 RTL',
    },
    {
      id: 3,
      title: 'Kalman State Estimation',
      category: 'DSP FILTERING',
      description: 'Recursive 6-DoF inertial trajectory tracking predicting spatial velocity vectors and waypoint drift.',
      metric: '99.98% Fidelity',
      tag: '6-DoF EKF',
    },
    {
      id: 4,
      title: 'Telemetry Dispatch',
      category: 'APPLICATION PROTOCOL',
      description: 'Deterministic dispatch across CAN-bus backbone and RF trackside telemetry displays at 100Hz.',
      metric: '100Hz Stream',
      tag: 'CAN 2.0B',
    },
  ];

  return (
    <section
      id="aeronet"
      className="relative py-20 sm:py-24 border-t border-[#27272A] light:border-gray-200 bg-[#030712] light:bg-white text-[#FFFFFF] light:text-[#111827] overflow-hidden transition-colors duration-300"
      style={{ paddingLeft: '24px', paddingRight: '24px' }}
    >
      {/* Ambient glow backdrop in cyber cyan & electric mint */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#4ADEDE]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#60F1AD]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181B] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#60F1AD] animate-pulse" />
              <span className="text-[#4ADEDE] light:text-[#0284C7] font-bold">AeroNet Visualization</span>
              <span className="text-[#A1A1AA] light:text-[#4B5563]">•</span>
              <span className="text-[#60F1AD] light:text-[#059669] font-semibold">Mesh Telemetry v2.4</span>
            </div>
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-[60px] font-normal tracking-[-0.025em] font-sans text-[#FFFFFF] light:text-[#111827]"
            style={{ lineHeight: '1.05' }}
          >
            Aeronautical Telemetry &amp; <span className="text-[#4ADEDE] light:text-[#0284C7] font-semibold">Interface Hierarchy</span>
          </h2>

          <p className="text-sm font-light leading-relaxed text-[#A1A1AA] light:text-[#4B5563] font-sans max-w-2xl">
            Aeronet Visualization Dashboard Section engineered for demonstrating multi-node application workflows, high-density telemetry routing, and FPGA hardware pipeline synchronization.
          </p>
        </div>

        {/* Modular Dashboard Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Panel: Primary Aeronautical Telemetry Canvas (col-span-8) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-8 rounded-2xl bg-[#18181B] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-200 hover:border-[#4ADEDE] shadow-card p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Tactical Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#27272A] light:border-gray-300 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#4ADEDE]" />
                <span className="text-[#FFFFFF] light:text-[#111827] font-bold uppercase tracking-wider">
                  RF TOPOLOGY STREAM
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#030712] light:bg-white text-[#60F1AD] light:text-[#059669] border border-[#27272A] light:border-gray-200 font-bold">
                  LIVE 100Hz
                </span>
              </div>

              {/* Frequency Band Selector Chips */}
              <div className="flex items-center gap-1.5 bg-[#030712] light:bg-white p-1 rounded-full border border-[#27272A] light:border-gray-200">
                {['2.4 GHz FHSS', '915 MHz LoRa', '5.8 GHz Telemetry'].map((band) => (
                  <button
                    key={band}
                    type="button"
                    onClick={() => setSelectedFrequency(band)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all duration-150 cursor-pointer ${
                      selectedFrequency === band
                        ? 'bg-[#4ADEDE] text-[#030712] font-bold shadow-sm'
                        : 'text-[#A1A1AA] light:text-[#4B5563] hover:text-[#FFFFFF] light:hover:text-[#111827]'
                    }`}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Canvas Viewport */}
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden border border-[#27272A] light:border-gray-300 bg-[#030712]">
              <AeroNetCanvas
                className="w-full h-full"
                selectedNodeId={selectedNode.id}
                onSelectNode={(node) => setSelectedNode(node)}
                frequencyBand={selectedFrequency}
              />

              {/* Top-Right Quick Readout Pill */}
              <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-[#030712]/80 border border-[#27272A] backdrop-blur-md text-[11px] font-mono text-[#FFFFFF] pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#60F1AD] animate-pulse" />
                <span className="font-normal">NODES ACTIVE:</span>
                <span className="text-[#4ADEDE] font-bold">5/5 LOCKED</span>
              </div>
            </div>

            {/* Bottom Telemetry Target Readout Panel */}
            <div className="mt-3 pt-3 border-t border-[#27272A] light:border-gray-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                <div className="text-[10px] text-[#A1A1AA] light:text-[#4B5563]">LOCKED TARGET</div>
                <div className="text-[#4ADEDE] light:text-[#0284C7] font-bold truncate mt-0.5">{selectedNode.name}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                <div className="text-[10px] text-[#A1A1AA] light:text-[#4B5563]">ALTITUDE / VELOCITY</div>
                <div className="text-[#FFFFFF] light:text-[#111827] font-medium mt-0.5">{selectedNode.altitude || 'N/A'} • {selectedNode.velocity || '0 km/h'}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                <div className="text-[10px] text-[#A1A1AA] light:text-[#4B5563]">SIGNAL STRENGTH</div>
                <div className="text-[#60F1AD] light:text-[#059669] font-bold mt-0.5">{selectedNode.rssi} (STABLE)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                <div className="text-[10px] text-[#A1A1AA] light:text-[#4B5563]">PACKET ROUTING</div>
                <div className="text-[#4ADEDE] light:text-[#0284C7] font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADEDE]" />
                  <span>DETERMINISTIC</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Modular Column: Workflow Pipeline & Real-Time Analytics (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Panel A: Application Workflow & Interface Hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-2xl bg-[#18181B] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-200 shadow-card p-4 sm:p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#27272A] light:border-gray-300 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#FFFFFF] light:text-[#111827] font-bold">
                    <Sliders className="w-3.5 h-3.5 text-[#4ADEDE]" />
                    <span className="uppercase tracking-wider">PIPELINE HIERARCHY</span>
                  </div>
                  <span className="text-[#A1A1AA] light:text-[#4B5563] text-[11px]">4 STAGES</span>
                </div>

                {/* Workflow Interactive Step Cards */}
                <div className="space-y-1.5">
                  {workflowSteps.map((step) => {
                    const isActive = activeWorkflowStep === step.id;
                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveWorkflowStep(step.id)}
                        className={`p-2.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-[#030712] light:bg-white border-[#4ADEDE] text-[#FFFFFF] light:text-[#111827]'
                            : 'bg-[#030712]/40 light:bg-white/60 border-[#27272A] light:border-gray-200 text-[#A1A1AA] light:text-[#4B5563] hover:border-[#4ADEDE]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className={`font-bold ${isActive ? 'text-[#4ADEDE] light:text-[#0284C7]' : 'text-[#A1A1AA] light:text-[#6B7280]'}`}>
                            {step.category}
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#18181B] light:bg-gray-100 text-[10px] text-[#60F1AD] light:text-[#059669] border border-[#27272A] light:border-gray-200">
                            {step.metric}
                          </span>
                        </div>
                        <div className="text-[13px] font-semibold text-[#FFFFFF] light:text-[#111827] mb-0.5">
                          {step.title}
                        </div>
                        <p className="text-[11px] font-light leading-[15px] text-[#A1A1AA] light:text-[#4B5563]">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#27272A] light:border-gray-300 text-[11px] font-mono text-[#A1A1AA] light:text-[#6B7280] flex items-center justify-between">
                <span>FPGA DMA → KALMAN EKF</span>
                <span className="text-[#FFFFFF] light:text-[#111827] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#60F1AD]" />
                  <span>SYNC LOCKED</span>
                </span>
              </div>
            </motion.div>

            {/* Panel B: Analytics & Link Quality Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-2xl bg-[#18181B] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-200 shadow-card p-4 sm:p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#27272A] light:border-gray-300 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#FFFFFF] light:text-[#111827] font-bold">
                    <Activity className="w-3.5 h-3.5 text-[#60F1AD]" />
                    <span className="uppercase tracking-wider">NETWORK ANALYTICS</span>
                  </div>
                  <span className="text-[#60F1AD] light:text-[#059669] text-[11px] font-bold">QOS: OPTIMAL</span>
                </div>

                {/* 2x2 Telemetry Matrix */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                    <div className="text-[10px] font-mono text-[#A1A1AA] light:text-[#4B5563]">END-TO-END LATENCY</div>
                    <div className="text-base font-bold text-[#FFFFFF] light:text-[#111827] mt-1">&lt; 1.8 ms</div>
                    <div className="text-[10px] font-mono text-[#4ADEDE] light:text-[#0284C7] mt-0.5">Deterministic FPGA</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                    <div className="text-[10px] font-mono text-[#A1A1AA] light:text-[#4B5563]">FRAME INTEGRITY</div>
                    <div className="text-base font-bold text-[#60F1AD] light:text-[#059669] mt-1">99.98%</div>
                    <div className="text-[10px] font-mono text-[#60F1AD] light:text-[#059669] mt-0.5">CRC-32 Hardware</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                    <div className="text-[10px] font-mono text-[#A1A1AA] light:text-[#4B5563]">RF BANDWIDTH</div>
                    <div className="text-base font-bold text-[#FFFFFF] light:text-[#111827] mt-1">48.2 Mbps</div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] light:text-[#6B7280] mt-0.5">Full Duplex Mesh</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#030712] light:bg-white border border-[#27272A] light:border-gray-200">
                    <div className="text-[10px] font-mono text-[#A1A1AA] light:text-[#4B5563]">PACKET ROUTE HOPS</div>
                    <div className="text-base font-bold text-[#FFFFFF] light:text-[#111827] mt-1">1 Hop Swarm</div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] light:text-[#6B7280] mt-0.5">Ad-Hoc Relaying</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar / Frequency modulation indicator */}
              <div className="mt-3 pt-2.5 border-t border-[#27272A] light:border-gray-300">
                <div className="flex justify-between text-[11px] font-mono text-[#A1A1AA] light:text-[#4B5563] mb-1">
                  <span>SPECTRUM OCCUPANCY</span>
                  <span className="text-[#4ADEDE] light:text-[#0284C7] font-bold">32.4% UTILIZED</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#27272A] light:bg-gray-200 overflow-hidden">
                  <div className="w-[32.4%] h-full rounded-full bg-[#4ADEDE]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Bottom Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#18181B] light:bg-[#F3F4F6] border border-[#27272A] light:border-gray-200">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4ADEDE] text-[#030712] font-bold font-mono text-sm hover:bg-[#60F1AD] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#4ADEDE]/20 cursor-pointer"
            >
              <span>Explore Telemetry Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="text-[#A1A1AA] light:text-[#4B5563] hover:text-[#4ADEDE] light:hover:text-[#0284C7] text-sm font-mono transition-colors cursor-pointer"
            >
              View Wireless &amp; Embedded Skills →
            </button>
          </div>

          <div className="text-xs font-mono text-[#A1A1AA] light:text-[#4B5563]">
            // AERONET VISUALIZATION DASHBOARD // PROTOCOL SPEC V2.4
          </div>
        </div>
      </div>
    </section>
  );
};
