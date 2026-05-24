// src/components/organisms/SignUpSection/SignUpForm.tsx
import React from "react";
import Link from "next/link";
import { Lock, Mail, User, Building, Landmark, X, ArrowRight } from "lucide-react";
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
  "[&>label]:text-slate-400 [&>label]:text-[11px] [&>label]:font-syne [&>label]:font-bold [&>label]:tracking-wider [&>label]:uppercase " +
  "[&_input]:bg-slate-900/60 [&_input]:border-slate-700/50 [&_input]:text-white [&_input]:placeholder-slate-500 " +
  "[&_input]:h-[46px] [&_input]:rounded-xl [&_input]:transition-all [&_input]:duration-200 [&_input]:text-sm " +
  "[&_input:focus]:border-blue-500/50 [&_input:focus]:ring-2 [&_input:focus]:ring-blue-500/10 [&_input:focus]:bg-slate-900/80 " +
  "[&_select]:bg-slate-900/60 [&_select]:border-slate-700/50 [&_select]:text-slate-400 [&_select]:placeholder-slate-500 " +
  "[&_select]:h-[46px] [&_select]:rounded-xl [&_select]:transition-all [&_select]:duration-200 [&_select]:text-sm " +
  "[&_select:focus]:border-blue-500/50 [&_select:focus]:ring-2 [&_select:focus]:ring-blue-500/10 [&_select:focus]:bg-slate-900/80";

export const SignUpForm: React.FC<SignUpFormProps> = ({
  formikProps,
  isLoading,
  onCancel,
}) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formikProps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Page heading */}
      <div className="mb-8">
        <h2 className="text-[26px] sm:text-3xl font-syne font-black tracking-tight text-white leading-tight mb-3">
          Create your account
        </h2>
        <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
          Start your 3-day free trial. Already registered?{" "}
          <Link href="/sign-in" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      {/* ── Card ── */}
      <div className="w-full bg-slate-900/30 border border-slate-800/60 backdrop-blur-sm p-6 sm:p-7 shadow-xl rounded-2xl relative overflow-hidden">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

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
            leftIcon={<User size={15} className="text-slate-500" />}
            className={fieldClass}
          />

          {/* Work Email */}
          <ATMTextField
            name="email"
            label="Work Email"
            type="email"
            placeholder="jane@company.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : undefined}
            leftIcon={<Mail size={15} className="text-slate-500" />}
            className={fieldClass}
          />

          {/* Company Name */}
          <ATMTextField
            name="company"
            label="Company"
            type="text"
            placeholder="Acme Corp"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.company && errors.company ? errors.company : undefined}
            leftIcon={<Building size={15} className="text-slate-500" />}
            className={fieldClass}
          />

          {/* Business Type */}
          <ATMSelectField
            name="businessType"
            label="Business Type"
            placeholder="Select your industry"
            options={businessTypeOptions}
            value={values.businessType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.businessType && errors.businessType ? errors.businessType : undefined}
            leftIcon={<Landmark size={15} className="text-slate-500" />}
            className={fieldClass}
          />

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
            leftIcon={<Lock size={15} className="text-slate-500" />}
            className={fieldClass}
          />

          {/* Action Row */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 pt-3">
            <ATMButton
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full sm:w-auto text-slate-400 hover:text-white text-xs font-semibold py-3 px-5 rounded-xl hover:bg-slate-800/60 transition-all"
              leftIcon={<X size={13} className="opacity-60 mr-1" />}
            >
              Cancel
            </ATMButton>

            <ATMButton
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all"
              rightIcon={!isLoading ? <ArrowRight size={15} className="ml-1.5" /> : undefined}
            >
              Create Account
            </ATMButton>
          </div>
        </form>

        {/* Terms note */}
        <p className="mt-5 text-[10px] text-slate-500 text-center leading-relaxed">
          By creating an account you agree to our{" "}
          <a href="#" className="text-slate-400 hover:text-blue-400 underline underline-offset-2 transition-colors">Terms</a>{" "}
          and{" "}
          <a href="#" className="text-slate-400 hover:text-blue-400 underline underline-offset-2 transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpForm;
