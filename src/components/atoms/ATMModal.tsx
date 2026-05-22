import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ATMModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen?: boolean;
}

export const ATMModal: React.FC<ATMModalProps> = ({ children, onClose, isOpen = true }) => {
  // Create a div for the portal if it doesn't exist
  const modalRoot = document.getElementById("modal-root") || (() => {
    const el = document.createElement("div");
    el.id = "modal-root";
    document.body.appendChild(el);
    return el;
  })();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg p-4" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
