'use client';

import React, { createContext, useContext, useState } from 'react';
import { ContactSalesModal } from '@/components/organisms/ContactModal/ContactSalesModal';
import { ChangePasswordModal } from '@/features/Profile/components/ChangePasswordModal';

interface ContactModalContextType {
  isModalOpen: boolean;
  openModal: (title?: string, buttonText?: string) => void;
  closeModal: () => void;
  isPasswordModalOpen: boolean;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  isPasswordModalOpen: false,
  openPasswordModal: () => {},
  closePasswordModal: () => {},
});

export const ContactModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
  const [modalButtonText, setModalButtonText] = useState<string | undefined>(undefined);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openModal = (title?: string, buttonText?: string) => {
    if (title) setModalTitle(title);
    if (buttonText) setModalButtonText(buttonText);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <ContactModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        isPasswordModalOpen,
        openPasswordModal,
        closePasswordModal,
      }}
    >
      {children}
      <ContactSalesModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        buttonText={modalButtonText}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
      />
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => useContext(ContactModalContext);
