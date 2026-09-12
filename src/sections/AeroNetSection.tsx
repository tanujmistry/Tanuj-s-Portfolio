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
      className="relative py-20 sm:py-24 bg-[#FFFFFF] text-[#E5E7EB] overflow-hidden"
      style={{ paddingLeft: '24px', paddingRight: '24px' }}
    >
      {/* Deep space ambient glow backdrop */}
      <div className="absolute inset-0 bg-[#000000] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#A69DB9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#9CA3AF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Full-Bleed Flex Frame Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Display-lg Inter 60px with 6px rhythm */}
        <div className="flex flex-col gap-3 mb-10 max-w-3xl">
          {/* Beacon badge with 2000ms pulse */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-[12px] shadow-[0_0_15px_0_rgba(255,255,255,0.15)] text-[12px] font-light text-[#E5E7EB]">
              <span className="w-2 h-2 rounded-full bg-[#A69DB9] animate-pulse" style={{ animationDuration: '2000ms' }} />
              <span className="text-white font-normal">AeroNet Visualization</span>
              <span className="text-[#6B7280]">•</span>
              <span className="text-[#A69DB9] font-normal">Mesh Telemetry v2.4</span>
            </div>
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-[60px] font-normal tracking-[-0.025em] font-sans text-[#E5E7EB]"
            style={{ lineHeight: '1.05' }}
          >
            Aeronautical Telemetry &amp; <span className="text-white font-medium">Interface Hierarchy</span>
          </h2>

          <p className="text-[12px] font-light leading-[16px] text-[#9CA3AF] font-sans max-w-2xl">
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
            className="lg:col-span-8 rounded-[16px] bg-black/85 backdrop-blur-[12px] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_2px_4px_0_rgba(0,0,0,0.05),0_0_15px_0_rgba(255,255,255,0.15)] p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Tactical Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10 text-[12px] font-light">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#A69DB9]" />
                <span className="text-white font-normal uppercase tracking-wider text-[12px]">
                  RF TOPOLOGY STREAM
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A69DB9]/20 text-[#A69DB9] border border-[#A69DB9]/30">
                  LIVE 100Hz
                </span>
              </div>

              {/* Frequency Band Selector Chips (9999px rounded) */}
              <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-full border border-white/10">
                {['2.4 GHz FHSS', '915 MHz LoRa', '5.8 GHz Telemetry'].map((band) => (
                  <button
                    key={band}
                    type="button"
                    onClick={() => setSelectedFrequency(band)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-normal transition-all duration-150 ${
                      selectedFrequency === band
                        ? 'bg-white text-black font-medium shadow-sm'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Canvas Viewport (16px inner radius) */}
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-[16px] overflow-hidden border border-white/10 bg-[#000000]">
              <AeroNetCanvas
                className="w-full h-full"
                selectedNodeId={selectedNode.id}
                onSelectNode={(node) => setSelectedNode(node)}
                frequencyBand={selectedFrequency}
              />

              {/* Top-Right Quick Readout Pill */}
              <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-[12px] text-[11px] text-[#E5E7EB] pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="font-normal text-white">NODES ACTIVE:</span>
                <span className="text-[#A69DB9]">5/5 LOCKED</span>
              </div>
            </div>

            {/* Bottom Telemetry Target Readout Panel */}
            <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px] font-light">
              <div className="p-2 rounded-[16px] bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-[#9CA3AF]">LOCKED TARGET</div>
                <div className="text-white font-normal truncate mt-0.5">{selectedNode.name}</div>
              </div>
              <div className="p-2 rounded-[16px] bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-[#9CA3AF]">ALTITUDE / VELOCITY</div>
                <div className="text-white font-normal mt-0.5">{selectedNode.altitude || 'N/A'} • {selectedNode.velocity || '0 km/h'}</div>
              </div>
              <div className="p-2 rounded-[16px] bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-[#9CA3AF]">SIGNAL STRENGTH</div>
                <div className="text-[#A69DB9] font-normal mt-0.5">{selectedNode.rssi} (STABLE)</div>
              </div>
              <div className="p-2 rounded-[16px] bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-[#9CA3AF]">PACKET ROUTING</div>
                <div className="text-white font-normal mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
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
              className="rounded-[16px] bg-black/85 backdrop-blur-[12px] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_2px_4px_0_rgba(0,0,0,0.05),0_0_15px_0_rgba(255,255,255,0.15)] p-3 sm:p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-[12px] font-light">
                  <div className="flex items-center gap-1.5 text-white font-normal">
                    <Sliders className="w-3.5 h-3.5 text-[#A69DB9]" />
                    <span className="uppercase tracking-wider">PIPELINE HIERARCHY</span>
                  </div>
                  <span className="text-[#9CA3AF] text-[11px]">4 STAGES</span>
                </div>

                {/* Workflow Interactive Step Cards */}
                <div className="space-y-1.5">
                  {workflowSteps.map((step) => {
                    const isActive = activeWorkflowStep === step.id;
                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveWorkflowStep(step.id)}
                        className={`p-2.5 rounded-[16px] border transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-white/10 border-white text-white'
                            : 'bg-white/[0.02] border-white/5 text-[#9CA3AF] hover:border-white/20 hover:text-[#E5E7EB]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className={`font-normal ${isActive ? 'text-[#A69DB9]' : 'text-[#6B7280]'}`}>
                            {step.category}
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full bg-white/5 text-[10px] text-white">
                            {step.metric}
                          </span>
                        </div>
                        <div className="text-[13px] font-medium text-white mb-0.5">
                          {step.title}
                        </div>
                        <p className="text-[11px] font-light leading-[15px] text-[#9CA3AF]">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] font-light text-[#6B7280] flex items-center justify-between">
                <span>FPGA DMA → KALMAN EKF</span>
                <span className="text-white font-normal flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#A69DB9]" />
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
              className="rounded-[16px] bg-black/85 backdrop-blur-[12px] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_2px_4px_0_rgba(0,0,0,0.05),0_0_15px_0_rgba(255,255,255,0.15)] p-3 sm:p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-[12px] font-light">
                  <div className="flex items-center gap-1.5 text-white font-normal">
                    <Activity className="w-3.5 h-3.5 text-[#A69DB9]" />
                    <span className="uppercase tracking-wider">NETWORK ANALYTICS</span>
                  </div>
                  <span className="text-[#A69DB9] text-[11px] font-normal">QOS: OPTIMAL</span>
                </div>

                {/* 2x2 Telemetry Matrix */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-[16px] bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] text-[#9CA3AF]">END-TO-END LATENCY</div>
                    <div className="text-base font-normal text-white mt-1">&lt; 1.8 ms</div>
                    <div className="text-[10px] text-[#A69DB9] mt-0.5">Deterministic FPGA</div>
                  </div>

                  <div className="p-2.5 rounded-[16px] bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] text-[#9CA3AF]">FRAME INTEGRITY</div>
                    <div className="text-base font-normal text-white mt-1">99.98%</div>
                    <div className="text-[10px] text-[#A69DB9] mt-0.5">CRC-32 Hardware</div>
                  </div>

                  <div className="p-2.5 rounded-[16px] bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] text-[#9CA3AF]">RF BANDWIDTH</div>
                    <div className="text-base font-normal text-white mt-1">48.2 Mbps</div>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">Full Duplex Mesh</div>
                  </div>

                  <div className="p-2.5 rounded-[16px] bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] text-[#9CA3AF]">PACKET ROUTE HOPS</div>
                    <div className="text-base font-normal text-white mt-1">1 Hop Swarm</div>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">Ad-Hoc Relaying</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar / Frequency modulation indicator */}
              <div className="mt-3 pt-2.5 border-t border-white/10">
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mb-1">
                  <span>SPECTRUM OCCUPANCY</span>
                  <span className="text-white font-normal">32.4% UTILIZED</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[32.4%] h-full rounded-full bg-[#A69DB9]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Bottom Controls matching detected button specifications */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-3 sm:p-4 rounded-[16px] bg-black/85 backdrop-blur-[12px] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_15px_0_rgba(255,255,255,0.15)]">
          <div className="flex flex-wrap items-center gap-3">
            {/* button-primary: background #FFFFFF, text #000000, radius 9999px, padding 8px */}
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] text-[#000000] text-[14px] font-normal leading-[20px] hover:bg-neutral-200 transition-all duration-150 shadow-sm cursor-pointer"
            >
              <span>Explore Telemetry Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* button-link: text #9CA3AF, radius 0px, padding 0px */}
            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="text-[#9CA3AF] hover:text-white text-[14px] font-normal leading-[20px] rounded-none p-0 transition-colors duration-150 cursor-pointer ml-1"
            >
              View Wireless &amp; Embedded Skills →
            </button>
          </div>

          <div className="text-[12px] font-light text-[#6B7280]">
            // AERONET VISUALIZATION DASHBOARD // PROTOCOL SPEC V2.4
          </div>
        </div>
      </div>
    </section>
  );
};
