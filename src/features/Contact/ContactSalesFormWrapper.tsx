// src/features/Contact/ContactSalesFormWrapper.tsx
import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSubmitContactFormMutation } from "./services/ContactServices";
import { ContactSalesFormValues } from "./Types/ContactTypes";
import { ContactSalesForm } from "./ContactSalesForm";
import { contactSalesValidationSchema } from "./validation/ContactValidation";

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
        await submitContact({
          name: values.fullName,
          email: values.workEmail,
          phone: "",
          companyName: "",
          inquiryType: "General",
          message: values.message,
        }).unwrap();
        toast.success(
          "Message sent! Our team will reach out within 1 business day."
        );
        resetForm();
      } catch (err: unknown) {
        const message =
          (err as { data?: { message?: string } })?.data?.message ||
          "Failed to send message. Please try again.";
        toast.error(message);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    router.back();
  };

  return (
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
  );
};

export default ContactSalesFormWrapper;
