import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ArrowUpRight,
  Maximize2,
  X,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  hardwarePrototypes,
  GOOGLE_PHOTOS_PROJECTS_URL,
  type HardwarePrototypeItem,
} from '../data/portfolio';

export const HardwareGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Record<string, 'live' | 'schematic'>>({
    'smart-energy-meter-bench': 'live',
    'alcohol-interlock-bench': 'live',
    'thingspeak-iot-bench': 'live',
    'sensor-test-rig': 'live',
  });

  const [activeLightbox, setActiveLightbox] = useState<{
    image: string;
    title: string;
    category: string;
    description: string;
  } | null>(null);

  const toggleTab = (id: string, mode: 'live' | 'schematic') => {
    setActiveTab((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <div className="mt-16 sm:mt-20 pt-16 border-t border-[#27272A] light:border-gray-200">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#4ADEDE] light:text-[#EA580C] tracking-wider uppercase font-bold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60F1AD] light:bg-[#EA580C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60F1AD] light:bg-[#EA580C]" />
            </span>
            <span>// PHYSICAL LAB PROTOTYPES &amp; VERIFICATION</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white light:text-[#111827] font-sans tracking-tight">
            Benchtop Hardware &amp; Live Schematics
          </h3>
          <p className="text-[#A1A1AA] light:text-[#4B5563] text-sm leading-relaxed">
            Photographic proof, active serial telemetry monitors, and circuit schematics documenting physical hardware test benches built and tested by Tanuj.
          </p>
        </div>

        {/* Global Google Photos Quick Link */}
        <div className="shrink-0">
          <a
            href={GOOGLE_PHOTOS_PROJECTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#18181B] light:bg-[#191C21] hover:bg-[#27272A] light:hover:bg-[#272a30] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] text-white font-mono text-xs font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <Camera className="w-4 h-4 text-[#4ADEDE] light:text-[#EA580C]" />
            <span>Open Google Photos Album (13+ Assets)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4ADEDE] light:text-[#EA580C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Featured Primary Spotlight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl bg-gradient-to-r from-[#18181B] via-[#0E1013] to-[#18181B] light:from-[#191C21] light:via-[#111317] light:to-[#191C21] border border-[#4ADEDE]/30 light:border-[#EA580C]/40 p-6 sm:p-8 shadow-2xl mb-10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#4ADEDE]/[0.08] light:bg-[#EA580C]/[0.06] rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                VERIFIED HARDWARE ARCHIVE
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#030712] text-[#60F1AD] light:text-[#FDBA74] border border-[#27272A]">
                June 2024 – Nov 2025
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-[#030712] text-[#A1A1AA] border border-[#27272A]">
                <ShieldCheck className="w-3 h-3 text-[#60F1AD]" />
                Hands-On Lab Proven
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
              Projects Implementation Media Gallery
            </h4>

            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Explore high-resolution bench captures, real-time LCD/OLED sensor readouts, aerosol safety triggers, wiring schematics, and live video demonstrations hosted on Google Photos.
            </p>

            {/* Subsystem Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono text-gray-300">
              <span className="px-2.5 py-1 rounded bg-[#030712] border border-[#27272A] flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#4ADEDE]" />
                230V AC Smart Power Metering
              </span>
              <span className="px-2.5 py-1 rounded bg-[#030712] border border-[#27272A] flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-[#60F1AD]" />
                MQ-3 Breathalyzer Engine Interlock
              </span>
              <span className="px-2.5 py-1 rounded bg-[#030712] border border-[#27272A] flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#4ADEDE]" />
                ThingSpeak IoT Cloud Telemetry
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto">
            <a
              href={GOOGLE_PHOTOS_PROJECTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-mono text-xs font-bold hover:bg-[#60F1AD] light:hover:bg-[#C2410C] shadow-lg shadow-[#4ADEDE]/25 light:shadow-[#EA580C]/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Google Photos Album</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-[11px] font-mono text-[#A1A1AA] text-center lg:text-right">
              Direct access • 13+ Photos &amp; Video Demos
            </span>
          </div>
        </div>
      </motion.div>

      {/* 4-Item Prototype Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hardwarePrototypes.map((item: HardwarePrototypeItem, index: number) => {
          const mode = activeTab[item.id] || 'live';
          const currentImage =
            mode === 'schematic' && item.schematicImage ? item.schematicImage : item.primaryImage;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between shadow-card text-white"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] bg-[#030712] text-[#4ADEDE] light:text-[#EA580C] border border-[#27272A] font-semibold">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-[#A1A1AA] font-mono">
                    {item.category}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white font-sans tracking-tight mb-2 group-hover:text-[#4ADEDE] light:group-hover:text-[#EA580C] transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Tab Switcher: Live Capture vs Schematic */}
                {item.schematicImage && (
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#030712] border border-[#27272A] w-fit mb-3 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => toggleTab(item.id, 'live')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        mode === 'live'
                          ? 'bg-[#18181B] text-[#4ADEDE] light:text-[#EA580C] font-bold shadow-sm'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      📸 Live Bench
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleTab(item.id, 'schematic')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        mode === 'schematic'
                          ? 'bg-[#18181B] text-[#60F1AD] light:text-[#FDBA74] font-bold shadow-sm'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      📐 Circuit Schematic
                    </button>
                  </div>
                )}

                {/* Visual Image Display with Zoom Trigger */}
                <div className="relative rounded-xl overflow-hidden border border-[#27272A] bg-[#0A0E17] aspect-video group/img cursor-pointer">
                  <img
                    src={currentImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    onClick={() =>
                      setActiveLightbox({
                        image: currentImage,
                        title: item.title,
                        category: item.category,
                        description: item.description,
                      })
                    }
                  />

                  {/* Image overlay badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                      {mode === 'schematic' ? 'Wiring Blueprint' : 'Physical Hardware'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLightbox({
                          image: currentImage,
                          title: item.title,
                          category: item.category,
                          description: item.description,
                        });
                      }}
                      className="p-1.5 rounded-lg bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-mono text-xs font-bold hover:scale-110 transition-transform cursor-pointer shadow-md"
                      title="Enlarge preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Key Components Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {item.components.map((comp) => (
                    <span
                      key={comp}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#030712] text-gray-300 border border-[#27272A]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 mt-4 border-t border-[#27272A] flex items-center justify-between">
                <a
                  href={GOOGLE_PHOTOS_PROJECTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4ADEDE] light:text-[#EA580C] hover:text-[#60F1AD] light:hover:text-[#FDBA74] transition-colors"
                >
                  <span>View in Google Photos</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[10px] font-mono text-[#60F1AD] light:text-[#FDBA74] font-semibold">
                  {item.metrics}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightbox(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#18181B] border border-[#27272A] rounded-2xl p-6 shadow-2xl z-10 text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#27272A] mb-4">
                <div>
                  <span className="text-xs font-mono text-[#4ADEDE] font-semibold block">
                    {activeLightbox.category}
                  </span>
                  <h3 className="text-xl font-bold">{activeLightbox.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#27272A] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#27272A] bg-black mb-4">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  className="w-full max-h-[60vh] object-contain mx-auto"
                  decoding="async"
                />
              </div>

              <p className="text-sm text-gray-300 mb-5 leading-relaxed">
                {activeLightbox.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#27272A]">
                <a
                  href={GOOGLE_PHOTOS_PROJECTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-mono text-xs font-bold hover:bg-[#60F1AD] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Full Resolution Album in Google Photos</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="px-4 py-2 rounded-lg bg-[#030712] border border-[#27272A] text-xs font-mono text-gray-300 hover:text-white cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
