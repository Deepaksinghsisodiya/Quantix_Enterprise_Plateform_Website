// src/features/Profile/components/ChangePasswordModal.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { ChangePasswordForm } from '../Form/ChangePasswordForm';

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-[365px] sm:max-w-[375px] bg-white dark:bg-slate-900 rounded-3xl p-3.5 sm:p-4 shadow-2xl border border-slate-200/80 dark:border-slate-800 z-10 my-auto"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-b-full opacity-90" />

            {/* Top-Right Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100/90 dark:bg-slate-800/90 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200/80 dark:border-slate-700 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={15} className="stroke-[2.5]" />
            </button>

            {/* Header Content */}
            <div className="text-center space-y-1 mb-2.5 pt-0.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-[8.5px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400">
                <Sparkles size={9} className="fill-red-500 text-red-500" />
                <span>SECURITY & PROFILE</span>
              </div>

              <h3 className="text-base sm:text-[17px] font-syne font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                Change Password
              </h3>

              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight max-w-[270px] mx-auto">
                Set a strong new password to keep your account safe.
              </p>
            </div>

            {/* Form Content */}
            <ChangePasswordForm onSuccess={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
