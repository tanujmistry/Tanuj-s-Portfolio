import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Activity,
  Shield,
  Zap,
  Radio,
  Server,
} from 'lucide-react';
import { EarthGlobeCanvas, type GlobeNode } from '../components/EarthGlobeCanvas';

export const AetherNodeSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GlobeNode>({
    id: 'node_in',
    name: 'AETHER_NODE_IN01',
    city: 'Aurangabad / Mumbai',
    region: 'IND-WEST',
    lat: 19.87,
    lon: 75.34,
    status: 'active',
    latency: '2.4ms',
    load: '42%',
    throughput: '8.4 Gbps',
    peers: 14,
  });

  const [activeTab, setActiveTab] = useState<'matrix' | 'security' | 'telemetry'>('matrix');
  const [capacity, setCapacity] = useState<number>(78);
  const [activeRelaysCount] = useState<number>(142);

  // Periodic subtle capacity fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setCapacity(76 + Math.floor(Math.random() * 5));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Event stream data
  const [events, setEvents] = useState<Array<{ id: number; time: string; tag: string; text: string }>>([
    { id: 1, time: '14:48:02', tag: 'SYNC', text: 'IN01 terrestrial node synchronized with Singapore SEA01 (8.4 Gbps)' },
    { id: 2, time: '14:48:19', tag: 'SECURITY', text: 'AES-256-GCM quantum-resistant session keys rotated successfully' },
    { id: 3, time: '14:48:34', tag: 'ROUTING', text: 'LEO satellite relay re-routed via Tokyo AP01 to bypass solar attenuation' },
    { id: 4, time: '14:48:51', tag: 'PACKET', text: 'CRC-32 hardware frame checksum verified: zero-drop transmission' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const tags = ['TELEMETRY', 'SYNC', 'SECURITY', 'ROUTING'];
      const messages = [
        'Terrestrial node beacon pulse verified across Frankfurt EU01',
        'Sub-GHz telemetry stream locked with zero packet jitter',
        'Multi-hop mesh path updated: latency dropped by 1.8ms',
        'Distributed ledger state hash confirmed by 14 validator peers',
      ];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];

      setEvents((prev) => [
        { id: Date.now(), time: timeStr, tag: randomTag, text: randomMsg },
        ...prev.slice(0, 3),
      ]);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="aether-node"
      className="relative py-20 sm:py-24 border-t border-[#27272A] light:border-[#E5E7EB] bg-[#000000] light:bg-[#050505] text-[#FFFFFF] overflow-hidden transition-colors duration-300"
    >
      {/* Ambient background glow in cyber teal */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#4ADEDE]/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#60F1AD]/[0.04] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#4ADEDE] tracking-wider uppercase font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60F1AD] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60F1AD]" />
              </span>
              <span>// 03.1 — AETHER NODE DASHBOARD</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FFFFFF] font-sans">
              Global Event Matrix
            </h2>

            <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-mono">
              Observe the decentralized mesh network in real-time. Nodes are synchronized across the terrestrial surface with sub-10ms telemetry and cryptographic validation.
            </p>
          </div>

          {/* Top Operational Quick Metric Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-[20px] bg-[#18181B] border border-[#27272A] font-mono text-xs flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-[#60F1AD] animate-pulse" />
              <div>
                <div className="text-[10px] text-[#A1A1AA]">ACTIVE RELAYS</div>
                <div className="text-white font-bold">{activeRelaysCount} Online</div>
              </div>
            </div>

            <div className="p-3 rounded-[20px] bg-[#18181B] border border-[#27272A] font-mono text-xs flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-[#4ADEDE]" />
              <div>
                <div className="text-[10px] text-[#A1A1AA]">DATA LINK THROUGHPUT</div>
                <div className="text-white font-bold">{capacity}% Capacity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Top Navigation Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 mb-8 rounded-[24px] bg-[#18181B] border border-[#27272A] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider flex items-center gap-2 px-3 py-1.5 rounded-[20px] bg-[#000000] border border-[#27272A]">
              <Server className="w-3.5 h-3.5 text-[#4ADEDE]" />
              Core.Directory
            </span>
            <span className="text-[#A1A1AA] hidden sm:inline">•</span>
            <span className="text-white font-medium px-2 py-1">Main Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-[#4ADEDE] text-[#000000] font-bold shadow-md shadow-[#4ADEDE]/20'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Earth Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#4ADEDE] text-[#000000] font-bold shadow-md shadow-[#4ADEDE]/20'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Security Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'bg-[#4ADEDE] text-[#000000] font-bold shadow-md shadow-[#4ADEDE]/20'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Telemetry Data
            </button>
          </div>
        </div>

        {/* Main Operational Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 Cols): 3D Rotating Earth Globe Focal Object */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 rounded-[24px] bg-[#121214] border border-[#27272A] p-6 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[480px]">
              {/* Top Header Row of the Globe Panel */}
              <div className="flex items-center justify-between pb-4 border-b border-[#27272A] font-mono text-xs z-10">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#4ADEDE]" />
                  <span className="font-bold text-white tracking-wider">
                    TERRESTRIAL NODE RECEPTOR
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#60F1AD]">
                  <span className="w-2 h-2 rounded-full bg-[#60F1AD] animate-ping" />
                  <span>SYNCHRONIZED (9/9)</span>
                </div>
              </div>

              {/* 3D Interactive Earth Canvas */}
              <div className="relative my-4 flex-1 flex items-center justify-center">
                <EarthGlobeCanvas
                  className="w-full h-[400px]"
                  selectedNodeId={selectedNode.id}
                  onSelectNode={(node) => setSelectedNode(node)}
                />
              </div>

              {/* Bottom Quick Status Strip */}
              <div className="pt-4 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A1A1AA] z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[#4ADEDE]">NODE:</span>
                  <span className="text-white font-bold">{selectedNode.name}</span>
                  <span className="text-gray-500">({selectedNode.city})</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span>LAT: {selectedNode.lat.toFixed(2)}°</span>
                  <span>LON: {selectedNode.lon.toFixed(2)}°</span>
                  <span className="text-[#60F1AD] font-bold">{selectedNode.latency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Telemetry, Security Matrix & Throughput */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* 1. Telemetry Data Panel */}
            <div className="rounded-[24px] bg-[#18181B] border border-[#27272A] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A] font-mono text-xs">
                <span className="font-bold text-[#4ADEDE] flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  TELEMETRY DATA
                </span>
                <span className="text-[11px] text-[#A1A1AA] font-mono">
                  {selectedNode.region}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-[20px] bg-[#000000] border border-[#27272A]">
                  <div className="text-[10px] text-[#A1A1AA]">NODE LATENCY</div>
                  <div className="text-lg font-bold text-[#60F1AD] mt-0.5">
                    {selectedNode.latency}
                  </div>
                </div>

                <div className="p-3 rounded-[20px] bg-[#000000] border border-[#27272A]">
                  <div className="text-[10px] text-[#A1A1AA]">THROUGHPUT</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {selectedNode.throughput}
                  </div>
                </div>

                <div className="p-3 rounded-[20px] bg-[#000000] border border-[#27272A]">
                  <div className="text-[10px] text-[#A1A1AA]">CORE LOAD</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {selectedNode.load}
                  </div>
                </div>

                <div className="p-3 rounded-[20px] bg-[#000000] border border-[#27272A]">
                  <div className="text-[10px] text-[#A1A1AA]">CONNECTED PEERS</div>
                  <div className="text-lg font-bold text-[#4ADEDE] mt-0.5">
                    {selectedNode.peers} Nodes
                  </div>
                </div>
              </div>

              {/* Real-time Throughput Capacity Bar (78%) */}
              <div className="p-3.5 rounded-[20px] bg-[#000000] border border-[#27272A] space-y-2 font-mono">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A1A1AA]">Total Mesh Capacity</span>
                  <span className="text-[#4ADEDE] font-bold">{capacity}% Operational</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#18181B] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#4ADEDE] to-[#60F1AD]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${capacity}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#A1A1AA]">
                  <span>0 Gbps</span>
                  <span>100 Gbps Nominal</span>
                </div>
              </div>
            </div>

            {/* 2. Security Matrix Panel */}
            <div className="rounded-[24px] bg-[#18181B] border border-[#27272A] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A] font-mono text-xs">
                <span className="font-bold text-[#60F1AD] flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  SECURITY MATRIX
                </span>
                <span className="text-[10px] text-[#60F1AD] px-2 py-0.5 rounded bg-[#000000] border border-[#27272A] font-bold">
                  ENCRYPTED
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-[16px] bg-[#000000] border border-[#27272A] flex items-center justify-between">
                  <span className="text-[#A1A1AA]">Cipher Suite</span>
                  <span className="text-white font-bold">ChaCha20-Poly1305</span>
                </div>
                <div className="p-2.5 rounded-[16px] bg-[#000000] border border-[#27272A] flex items-center justify-between">
                  <span className="text-[#A1A1AA]">Handshake Protocol</span>
                  <span className="text-[#4ADEDE] font-bold">Noise_XX_25519</span>
                </div>
                <div className="p-2.5 rounded-[16px] bg-[#000000] border border-[#27272A] flex items-center justify-between">
                  <span className="text-[#A1A1AA]">Hardware Root of Trust</span>
                  <span className="text-[#60F1AD] font-bold">FPGA eFuse HMAC</span>
                </div>
              </div>
            </div>

            {/* 3. Global Event Stream Log */}
            <div className="rounded-[24px] bg-[#18181B] border border-[#27272A] p-5 shadow-xl font-mono text-xs space-y-2.5">
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider font-bold mb-1">
                // GLOBAL EVENT LOG (LIVE STREAM)
              </div>
              <div className="space-y-2">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2 rounded-[14px] bg-[#000000] border border-[#27272A] flex items-start gap-2 text-[11px]"
                  >
                    <span className="text-[#A1A1AA] shrink-0">{ev.time}</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#18181B] text-[#4ADEDE] font-bold text-[9px] shrink-0">
                      {ev.tag}
                    </span>
                    <span className="text-gray-300 truncate">{ev.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
