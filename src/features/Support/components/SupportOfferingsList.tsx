'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  PhoneCall,
  GraduationCap,
  Cpu,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import { SUPPORT_PILLARS } from '../Constants/support.constants';

const PILLAR_ICONS: Record<string, React.FC<{ className?: string }>> = {
  UserCheck,
  PhoneCall,
  GraduationCap,
  Cpu,
};

export const SupportOfferingsList: React.FC = () => {
  const { openModal } = useContactModal();

  return (
    <div className="flex flex-col space-y-4">
      {SUPPORT_PILLARS.map((pillar, idx) => {
        const IconComponent = PILLAR_ICONS[pillar.iconName] || UserCheck;
        return (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="group p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-2xs hover:shadow-md hover:border-orange-500/40 transition-all duration-200"
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              {/* Icon Box */}
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-[#FF4F00] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <IconComponent className="h-5 w-5 stroke-[2.2]" />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-syne text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-[#FF4F00] transition-colors">
                    {pillar.title}
                  </h3>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-[#FF4F00] border border-orange-500/20 shrink-0">
                    {pillar.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mb-2.5">
                  {pillar.description}
                </p>

                {/* Sub-points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {pillar.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <div className="h-3.5 w-3.5 rounded-full bg-orange-500/10 text-[#FF4F00] flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span className="truncate">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* CTA Button (Original Action) */}
      <div className="pt-2">
        <button
          onClick={() =>
            openModal(
              '24/7 Enterprise Dedicated Technical Support',
              'SUPPORT_SECTION_ENTERPRISE'
            )
          }
          className="inline-flex items-center gap-3 rounded-full border border-orange-500/80 hover:border-[#FF4F00] bg-white dark:bg-slate-900 px-6 py-3 text-xs sm:text-sm font-extrabold text-[#FF4F00] hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 group"
        >
          <span>Learn more & speak with an onboarding manager</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF4F00] text-white shadow-2xs group-hover:translate-x-1 transition-transform">
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SupportOfferingsList;
