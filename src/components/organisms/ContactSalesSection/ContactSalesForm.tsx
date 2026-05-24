// src/components/organisms/ContactSalesSection/ContactSalesForm.tsx

import React from "react";
import { ATMButton } from "@/components/atoms/ATMButton";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMTextArea } from "@/components/atoms/ATMTextArea";
import { Shield, X, Send, User, Mail } from "lucide-react";

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
  "[&>label]:text-slate-400 [&>label]:text-[10px] [&>label]:font-bold [&>label]:tracking-widest [&>label]:uppercase " +
  "[&_input]:bg-slate-950/70 [&_input]:border-slate-800 [&_input]:text-white [&_input]:placeholder-slate-600 " +
  "[&_input]:h-11 [&_input]:rounded-xl [&_input]:transition-all [&_input]:duration-200 " +
  "[&_input:focus]:border-blue-500/60 [&_input:focus]:ring-2 [&_input:focus]:ring-blue-500/10 " +
  "[&_textarea]:bg-slate-950/70 [&_textarea]:border-slate-800 [&_textarea]:text-white " +
  "[&_textarea]:placeholder-slate-600 [&_textarea]:rounded-xl [&_textarea]:transition-all " +
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
      className="bg-slate-950 py-24 border-t border-slate-900 flex items-center justify-center min-h-[75vh]"
      id="contact"
    >
      <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 text-[11px] font-bold tracking-widest text-blue-400 mb-5 uppercase">
            Contact Sales
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
            Need a Custom Plan?
          </h2>

          <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            Tell us about your requirements and our team will build a tailored
            solution — usually within 1 business day.
          </p>
        </div>

        {/* ── Card ── */}
        <div className="w-full rounded-2xl bg-slate-900/30 border border-slate-800/70 p-8 sm:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">

          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-blue-600/6 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl" />

          <h3 className="mb-7 text-base font-display font-bold text-white/90 tracking-tight">
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

            {/* ── Action Row ── */}
            <div className="flex items-center gap-3 pt-1">

              {/* Cancel */}
              <ATMButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={onCancel}
                disabled={isLoading}
                className="
                  flex-1 border-slate-800 bg-slate-900/60 text-slate-300
                  hover:bg-slate-800 hover:text-white hover:border-slate-700
                  transition-all duration-200
                "
              >
                <X size={15} className="mr-1.5 opacity-70" />
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
                  flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-semibold
                  shadow-lg shadow-blue-500/20 transition-all duration-200
                  hover:shadow-blue-500/30 hover:-translate-y-px active:translate-y-0
                "
              >
                {!isLoading && <Send size={15} className="mr-1.5" />}
                Send Message
              </ATMButton>
            </div>
          </form>

          {/* ── Footer note ── */}
          <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-slate-600 border-t border-slate-900/80 pt-5">
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