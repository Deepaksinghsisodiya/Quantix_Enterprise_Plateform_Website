'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  MessageSquare,
  MonitorCheck,
  Users,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import { SUPPORT_CHANNELS } from '../Constants/support.constants';

const CHANNEL_ICONS: Record<string, React.FC<{ className?: string }>> = {
  PhoneCall,
  MessageSquare,
  MonitorCheck,
  Users,
};

export const SupportChannelsGrid: React.FC = () => {
  const { openModal } = useContactModal();

  return (
    <div className="flex flex-col space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SUPPORT_CHANNELS.map((channel, idx) => {
          const IconComponent = CHANNEL_ICONS[channel.iconName] || PhoneCall;
          return (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-2xs hover:shadow-lg hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon + Badge + SLA Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: channel.highlightColor }}
                  >
                    <IconComponent className="h-4 w-4 stroke-[2.4]" />
                  </div>
                  <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {channel.slaTag}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-syne text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-[#FF4F00] transition-colors leading-snug">
                  {channel.title}
                </h4>

                {/* Description */}
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                  {channel.description}
                </p>

                {/* Micro Features Checkmarks */}
                <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {channel.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                      <div className="h-3.5 w-3.5 rounded-full bg-orange-500/10 text-[#FF4F00] flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action CTA Ribbon */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/[0.06] via-white dark:via-slate-900 to-orange-500/[0.06] shadow-sm">
        <div className="text-center sm:text-left">
          <div className="font-syne text-xs sm:text-sm font-bold text-slate-950 dark:text-white">
            Need Custom Enterprise Onboarding & SLA Agreement?
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Speak directly with our Enterprise Solutions Director.
          </div>
        </div>

        <button
          onClick={() =>
            openModal(
              '24/7 Enterprise Dedicated Technical Support',
              'SUPPORT_SECTION_ENTERPRISE'
            )
          }
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] text-white font-syne text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <span>Connect with Support Team</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SupportChannelsGrid;
