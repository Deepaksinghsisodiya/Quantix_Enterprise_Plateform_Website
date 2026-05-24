// src/components/organisms/ContactSalesSection/ContactSalesForm.tsx

import React from "react";
import { ATMButton } from "@/components/atoms/ATMButton";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMTextArea } from "@/components/atoms/ATMTextArea";
import { Shield, X, Send, User, Mail, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactSalesFormValues {
  fullName: string;
  workEmail: string;
  message: string;
}

export interface ContactSalesFormProps {
  formikProps: {
    values: ContactSalesFormValues;
    errors: Partial<ContactSalesFormValues>;
    touched: Partial<Record<keyof ContactSalesFormValues, boolean>>;
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
  };
  isLoading: boolean;
  onCancel: () => void;
}

// ─── Field dark theme classes ─────────────────────────────────────────────────

const fieldClass =
  "[&>label]:text-slate-400 [&>label]:text-[10px] [&>label]:font-syne [&>label]:font-bold [&>label]:tracking-wider [&>label]:uppercase " +
  "[&_input]:bg-slate-950/70 [&_input]:border-slate-800 [&_input]:text-white [&_input]:placeholder-slate-600 " +
  "[&_input]:h-12 [&_input]:rounded-2xl [&_input]:transition-all [&_input]:duration-200 " +
  "[&_input:focus]:border-blue-500/60 [&_input:focus]:ring-2 [&_input:focus]:ring-blue-500/10 " +
  "[&_textarea]:bg-slate-950/70 [&_textarea]:border-slate-800 [&_textarea]:text-white " +
  "[&_textarea]:placeholder-slate-600 [&_textarea]:rounded-2xl [&_textarea]:transition-all " +
  "[&_textarea]:duration-200 [&_textarea:focus]:border-blue-500/60 " +
  "[&_textarea:focus]:ring-2 [&_textarea:focus]:ring-blue-500/10";

// ─── Component ────────────────────────────────────────────────────────────────

export const ContactSalesForm: React.FC<ContactSalesFormProps> = ({
  formikProps,
  isLoading,
  onCancel,
}) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formikProps;

  return (
    <section
      className="bg-slate-950 py-24 border-t border-slate-900 flex items-center justify-center min-h-[75vh] relative overflow-hidden"
      id="contact"
    >
      {/* Grid overlay background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Ambient backlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-5">
            <Sparkles className="h-3 w-3 fill-blue-400" />
            Contact Sales
          </div>

          <h2 className="text-3xl sm:text-5xl font-syne font-black tracking-tight text-white uppercase leading-tight">
            Need a Custom Plan?
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
            Tell us about your requirements and our team will build a tailored
            solution — usually within 1 business day.
          </p>
        </div>

        {/* ── Card ── */}
        <div className="w-full rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">

          {/* Ambient glows inside card */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-blue-600/6 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl" />

          <h3 className="mb-7 text-base font-syne font-bold text-white/90 tracking-tight uppercase">
            Get in touch with our team
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Full Name */}
            <ATMTextField
              name="fullName"
              label="FULL NAME"
              placeholder="Jane Smith"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.fullName && errors.fullName
                  ? errors.fullName
                  : undefined
              }
              leftIcon={<User size={14} className="text-slate-500" />}
              className={fieldClass}
            />

            {/* Work Email */}
            <ATMTextField
              name="workEmail"
              label="WORK EMAIL"
              type="email"
              placeholder="jane@company.com"
              value={values.workEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.workEmail && errors.workEmail
                  ? errors.workEmail
                  : undefined
              }
              leftIcon={<Mail size={14} className="text-slate-500" />}
              className={fieldClass}
            />

            {/* Message */}
            <ATMTextArea
              name="message"
              label="HOW CAN WE HELP?"
              placeholder="Tell us about your business needs..."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.message && errors.message
                  ? errors.message
                  : undefined
              }
              rows={4}
              wrapperClassName={
                fieldClass +
                " [&_textarea]:min-h-[110px] [&_textarea]:resize-none"
              }
            />

            {/* ── Action Row: Stack on mobile, side-by-side on desktop ── */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">

              {/* Cancel */}
              <ATMButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={onCancel}
                disabled={isLoading}
                className="
                  w-full sm:flex-1 border-slate-800 bg-slate-900/60 text-slate-300
                  hover:bg-slate-800 hover:text-white hover:border-slate-700
                  transition-all duration-200 py-3.5 rounded-full text-xs font-bold
                "
              >
                <X size={14} className="mr-1.5 opacity-70" />
                Cancel
              </ATMButton>

              {/* Submit */}
              <ATMButton
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                disabled={isLoading}
                className="
                  w-full sm:flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-bold
                  shadow-lg shadow-blue-500/20 transition-all duration-200
                  hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] py-3.5 rounded-full text-xs
                "
              >
                {!isLoading && <Send size={14} className="mr-1.5" />}
                Send Message
              </ATMButton>
            </div>
          </form>

          {/* ── Footer note ── */}
          <div className="mt-7 flex items-center justify-center gap-2 text-[10px] text-slate-500 border-t border-slate-900/80 pt-5 font-medium">
            <Shield className="h-3.5 w-3.5 text-blue-500/70 flex-shrink-0" />
            <span>
              Your request is secure &amp; confidential. We respond within 24 hours.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSalesForm;