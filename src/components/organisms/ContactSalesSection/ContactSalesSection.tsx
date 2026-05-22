import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { ATMButton } from "@/components/atoms/ATMButton";
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMTextArea } from "@/components/atoms/ATMTextArea";
import { useSubmitContactFormMutation } from "@/redux/services/contactApi";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";

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
    <section className="bg-slate-950 py-24 border-t border-slate-900" id="contact">
      <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        {/* Left column – info */}
        <div className="space-y-8 text-white">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 mb-4">
              CONTACT SALES
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need a custom plan?
            </h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-lg">
              Whether you're a growing chain or a franchise, our team will build a pricing package and integration plan tailored to your exact needs.
            </p>
          </div>
          <div className="space-y-4">
            <ContactRow
              icon={<Phone className="h-4.5 w-4.5" />}
              label="Call us"
              value="+1 (800) 555-QNTX"
            />
            <ContactRow
              icon={<Mail className="h-4.5 w-4.5" />}
              label="Email us"
              value="sales@qauntix.com"
            />
            <ContactRow
              icon={<MapPin className="h-4.5 w-4.5" />}
              label="Headquarters"
              value="San Francisco, CA 94105"
            />
            <ContactRow
              icon={<Clock className="h-4.5 w-4.5" />}
              label="Response time"
              value="Within 1 business day"
            />
          </div>
          {/* Enterprise support card */}
          <div className="rounded-2xl bg-slate-900/30 border border-slate-900 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Enterprise-grade support</h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Dedicated onboarding specialist, SLA-backed uptime, custom integration development, and a named account manager available around the clock.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column – contact form */}
        <div className="rounded-2xl bg-slate-900/20 border border-slate-800/80 p-8 shadow-2xl backdrop-blur-xs">
          <h3 className="mb-6 text-lg font-bold text-white">
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
        </div>
      </div>
    </section>
  );
};

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactRow: React.FC<ContactRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-400">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 leading-none">{label}</p>
      <p className="text-sm font-semibold text-white mt-1.5 leading-none">{value}</p>
    </div>
  </div>
);

export default ContactSalesSection;
