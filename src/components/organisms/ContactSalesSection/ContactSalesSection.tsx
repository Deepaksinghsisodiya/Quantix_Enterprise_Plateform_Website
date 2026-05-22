import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { ATMButton } from "@/components/atoms/ATMButton";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMTextArea } from "@/components/atoms/ATMTextArea";
import { useSubmitContactFormMutation } from "@/redux/services/contactApi";
import { toast } from "sonner";
import { Shield } from "lucide-react";

export const ContactSalesSection = () => {
  const [submitContact, { isLoading }] = useSubmitContactFormMutation();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      workEmail: "",
      companyName: "",
      numberOfLocations: "",
      message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Too short")
        .required("Required"),
      workEmail: Yup.string().email("Invalid email").required("Required"),
      companyName: Yup.string().required("Required"),
      numberOfLocations: Yup.number()
        .typeError("Must be a number")
        .min(1, "At least 1")
        .required("Required"),
      message: Yup.string()
        .min(20, "Minimum 20 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitContact(values).unwrap();
        toast.success("Message sent! Our team will reach out within 1 business day.");
        resetForm();
      } catch (err) {
        toast.error("Failed to send message. Please try again later.");
      }
    },
  });

  const fieldDarkClasses = "[&>label]:text-slate-400 [&>label]:text-[10px] [&>label]:font-bold [&>label]:tracking-wider [&>label]:uppercase [&_input]:bg-slate-950/60 [&_input]:border-slate-800/80 [&_input]:text-white [&_input]:placeholder-slate-600 [&_input]:h-11 [&_input]:rounded-lg [&_textarea]:bg-slate-950/60 [&_textarea]:border-slate-800/80 [&_textarea]:text-white [&_textarea]:placeholder-slate-600 [&_textarea]:rounded-lg";

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-900 flex items-center justify-center min-h-[75vh]" id="contact">
      <div className="site-container max-w-2xl flex flex-col items-center">
        {/* Header info */}
        <div className="text-center mb-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 text-xs font-semibold text-blue-400 mb-4 shadow-sm">
            CONTACT SALES
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Need a Custom Plan?
          </h2>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Whether you are a growing chain or a franchise, tell us about your requirements and our team will build a tailored solution for your business.
          </p>
        </div>

        {/* Contact Form */}
        <div className="w-full rounded-2xl bg-slate-900/20 border border-slate-800/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xs relative overflow-hidden">
          {/* Ambient subtle glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="mb-6 text-lg font-bold text-white text-center sm:text-left">
            Get in touch with sales
          </h3>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* 2x2 grid of first four fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ATMTextField
                name="fullName"
                label="FULL NAME"
                placeholder="Jane Smith"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : undefined}
                className={fieldDarkClasses}
              />
              <ATMTextField
                name="workEmail"
                label="WORK EMAIL"
                placeholder="jane@company.com"
                value={formik.values.workEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.workEmail && formik.errors.workEmail ? formik.errors.workEmail : undefined}
                className={fieldDarkClasses}
              />
              <ATMTextField
                name="companyName"
                label="COMPANY NAME"
                placeholder="Acme Corp"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.companyName && formik.errors.companyName ? formik.errors.companyName : undefined}
                className={fieldDarkClasses}
              />
              <ATMTextField
                name="numberOfLocations"
                label="NO. OF LOCATIONS"
                placeholder="e.g. 5"
                value={formik.values.numberOfLocations}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.numberOfLocations && formik.errors.numberOfLocations
                    ? formik.errors.numberOfLocations
                    : undefined
                }
                type="number"
                className={fieldDarkClasses}
              />
            </div>
            {/* Message textarea */}
            <ATMTextArea
              name="message"
              label="HOW CAN WE HELP?"
              placeholder="Tell us about your business..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && formik.errors.message ? formik.errors.message : undefined}
              rows={4}
              wrapperClassName={fieldDarkClasses}
            />
            <ATMButton
              type="submit"
              fullWidth
              size="lg"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              className="mt-4"
            >
              Send Message →
            </ATMButton>
          </form>

          {/* Secure details tag */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 border-t border-slate-900 pt-4">
            <Shield className="h-3.5 w-3.5 text-blue-500" />
            <span>Your request is secure. We respond within 24 hours.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSalesSection;
