import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Network,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';
import { certifications, type CertificationItem } from '../data/portfolio';

export const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative py-20 sm:py-24 lg:py-28 border-t border-[#27272A] light:border-[#E5E7EB] bg-[#030712] light:bg-white text-[#FFFFFF] light:text-[#111827] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#4ADEDE] light:text-[#EA580C] tracking-wider uppercase font-bold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60F1AD] light:bg-[#FDBA74] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60F1AD] light:bg-[#FDBA74]" />
            </span>
            <span>// 05 — VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFFFF] light:text-[#111827] font-sans tracking-tight">
            Industry Certifications &amp; Accreditations
          </h2>
          <p className="text-[#A1A1AA] light:text-[#4B5563] text-sm sm:text-base leading-relaxed">
            Publicly verifiable credentials from Cisco Networking Academy, Stanford Online, and DeepLearning.AI validating computer networking infrastructure, supervised learning mathematics, and deep reinforcement learning.
          </p>
        </div>

        {/* Certifications Grid - 1 col on mobile, 2 cols on tablet/iPad, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {certifications.map((cert: CertificationItem, index: number) => {
            const isCisco = cert.id === 'cisco-networking';
            const isSupervised = cert.id === 'deeplearning-supervised-ml';

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] hover:border-[#4ADEDE] light:hover:border-[#EA580C] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between text-[#FFFFFF] light:text-white"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon / Badge Image + Verification Status */}
                  <div className="flex items-start justify-between gap-4">
                    {cert.badgeImage ? (
                      <div className="relative p-1 rounded-xl bg-[#030712] light:bg-[#0E1013] border border-[#27272A] light:border-[#2E353F] w-14 h-14 shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
                        <img
                          src={cert.badgeImage}
                          alt={`${cert.title} badge`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div
                        className="p-3 rounded-xl bg-[#030712] light:bg-[#0E1013] border border-[#27272A] light:border-[#2E353F] shrink-0"
                        style={{ color: cert.badgeAccent }}
                      >
                        {isSupervised ? (
                          <BrainCircuit className="w-6 h-6" />
                        ) : isCisco ? (
                          <Network className="w-6 h-6" />
                        ) : (
                          <Sparkles className="w-6 h-6" />
                        )}
                      </div>
                    )}

                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#030712] light:bg-[#0E1013] text-[#60F1AD] light:text-[#FDBA74] border border-[#27272A] light:border-[#2E353F] font-bold shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-[#60F1AD] light:text-[#FDBA74]" />
                        <span>VERIFIED</span>
                      </span>

                      {cert.credentialId && (
                        <span className="text-[10px] font-mono text-[#A1A1AA] light:text-gray-400">
                          ID: {cert.credentialId.slice(0, 12)}...
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] light:text-white font-sans tracking-tight group-hover:text-[#4ADEDE] light:group-hover:text-[#EA580C] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono">
                      <span className="font-semibold text-[#4ADEDE] light:text-[#EA580C]">
                        {cert.issuer}
                      </span>
                      {cert.partner && (
                        <>
                          <span className="text-[#27272A] light:text-gray-500">•</span>
                          <span className="text-[#A1A1AA] light:text-gray-400">
                            {cert.partner}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#A1A1AA] light:text-gray-300 leading-relaxed font-sans">
                    {cert.description}
                  </p>

                  {/* Skills Pills */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#030712] light:bg-[#0E1013] text-[#A1A1AA] light:text-gray-300 border border-[#27272A] light:border-[#2E353F]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-[#27272A] light:border-[#2E353F] flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[#60F1AD] light:text-[#FDBA74] font-semibold text-[11px] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed &amp; Validated</span>
                  </span>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4ADEDE] light:bg-[#EA580C] text-[#030712] light:text-white font-mono text-xs font-bold hover:bg-[#60F1AD] light:hover:bg-[#C2410C] shadow-md shadow-[#4ADEDE]/20 light:shadow-[#EA580C]/20 transition-all duration-200 hover:-translate-y-0.5"
                    title={`Verify ${cert.title} on official issuer portal`}
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Verified Issuer Trust Badge */}
        <div className="mt-10 p-4 rounded-xl bg-[#18181B] light:bg-[#191C21] border border-[#27272A] light:border-[#374151] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA] light:text-gray-300">
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#4ADEDE] light:text-[#EA580C]" />
            <span>Digital badges and certificate records are cryptographically verified via Credly and Coursera.</span>
          </div>
          <span className="text-[11px] text-[#60F1AD] light:text-[#FDBA74] font-bold">
            100% VERIFIED RECORDS
          </span>
        </div>
      </div>
    </section>
  );
};
