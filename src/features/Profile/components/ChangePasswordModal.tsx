// src/features/Profile/components/ChangePasswordModal.tsx
'use client';

import React, { useEffect } from 'react';
import { X, KeyRound, ShieldCheck } from 'lucide-react';
import { ChangePasswordForm } from '../Form/ChangePasswordForm';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200 text-slate-900 dark:text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF4D00]/10 text-[#FF4D00]">
              <KeyRound size={18} />
            </div>
            <div>
              <h3 className="font-syne text-base font-bold leading-tight">Change Password</h3>
              <p className="text-[11px] text-slate-500 font-normal">Update your temporary admin password</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <ChangePasswordForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
