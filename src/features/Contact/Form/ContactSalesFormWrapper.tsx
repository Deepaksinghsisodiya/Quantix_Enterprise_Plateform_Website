// src/features/Contact/Form/ContactSalesFormWrapper.tsx
'use client';

import React from "react";
import { useFormik, FormikProvider } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSubmitContactFormMutation } from "../Service/ContactService";
import { ContactSalesFormValues } from "../Types/ContactTypes";
import { ContactSalesForm } from "./ContactSalesForm";
import { contactSalesValidationSchema } from "../validation/ContactValidation";
import { parseApiError } from "@/lib/errorHandler";

const initialValues: ContactSalesFormValues = {
  fullName: "",
  workEmail: "",
  message: "",
  captcha: "",
};

export const ContactSalesFormWrapper: React.FC = () => {
  const router = useRouter();
  const [submitContact, { isLoading }] = useSubmitContactFormMutation();

  const formik = useFormik<ContactSalesFormValues>({
    initialValues,
    validationSchema: contactSalesValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await submitContact({
          name: values.fullName.trim(),
          email: values.workEmail.trim().toLowerCase(),
          phone: values.phone?.trim() || "",
          companyName: values.companyName?.trim() || "",
          inquiryType: values.inquiryType || "Sales",
          message: values.message.trim(),
        }).unwrap();

        toast.success(
          res?.message || "Inquiry received! An enterprise specialist will connect with you shortly."
        );
        resetForm();
      } catch (err: unknown) {
        const message = parseApiError(err, "Failed to submit inquiry. Please try again.");
        toast.error(message);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    router.back();
  };

  return (
    <FormikProvider value={formik}>
      <ContactSalesForm
        formikProps={{
          values: formik.values,
          errors: formik.errors,
          touched: formik.touched,
          handleChange: formik.handleChange,
          handleBlur: formik.handleBlur,
          handleSubmit: formik.handleSubmit,
          isSubmitting: formik.isSubmitting,
        }}
        isLoading={isLoading}
        onCancel={handleCancel}
      />
    </FormikProvider>
  );
};

export default ContactSalesFormWrapper;
