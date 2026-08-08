'use client';

import React, { createContext, useContext, useState } from 'react';
import { ContactSalesModal } from '@/components/organisms/ContactModal/ContactSalesModal';

interface ContactModalContextType {
  isModalOpen: boolean;
  openModal: (title?: string, buttonText?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ContactModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
  const [modalButtonText, setModalButtonText] = useState<string | undefined>(undefined);

  const openModal = (title?: string, buttonText?: string) => {
    if (title) setModalTitle(title);
    if (buttonText) setModalButtonText(buttonText);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ContactModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <ContactSalesModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        buttonText={modalButtonText}
      />
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => useContext(ContactModalContext);
