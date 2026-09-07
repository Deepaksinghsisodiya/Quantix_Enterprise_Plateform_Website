// src/features/Profile/components/ProfileAvatarTrigger.tsx
'use client';

import React from 'react';

interface ProfileAvatarTriggerProps {
  avatarInitial: string;
  isOpen: boolean;
  onClick: () => void;
}

export const ProfileAvatarTrigger: React.FC<ProfileAvatarTriggerProps> = ({
  avatarInitial,
  isOpen,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="User profile menu"
      aria-expanded={isOpen}
      className="relative flex items-center justify-center h-9 w-9 sm:h-9.5 sm:w-9.5 rounded-full bg-linear-to-tr from-[#FF4D00] via-[#FF621F] to-[#E03E00] text-white font-syne text-xs sm:text-sm font-black shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/50 border-2 border-slate-100 dark:border-slate-800 cursor-pointer"
    >
      <span className="uppercase">{avatarInitial}</span>
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
    </button>
  );
};

export default ProfileAvatarTrigger;
