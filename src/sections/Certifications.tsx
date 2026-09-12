import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import { certifications, type CertificationItem } from '../data/portfolio';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-20 sm:py-24 lg:py-28 border-t border-[#D4D4D4] bg-white text-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#050505] tracking-wider uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            <span>// 05 — CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] font-sans tracking-tight">
            Verified Credentials
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
            Professional specializations from Stanford University, DeepLearning.AI, and Google covering deep neural networks and machine learning architectures.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert: CertificationItem, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-white border border-[#D4D4D4] hover:border-[#050505] hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between shadow-sm text-[#111827]"
            >
              <div className="space-y-4">
                {/* Header Icon & Issuer */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#F4F4F5] border border-[#D4D4D4] text-[#050505]">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#F4F4F5] text-[#050505] border border-[#D4D4D4] font-bold">
                    VERIFIED
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-[#111827] font-sans tracking-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-[#050505] font-semibold mt-1">
                    {cert.issuer}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-sans">
                  {cert.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#D4D4D4] flex items-center justify-between text-xs font-mono text-[#6B7280]">
                <span className="flex items-center gap-1.5 text-[#050505] font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Curriculum Completed</span>
                </span>
                <span className="text-[#6B7280] text-[10px]">
                  // 0{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
