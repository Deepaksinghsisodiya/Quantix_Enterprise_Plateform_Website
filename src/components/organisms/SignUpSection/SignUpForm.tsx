// src/components/organisms/SignUpSection/SignUpForm.tsx
import React from "react";
import Link from "next/link";
import { Lock, Mail, User, Building, Landmark, X } from "lucide-react";
import { motion } from "framer-motion";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMSelectField } from "@/components/atoms/ATMSelectField";
import { ATMButton } from "@/components/atoms/ATMButton";

export interface SignUpFormValues {
  name: string;
  email: string;
  company: string;
  businessType: string;
  password: string;
}

export interface SignUpFormProps {
  formikProps: {
    values: SignUpFormValues;
    errors: Partial<Record<keyof SignUpFormValues, string>>;
    touched: Partial<Record<keyof SignUpFormValues, boolean>>;
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
  };
  isLoading: boolean;
  onCancel: () => void;
}

const businessTypeOptions = [
  { value: "retail", label: "Retail Store" },
  { value: "restaurant", label: "Restaurant / Cafe" },
  { value: "grocery", label: "Grocery / Supermarket" },
  { value: "other", label: "Other Business" },
];

const fieldClass =
  "[&>label]:text-slate-400 [&>label]:text-[10px] [&>label]:font-syne [&>label]:font-bold [&>label]:tracking-wider [&>label]:uppercase " +
  "[&_input]:bg-slate-950/70 [&_input]:border-slate-800 [&_input]:text-white [&_input]:placeholder-slate-600 " +
  "[&_input]:h-12 [&_input]:rounded-2xl [&_input]:transition-all [&_input]:duration-200 " +
  "[&_input:focus]:border-blue-500/60 [&_input:focus]:ring-2 [&_input:focus]:ring-blue-500/10 " +
  "[&_select]:bg-slate-950/70 [&_select]:border-slate-800 [&_select]:text-slate-400 [&_select]:placeholder-slate-600 " +
  "[&_select]:h-12 [&_select]:rounded-2xl [&_select]:transition-all [&_select]:duration-200 " +
  "[&_select:focus]:border-blue-500/60 [&_select:focus]:ring-2 [&_select:focus]:ring-blue-500/10";

export const SignUpForm: React.FC<SignUpFormProps> = ({
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
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

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
                fill="url(#signup-logo-grad-1)"
              />
              <path
                d="M3.5 7V17L12 22V12L3.5 7Z"
                fill="url(#signup-logo-grad-2)"
              />
              <path
                d="M12 12V22L20.5 17V7L12 12Z"
                fill="url(#signup-logo-grad-3)"
              />
              <defs>
                <linearGradient id="signup-logo-grad-1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93C5FD" />
                  <stop offset="1" stopColor="#60A5FA" />
                </linearGradient>
                <linearGradient id="signup-logo-grad-2" x1="3.5" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="signup-logo-grad-3" x1="12" y1="12" x2="20.5" y2="17" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563EB" />
                  <stop offset="1" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-syne font-black tracking-tight uppercase text-white">Quantix</span>
        </div>
        
        <h2 className="text-center text-2xl font-syne font-black tracking-tight text-white uppercase sm:text-3xl mb-2">
          Start your 3-day free trial
        </h2>
        <p className="text-center text-xs text-slate-400 font-semibold mb-8">
          No credit card required. Already have an account?{" "}
          <Link href="/sign-in" className="font-bold text-blue-500 hover:text-blue-400">
            Sign in
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

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            
            {/* Full Name */}
            <ATMTextField
              name="name"
              label="Full Name"
              type="text"
              placeholder="Jane Smith"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name ? errors.name : undefined}
              leftIcon={<User size={14} className="text-slate-500" />}
              className={fieldClass}
            />

            {/* Work Email */}
            <ATMTextField
              name="email"
              label="Work Email Address"
              type="email"
              placeholder="jane@company.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email ? errors.email : undefined}
              leftIcon={<Mail size={14} className="text-slate-500" />}
              className={fieldClass}
            />

            {/* Company Name */}
            <ATMTextField
              name="company"
              label="Company Name"
              type="text"
              placeholder="Acme Corp"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.company && errors.company ? errors.company : undefined}
              leftIcon={<Building size={14} className="text-slate-500" />}
              className={fieldClass}
            />

            {/* Business Type Select Field */}
            <div className="relative">
              <ATMSelectField
                name="businessType"
                label="Business Type"
                placeholder="Select industry..."
                options={businessTypeOptions}
                value={values.businessType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.businessType && errors.businessType ? errors.businessType : undefined}
                className={fieldClass}
              />
              <span className="absolute left-3.5 top-[39px] pointer-events-none text-slate-500">
                <Landmark size={14} />
              </span>
            </div>

            {/* Password */}
            <ATMTextField
              name="password"
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : undefined}
              leftIcon={<Lock size={14} className="text-slate-500" />}
              className={fieldClass}
            />

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
                Create Free Account →
              </ATMButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUpForm;
