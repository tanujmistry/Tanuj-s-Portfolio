import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import { certifications, type CertificationItem } from '../data/portfolio';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-24 border-t border-navy-700/50 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-circuit-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-circuit-teal tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-circuit-teal" />
            <span>// 05 — CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Verified Credentials
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
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
              className="group relative rounded-xl bg-navy-800/80 border border-navy-700/70 hover:border-circuit-teal/50 hover:shadow-glow-subtle hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between backdrop-blur-sm shadow-card"
            >
              <div className="space-y-4">
                {/* Header Icon & Issuer */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-navy-900 border border-navy-700 text-circuit-teal group-hover:border-circuit-teal/40 transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-navy-900 text-circuit-cyan border border-navy-700">
                    VERIFIED
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-white font-sans tracking-tight group-hover:text-circuit-teal transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-circuit-teal mt-1">
                    {cert.issuer}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {cert.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-navy-700/50 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-circuit-green text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Curriculum Completed</span>
                </span>
                <span className="text-slate-400 text-[10px]">
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
