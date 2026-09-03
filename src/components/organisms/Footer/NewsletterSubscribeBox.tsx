'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSubscribeNewsletterMutation } from '@/features/Contact/Service/ContactService';
import { parseApiError } from '@/lib/errorHandler';

interface NewsletterSubscribeBoxProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  className?: string;
}

export const NewsletterSubscribeBox: React.FC<NewsletterSubscribeBoxProps> = ({
  title = "Subscribe to Product Updates",
  subtitle = "Get weekly engineering insights, release notes, and industry benchmarks.",
  placeholder = "Enter work email...",
  className = "",
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      toast.error('Please enter a valid work email address.');
      return;
    }

    try {
      const res = await subscribeNewsletter({ email: cleanEmail }).unwrap();
      setIsSubscribed(true);
      toast.success(res?.message || 'Thank you! You are now subscribed to Quantix updates.');
      setEmail('');
    } catch (err: unknown) {
      const msg = parseApiError(err, 'Subscription failed. Please try again later.');
      toast.error(msg);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-left ${className}`}>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
          <CheckCircle2 size={15} className="shrink-0" />
          <span>Subscribed successfully!</span>
        </div>
        <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
          Check your inbox for our latest release playbook.
        </p>
      </div>
    );
  }

  return (
    <div className={`text-left space-y-2 ${className}`}>
      {title && (
        <div>
          <h5 className="text-xs font-syne font-bold text-slate-900 dark:text-white leading-tight">
            {title}
          </h5>
          {subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
        <div className="relative w-full">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full h-9 pl-8.5 pr-20 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-2xs"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1 top-1 bottom-1 px-3 bg-primary hover:bg-primary/90 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <>
                <span>Join</span>
                <ArrowRight size={11} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSubscribeBox;
