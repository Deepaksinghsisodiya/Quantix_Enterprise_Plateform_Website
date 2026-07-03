// src/app/(public)/sign-up/payment/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useProcessPaymentMutation } from '@/features/Register/Service/RegisterService';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const merchantId = searchParams.get('id') || searchParams.get('merchantId') || '';

  const [paymentToken, setPaymentToken] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('TokenizedCard');
  const [amount, setAmount] = useState('');
  const [currencyCode, setCurrencyCode] = useState('USD');
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
    if (paymentToken.trim().length < 8) {
      toast.error('Please enter a valid token from your payment provider.');
      return;
    }

    try {
      await processPayment({
        merchantId,
        paymentToken: paymentToken.trim(),
        paymentMethod,
        amount: amount ? Number(amount) : null,
        currencyCode,
      }).unwrap();
      
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
            Submit a token from your payment provider to verify subscription setup.
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">Payment Token</label>
            <input
              type="text"
              required
              value={paymentToken}
              onChange={(e) => setPaymentToken(e.target.value)}
              placeholder="tok_live_or_provider_reference"
              className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="TokenizedCard">Tokenized card</option>
                <option value="UPI">UPI</option>
                <option value="BankTransfer">Bank transfer</option>
                <option value="Wallet">Wallet</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
                Currency
              </label>
              <select
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="AED">AED</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">Authorized Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
          <ShieldCheck size={14} className="stroke-[2.5]" /> Tokenized payment capture only
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
