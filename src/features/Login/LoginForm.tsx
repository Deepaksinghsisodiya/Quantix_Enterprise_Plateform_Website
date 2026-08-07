// src/features/Login/LoginForm.tsx
import React from "react";
import Link from "next/link";
import { Lock, Mail, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMCheckbox } from "@/components/atoms/ATMCheckbox";
import { ATMButton } from "@/components/atoms/ATMButton";
import { SignInFormValues } from "./Types/LoginTypes";

export interface LoginFormProps {
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
  "[&>label]:text-slate-400 [&>label]:text-[11px] [&>label]:font-syne [&>label]:font-bold [&>label]:tracking-wider [&>label]:uppercase " +
  "[&_input]:bg-slate-900/60 [&_input]:border-slate-700/50 [&_input]:text-white [&_input]:placeholder-slate-500 " +
  "[&_input]:h-[46px] [&_input]:rounded-xl [&_input]:transition-all [&_input]:duration-200 [&_input]:text-sm " +
  "[&_input:focus]:border-primary/50 [&_input:focus]:ring-2 [&_input:focus]:ring-primary/10 [&_input:focus]:bg-slate-900/80";

export const LoginForm: React.FC<LoginFormProps> = ({
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
          Welcome back
        </h2>
        <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
          Sign in to your dashboard. Or{" "}
          <Link href="/sign-up" className="font-bold text-primary hover:text-primary-light transition-colors">
            create a free account
          </Link>
        </p>
      </div>

      {/* ── Card ── */}
      <div className="w-full bg-slate-900/30 border border-slate-800/60 backdrop-blur-sm p-6 sm:p-7 shadow-xl rounded-2xl relative overflow-hidden">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Work Email / Username */}
          <ATMTextField
            name="email"
            label="Email or Username"
            type="text"
            placeholder="you@company.com or username"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : undefined}
            leftIcon={<Mail size={15} className="text-slate-500" />}
            className={fieldClass}
          />

          {/* Password */}
          <div className="space-y-1.5">
            <ATMTextField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : undefined}
              leftIcon={<Lock size={15} className="text-slate-500" />}
              className={fieldClass}
            />
            <div className="flex justify-end">
              <Link href="/contact" className="text-[11px] font-semibold text-primary hover:text-primary-light transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center pt-0.5">
            <ATMCheckbox
              name="rememberMe"
              label="Keep me signed in"
              checked={values.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 bg-slate-900/60 border-slate-700/50 rounded text-primary focus:ring-primary/20 cursor-pointer"
            />
          </div>

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
              className="w-full sm:flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary-dark text-white font-bold py-3 text-sm rounded-xl shadow-lg shadow-primary/20 transition-all"
              rightIcon={!isLoading ? <ArrowRight size={15} className="ml-1.5" /> : undefined}
            >
              Sign In
            </ATMButton>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
