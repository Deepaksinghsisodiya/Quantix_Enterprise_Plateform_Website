// src/features/Contact/ContactSalesForm.tsx
import React from "react";
import { ATMButton } from "@/components/atoms/ATMButton";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMTextArea } from "@/components/atoms/ATMTextArea";
import { Shield, X, Send, User, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ContactSalesFormValues } from "./Types/ContactTypes";

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

const fieldClass =
  "[&>label]:text-slate-400 [&>label]:text-[11px] [&>label]:font-syne [&>label]:font-bold [&>label]:tracking-wider [&>label]:uppercase " +
  "[&_input]:bg-slate-900/60 [&_input]:border-slate-700/50 [&_input]:text-white [&_input]:placeholder-slate-500 " +
  "[&_input]:h-[46px] [&_input]:rounded-xl [&_input]:transition-all [&_input]:duration-200 [&_input]:text-sm " +
  "[&_input:focus]:border-blue-500/50 [&_input:focus]:ring-2 [&_input:focus]:ring-blue-500/10 [&_input:focus]:bg-slate-900/80 " +
  "[&_textarea]:bg-slate-900/60 [&_textarea]:border-slate-700/50 [&_textarea]:text-white " +
  "[&_textarea]:placeholder-slate-500 [&_textarea]:rounded-xl [&_textarea]:transition-all [&_textarea]:text-sm " +
  "[&_textarea]:duration-200 [&_textarea:focus]:border-blue-500/50 " +
  "[&_textarea:focus]:ring-2 [&_textarea:focus]:ring-blue-500/10 [&_textarea:focus]:bg-slate-900/80";

export const ContactSalesForm: React.FC<ContactSalesFormProps> = ({
  formikProps,
  isLoading,
  onCancel,
}) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formikProps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Badge + Heading */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-4">
          <Sparkles className="h-3 w-3 fill-blue-400" />
          Sales Team
        </div>

        <h2 className="text-[26px] sm:text-3xl font-syne font-black tracking-tight text-white leading-tight mb-3">
          Let&apos;s build your plan
        </h2>

        <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
          Tell us what you need and we&apos;ll craft a tailored solution within 1 business day.
        </p>
      </div>

      {/* ── Card ── */}
      <div className="w-full rounded-2xl bg-slate-900/30 border border-slate-800/60 backdrop-blur-sm p-6 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Full Name */}
          <ATMTextField
            name="fullName"
            label="Full Name"
            placeholder="Jane Smith"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.fullName && errors.fullName
                ? errors.fullName
                : undefined
            }
            leftIcon={<User size={15} className="text-slate-500" />}
            className={fieldClass}
          />

          {/* Work Email */}
          <ATMTextField
            name="workEmail"
            label="Work Email"
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
            leftIcon={<Mail size={15} className="text-slate-500" />}
            className={fieldClass}
          />

          {/* Message */}
          <ATMTextArea
            name="message"
            label="How can we help?"
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
              className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold shadow-lg shadow-blue-600/20 transition-all py-3 rounded-xl text-sm"
              rightIcon={!isLoading ? <Send size={14} className="ml-1.5" /> : undefined}
            >
              Send Message
            </ATMButton>
          </div>
        </form>

        {/* Footer note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-500 border-t border-slate-800/50 pt-4 font-medium">
          <Shield className="h-3.5 w-3.5 text-blue-500/60 flex-shrink-0" />
          <span>Secure &amp; confidential. We respond within 24 hours.</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSalesForm;
