// src/components/organisms/SignInSection/SignInForm.tsx
import React from "react";
import Link from "next/link";
import { Lock, Mail, X } from "lucide-react";
import { motion } from "framer-motion";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMCheckbox } from "@/components/atoms/ATMCheckbox";
import { ATMButton } from "@/components/atoms/ATMButton";

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInFormProps {
  formikProps: {
    values: SignInFormValues;
    errors: Partial<Record<keyof SignInFormValues, string>>;
    touched: Partial<Record<keyof SignInFormValues, boolean>>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleBlur: React.FocusEventHandler<HTMLInputElement>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
  };
  isLoading: boolean;
  onCancel: () => void;
}

const fieldClass =
  "[&>label]:text-slate-400 [&>label]:text-[10px] [&>label]:font-syne [&>label]:font-bold [&>label]:tracking-wider [&>label]:uppercase " +
  "[&_input]:bg-slate-950/70 [&_input]:border-slate-800 [&_input]:text-white [&_input]:placeholder-slate-600 " +
  "[&_input]:h-12 [&_input]:rounded-2xl [&_input]:transition-all [&_input]:duration-200 " +
  "[&_input:focus]:border-blue-500/60 [&_input:focus]:ring-2 [&_input:focus]:ring-blue-500/10";

export const SignInForm: React.FC<SignInFormProps> = ({
  formikProps,
  isLoading,
  onCancel,
}) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formikProps;

  return (
    <section className="bg-slate-950 py-12 flex items-center justify-center min-h-[75vh] relative overflow-hidden">
      {/* Tech grid background overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Logo and title */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5.5 w-5.5"
            >
              <path
                d="M12 2L3.5 7L12 12L20.5 7L12 2Z"
                fill="url(#signin-logo-grad-1)"
              />
              <path
                d="M3.5 7V17L12 22V12L3.5 7Z"
                fill="url(#signin-logo-grad-2)"
              />
              <path
                d="M12 12V22L20.5 17V7L12 12Z"
                fill="url(#signin-logo-grad-3)"
              />
              <defs>
                <linearGradient id="signin-logo-grad-1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93C5FD" />
                  <stop offset="1" stopColor="#60A5FA" />
                </linearGradient>
                <linearGradient id="signin-logo-grad-2" x1="3.5" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="signin-logo-grad-3" x1="12" y1="12" x2="20.5" y2="17" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563EB" />
                  <stop offset="1" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-syne font-black tracking-tight uppercase text-white">Quantix</span>
        </div>
        
        <h2 className="text-center text-2xl font-syne font-black tracking-tight text-white uppercase sm:text-3xl mb-2">
          Sign in to your account
        </h2>
        <p className="text-center text-xs text-slate-400 font-semibold mb-8">
          Or{" "}
          <Link href="/sign-up" className="font-bold text-blue-500 hover:text-blue-400">
            start your 3-day free trial
          </Link>
        </p>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full bg-slate-900/40 border border-slate-800/80 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl relative overflow-hidden text-left"
        >
          {/* Soft inner card ambient glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl" />

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            
            {/* Work Email Field */}
            <ATMTextField
              name="email"
              label="Work Email Address"
              type="email"
              placeholder="name@company.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email ? errors.email : undefined}
              leftIcon={<Mail size={14} className="text-slate-500" />}
              className={fieldClass}
            />

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-[10px] font-syne font-bold tracking-wider uppercase text-slate-400">
                  Password
                </label>
                <div className="text-xs">
                  <a href="#" className="font-bold text-blue-500 hover:text-blue-400 font-syne">
                    Forgot password?
                  </a>
                </div>
              </div>
              <ATMTextField
                name="password"
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password ? errors.password : undefined}
                leftIcon={<Lock size={14} className="text-slate-500" />}
                className={fieldClass}
              />
            </div>

            {/* Remember Me Session */}
            <div className="flex items-center justify-between pt-1">
              <ATMCheckbox
                name="rememberMe"
                label="Remember my session"
                checked={values.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 bg-slate-950 border-slate-800 rounded text-blue-600 focus:ring-blue-500/20 cursor-pointer"
              />
            </div>

            {/* ── Action Row: Reusable ATMButton Components ── */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              
              {/* Cancel Button */}
              <ATMButton
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isLoading}
                className="w-full sm:flex-1 border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700 py-3.5 text-xs font-bold rounded-full"
                leftIcon={<X size={14} className="opacity-70 mr-1.5" />}
              >
                Cancel
              </ATMButton>

              {/* Submit Button */}
              <ATMButton
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full sm:flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 text-xs rounded-full shadow-lg shadow-blue-500/20"
              >
                Sign In to Dashboard →
              </ATMButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SignInForm;
