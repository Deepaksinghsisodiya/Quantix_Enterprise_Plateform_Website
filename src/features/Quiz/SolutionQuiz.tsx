// src/features/Quiz/SolutionQuiz.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles, Mail, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'single' | 'multi';
  options: { value: string; label: string }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 0,
    question: 'What type of business do you run?',
    type: 'single',
    options: [
      { value: 'restaurant', label: 'Restaurant / Cafe / Bar' },
      { value: 'retail', label: 'Retail Store' },
      { value: 'both', label: 'Both Restaurant & Retail' },
    ],
  },
  {
    id: 1,
    question: 'How many locations do you operate?',
    type: 'single',
    options: [
      { value: '1', label: '1 location' },
      { value: '2-5', label: '2 to 5 locations' },
      { value: '6-20', label: '6 to 20 locations' },
      { value: '20+', label: 'More than 20 locations' },
    ],
  },
  {
    id: 2,
    question: 'How many POS terminals do you need?',
    type: 'single',
    options: [
      { value: '1-2', label: '1–2 terminals' },
      { value: '3-10', label: '3–10 terminals' },
      { value: '11-50', label: '11–50 terminals' },
      { value: '50+', label: '50+ terminals' },
    ],
  },
  {
    id: 3,
    question: 'Which features are most important to you?',
    type: 'multi',
    options: [
      { value: 'inventory', label: 'Inventory Management' },
      { value: 'loyalty', label: 'Customer Loyalty' },
      { value: 'delivery', label: 'Delivery & Dispatch' },
      { value: 'kds', label: 'Kitchen Display System' },
      { value: 'multi-location-sync', label: 'Multi-Location Sync' },
      { value: 'offline-mode', label: 'Offline Mode' },
      { value: 'ecommerce', label: 'Online Ordering' },
      { value: 'analytics', label: 'Advanced Analytics' },
    ],
  },
  {
    id: 4,
    question: 'Do you have reliable internet at your locations?',
    type: 'single',
    options: [
      { value: 'reliable', label: 'Yes, always' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'unreliable', label: 'No / Very unreliable' },
    ],
  },
  {
    id: 5,
    question: "What's your monthly budget for POS software?",
    type: 'single',
    options: [
      { value: 'free', label: 'Free / Minimal' },
      { value: '50-150', label: '$50–$150/month' },
      { value: '150-500', label: '$150–$500/month' },
      { value: '500+', label: '$500+/month' },
      { value: 'one-time', label: 'One-time purchase only' },
    ],
  },
];

const ENTERPRISE_PLANS = [
  { id: 'free', name: 'Free', price: 'Free' },
  { id: 'basic', name: 'Basic', price: '$49/mo' },
  { id: 'pro', name: 'Pro', price: '$99/mo' },
  { id: 'enterprise', name: 'Enterprise', price: '$249/mo' },
];

const STANDALONE_TIERS = [
  { id: 'basic', name: 'Basic', price: 'From $19' },
  { id: 'standard', name: 'Standard', price: 'From $39' },
  { id: 'advance', name: 'Advance', price: 'From $69' },
  { id: 'premium', name: 'Premium', price: 'From $99' },
];

export const SolutionQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [result, setResult] = useState<any | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = (currentStep + 1) / QUESTIONS.length;
  const currentAnswer = answers[currentStep];

  const handleSelect = (val: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: val }));
  };

  const handleNext = () => {
    if (currentStep === QUESTIONS.length - 1) {
      calculateResult();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
    setEmail('');
    setEmailSent(false);
  };

  const calculateResult = () => {
    let enterpriseScore = 0;
    let tierLevel = 0;
    const reasons: string[] = [];
    let forceStandalone = false;
    let forceEnterprise = false;

    // Q0: business type
    if (answers[0] === 'both') {
      enterpriseScore += 2;
      tierLevel += 1;
      reasons.push('You operate both restaurant and retail, benefiting from a unified cloud platform.');
    }

    // Q1: locations
    const locations = answers[1];
    if (locations === '2-5') {
      enterpriseScore += 2;
      tierLevel += 1;
      reasons.push('Multiple locations require dynamic cloud syncing and inventory sync.');
    } else if (locations === '6-20') {
      enterpriseScore += 4;
      tierLevel = Math.max(tierLevel, 2);
      forceEnterprise = true;
      reasons.push('6+ locations require cloud Enterprise Pro tiers for centralised control.');
    } else if (locations === '20+') {
      enterpriseScore += 5;
      tierLevel = Math.max(tierLevel, 3);
      forceEnterprise = true;
      reasons.push('Chain operations with 20+ venues require Enterprise grade scaling.');
    }

    // Q2: terminals
    const terminals = answers[2];
    if (terminals === '3-10') {
      tierLevel = Math.max(tierLevel, 1);
      enterpriseScore += 1;
    } else if (terminals === '11-50') {
      tierLevel = Math.max(tierLevel, 2);
      enterpriseScore += 2;
    } else if (terminals === '50+') {
      tierLevel = Math.max(tierLevel, 3);
      forceEnterprise = true;
    }

    // Q3: features
    const features = answers[3] as string[] | undefined;
    if (features) {
      if (features.includes('multi-location-sync')) {
        enterpriseScore += 3;
        forceEnterprise = true;
        reasons.push('Multi-Location Sync is a dynamic Cloud Enterprise exclusive service.');
      }
      if (features.includes('kds') || features.includes('delivery')) {
        tierLevel = Math.max(tierLevel, 2);
        reasons.push('Kitchen displays and delivery setups match Standard/Advance POS profiles.');
      }
    }

    // Q4: connectivity
    if (answers[4] === 'unreliable') {
      forceStandalone = true;
      reasons.push('Unreliable internet detected — Offline-first local standalone mode recommended.');
    }

    // Q5: budget
    const budget = answers[5];
    if (budget === 'one-time') {
      forceStandalone = true;
      reasons.push('One-time purchase preferred: Standalone token licensing has zero monthly fees.');
    } else if (budget === 'free') {
      tierLevel = 0;
    } else if (budget === '50-150') {
      tierLevel = Math.max(tierLevel, 1);
    } else if (budget === '150-500') {
      tierLevel = Math.max(tierLevel, 2);
    } else if (budget === '500+') {
      tierLevel = Math.max(tierLevel, 3);
    }

    const isEnterprise = forceStandalone ? false : (forceEnterprise || enterpriseScore >= 3);
    const clampedTier = Math.min(tierLevel, 3);

    if (isEnterprise) {
      const pick = ENTERPRISE_PLANS[clampedTier];
      setResult({
        planType: 'enterprise',
        planName: `${pick.name} Plan`,
        price: pick.price,
        confidence: Math.min(60 + clampedTier * 10, 95),
        reasons
      });
    } else {
      const pick = STANDALONE_TIERS[clampedTier];
      setResult({
        planType: 'standalone',
        planName: `${pick.name} Token`,
        price: pick.price,
        confidence: Math.min(60 + clampedTier * 10, 95),
        reasons
      });
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSent(true);
      toast.success('Your custom setup recommendation has been dispatched!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-0">
      <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        {/* Progress Timeline Header */}
        {!result && (
          <div className="mb-8 border-b border-gray-200 dark:border-slate-800/60 pb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-500">
              Question {currentStep + 1} of {QUESTIONS.length}
            </span>
            <div className="h-1.5 w-24 bg-gray-200 dark:bg-slate-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                animate={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {result ? (
            /* Results Screen */
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center space-y-6"
            >
              <div className="h-14 w-14 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
                <Sparkles size={24} className="animate-pulse" />
              </div>

              <div className="space-y-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">Match Found!</h3>
                <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase tracking-tight">We Recommend</h2>
              </div>

              <div className="max-w-sm mx-auto bg-white dark:bg-slate-950/60 border border-gray-200 dark:border-slate-800/80 p-6 rounded-2xl text-left space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900 dark:text-white uppercase font-syne">{result.planName}</span>
                  <span className="rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-500 dark:text-blue-400 py-1 px-2.5 uppercase tracking-wider">
                    {result.planType === 'enterprise' ? 'Cloud POS' : 'Standalone'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold border-t border-gray-200 dark:border-slate-800 pt-2">
                  <span>Pricing Profile</span>
                  <span className="text-slate-900 dark:text-white font-mono font-black">{result.price}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Match Confidence</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{result.confidence}%</span>
                </div>
              </div>

              {result.reasons.length > 0 && (
                <div className="text-left bg-gray-50/50 dark:bg-slate-900/20 border border-gray-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-455 dark:text-slate-500">Key reasons:</h4>
                  <ul className="space-y-1.5">
                    {result.reasons.map((r: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Email capture lead finder */}
              <div className="border-t border-gray-200 dark:border-slate-800 pt-6">
                {emailSent ? (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Custom setup recommendation sent to: {email}</p>
                ) : (
                  <form onSubmit={handleSendEmail} className="flex gap-2 max-w-sm mx-auto">
                    <input
                      type="email"
                      required
                      placeholder="Enter email to save recommendations"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-3 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Mail size={13} /> Save
                    </button>
                  </form>
                )}
              </div>

              <button
                onClick={reset}
                className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all flex items-center justify-center gap-1.5 mx-auto pt-2 cursor-pointer"
              >
                <RotateCcw size={12} /> Retake Plan Finder Quiz
              </button>
            </motion.div>
          ) : (
            /* Question Layout Screen */
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white leading-snug">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === 'single' ? (
                /* Radio Buttons */
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full rounded-xl py-3.5 px-5 text-left text-xs font-bold transition-all border cursor-pointer ${
                        currentAnswer === opt.value
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                          : 'bg-white dark:bg-slate-950/60 border-gray-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-slate-900 dark:hover:text-slate-200 hover:border-gray-400 dark:hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : (
                /* Checkboxes Multi-select */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQuestion.options.map((opt) => {
                    const activeAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];
                    const isChecked = activeAnswers.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          const val = isChecked
                            ? activeAnswers.filter((a) => a !== opt.value)
                            : [...activeAnswers, opt.value];
                          handleSelect(val);
                        }}
                        className={`rounded-xl py-3.5 px-5 text-left text-xs font-bold transition-all border cursor-pointer flex items-center gap-3 ${
                          isChecked
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-white dark:bg-slate-950/60 border-gray-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-slate-900 dark:hover:text-slate-200 hover:border-gray-400 dark:hover:border-slate-700'
                        }`}
                      >
                        <span className={`h-4.5 w-4.5 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-white border-white text-blue-650' : 'border-gray-350 dark:border-slate-700 bg-transparent'
                        }`}>
                          {isChecked && <span className="text-[10px] leading-none">&#10003;</span>}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-slate-800/60 mt-6">
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={handlePrev}
                  className="rounded-xl border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 disabled:opacity-30 py-3 px-5 text-xs font-bold text-slate-600 dark:text-slate-450 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={14} className="stroke-[3]" /> Back
                </button>
                <button
                  type="button"
                  disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
                  onClick={handleNext}
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 py-3 px-6 text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  {currentStep === QUESTIONS.length - 1 ? 'Analyze Setup &rarr;' : 'Next'} <ChevronRight size={14} className="stroke-[3]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SolutionQuiz;
