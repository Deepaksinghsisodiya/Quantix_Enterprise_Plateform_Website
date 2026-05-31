// src/features/Register/RegisterFormWrapper.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignupMutation } from "./Service/RegisterService";
import { SignUpFormValues } from "./Types/RegisterTypes";
import { RegisterForm } from "./RegisterForm";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid work email")
    .required("Work email is required"),
  company: Yup.string()
    .required("Company name is required"),
  businessType: Yup.string()
    .required("Business type is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValues: SignUpFormValues = {
  name: "",
  email: "",
  company: "",
  businessType: "",
  password: "",
};

export const RegisterFormWrapper: React.FC = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const formik = useFormik<SignUpFormValues>({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await signup({
          merchantType: "Standalone",
          companyName: values.company,
          contactName: values.name,
          contactEmail: values.email,
          contactPhone: "",
          country: "United States",
          planId: null,
          billingCycle: "Monthly",
        }).unwrap();

        const merchantId = res?.data?.leadId || res?.data?.merchantId || res?.leadId || res?.merchantId;

        toast.success("Account registration initiated successfully! Please verify your email to continue.");
        if (merchantId) {
          router.push(`/sign-up/verify?id=${merchantId}`);
        } else {
          router.push("/sign-in");
        }
      } catch (err: any) {
        const message = err?.data?.message || err?.message || "Failed to register. Please check details and try again.";
        toast.error(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    router.back();
  };

  return (
    <RegisterForm
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

export default RegisterFormWrapper;
