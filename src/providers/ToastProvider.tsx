import React, { ReactNode } from 'react';
import { Toaster, toast } from 'sonner';

interface ToastProviderProps {
  children: ReactNode;
}

// Custom styling to match Quantix brand (primary color #2563EB)
const toastTheme = {
  toast: 'bg-white dark:bg-gray-800 border border-primary text-primary',
  description: 'text-gray-700 dark:text-gray-200',
  actionButton: 'text-primary hover:underline',
  cancelButton: 'text-gray-500 hover:underline',
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        richColors
        closeButton
        position="top-center"
        toastOptions={toastTheme as any}
      />
    </>
  );
};
