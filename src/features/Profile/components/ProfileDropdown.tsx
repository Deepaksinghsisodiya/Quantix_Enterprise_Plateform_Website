// src/features/Profile/components/ProfileDropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery } from '../Service/ProfileService';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useContactModal } from '@/context/ContactModalContext';
import { ProfileAvatarTrigger } from './ProfileAvatarTrigger';
import { ProfileDropdownMenu } from './ProfileDropdownMenu';

export const ProfileDropdown: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const authUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { openModal } = useContactModal();

  const { data: liveProfile } = useGetProfileQuery(undefined, { skip: !token });

  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!token) return null;

  // Resolve user info from live API or auth storage with complete null-safety
  const rawAuthUser = (authUser || {}) as any;
  const rawProfile = (liveProfile || {}) as any;

  const displayEmail = rawProfile?.email || rawAuthUser?.email || '';

  // Format readable display name (prevent raw duplicate email as name)
  const resolveDisplayName = () => {
    const explicitName = rawProfile?.fullName || rawProfile?.name || rawAuthUser?.fullName || rawAuthUser?.name;
    if (explicitName && explicitName.trim() && explicitName.trim() !== displayEmail) {
      return explicitName.trim();
    }
    if (displayEmail && displayEmail.includes('@')) {
      const local = displayEmail.split('@')[0];
      const cleaned = local.replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim();
      if (cleaned.length >= 3) {
        return cleaned.replace(/\b\w/g, (c: string) => c.toUpperCase());
      }
      return local;
    }
    return 'Enterprise User';
  };

  const displayName = resolveDisplayName();
  const displayCompany = rawProfile?.companyName || rawAuthUser?.companyName || 'Quantix Enterprise';
  const avatarInitial = (displayName || displayEmail || 'Q').charAt(0).toUpperCase();

  const getAdminPortalUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:4173/login';
      }
    }
    return process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'https://quantixadmin.foreteksolution.in/';
  };

  const handleLogout = () => {
    try {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('authUser');
      if (typeof window !== 'undefined') {
        localStorage.setItem('quantix_has_logged_out', 'true');
      }
      dispatch(logout());
      setIsOpen(false);
      toast.success('Successfully logged out.');
      router.push('/');
    } catch {
      toast.error('Logout failed.');
    }
  };

  return (
    <>
      <div className="relative font-sans" ref={dropdownRef}>
        {/* Sleek Big-Company Avatar Trigger (Letter Avatar Only - No extra text in navbar) */}
        <ProfileAvatarTrigger
          avatarInitial={avatarInitial}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Dropdown Card */}
        {isOpen && (
          <ProfileDropdownMenu
            displayName={displayName}
            displayEmail={displayEmail}
            displayCompany={displayCompany}
            avatarInitial={avatarInitial}
            adminPortalUrl={getAdminPortalUrl()}
            onClose={() => setIsOpen(false)}
            onOpenChangePassword={() => setIsPasswordModalOpen(true)}
            onOpenSupport={() => openModal('Enterprise Priority Support', 'SUPPORT_REQUEST')}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default ProfileDropdown;
