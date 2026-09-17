// src/app/(public)/dashboard/page.tsx
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const adminPortalLoginUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'https://quantixadmin.foreteksolution.in/login';
  redirect(adminPortalLoginUrl);
}
