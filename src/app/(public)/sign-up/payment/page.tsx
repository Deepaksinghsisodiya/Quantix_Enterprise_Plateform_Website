// src/app/(public)/sign-up/payment/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CreditCard, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useProcessPaymentMutation } from '@/features/Register/Service/RegisterService';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const merchantId = searchParams.get('id') || '';

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [processPayment, { isLoading: isPaying }] = useProcessPaymentMutation();

  useEffect(() => {
    if (!merchantId) {
      toast.error('Invalid onboarding session.');
    }
  }, [merchantId]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantId) {
      toast.error('No onboarding ID found. Please try again.');
      return;
    }
    if (cardNumber.length < 16 || expiry.length < 4 || cvc.length < 3) {
      toast.error('Please enter valid payment details.');
      return;
    }

    try {
      // Simulate Stripe/payment provider token generation and pass to server
      const paymentToken = `tok_simulated_${Date.now()}`;
      await processPayment({ merchantId, paymentToken }).unwrap();
      
      toast.success('Payment successfully processed! Setting up subscription...');
      router.push(`/sign-up/activate?id=${merchantId}`);
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || 'Payment failed. Please try a different card.';
      toast.error(msg);
    }
  };

  return (
    <div className="site-container max-w-md mx-auto py-24 min-h-[70vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-8 sm:p-10 backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        
        <div className="text-center space-y-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-500 dark:text-blue-400">
            <CreditCard size={22} />
          </div>
          <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Checkout setup
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Enter card details to verify subscription setup. Your card will only be billed on your next billing cycle.
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
              Card Number
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="4111 2222 3333 4444"
              className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
                Expiry Date
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value.replace(/\D/g, ''))}
                placeholder="MM/YY"
                className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
                Security Code (CVC)
              </label>
              <input
                type="password"
                required
                maxLength={3}
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPaying}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 mt-6 py-3.5 text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPaying ? 'Processing...' : 'Authorize Setup'}
            <ArrowRight size={13} className="stroke-[3]" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-lg py-2">
          <ShieldCheck size={14} className="stroke-[2.5]" /> Secure 256-Bit SSL Checkout Encryption
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentCheckoutPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-20 bg-white dark:bg-slate-950 min-h-screen flex items-center text-slate-900 dark:text-white transition-colors duration-300">
        <Suspense fallback={
          <div className="site-container text-center py-24 text-slate-400">Loading checkout session...</div>
        }>
          <PaymentContent />
        </Suspense>
      </main>
      <Footer />
    </PublicLayout>
  );
}
