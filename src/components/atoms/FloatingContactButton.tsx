'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Headset } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export const FloatingContactButton: React.FC = () => {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  if (pathname === '/contact' || pathname?.startsWith('/contact')) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-3.5 left-3.5 right-3.5 z-40 flex justify-center md:hidden pointer-events-none select-none"
    >
      <button
        type="button"
        onClick={() => openModal()}
        className="pointer-events-auto w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-syne font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-2xl shadow-primary/40 border-none outline-none transition-all duration-200 active:scale-[0.98] cursor-pointer"
        aria-label="Contact Sales"
      >
        <span className="relative flex h-2 w-2 mr-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <Headset size={18} className="stroke-[2.5] text-white shrink-0" />
        <span>CONTACT SALES</span>
      </button>
    </motion.div>
  );
};

export default FloatingContactButton;
