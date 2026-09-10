import { redirect } from 'next/navigation';

export default function DeprecatedGdprPage() {
  redirect('/privacy');
}
