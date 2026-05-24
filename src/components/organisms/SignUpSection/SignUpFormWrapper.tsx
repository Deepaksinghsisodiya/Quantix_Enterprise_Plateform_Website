// src/components/organisms/SignUpSection/SignUpFormWrapper.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignUpForm, type SignUpFormValues } from "./SignUpForm";

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

export const SignUpFormWrapper: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<SignUpFormValues>({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true);
        // Simulate registration delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Account created successfully! Welcome to Quantix.");
        router.push("/sign-in");
      } catch (err) {
        toast.error("Failed to register. Please check details and try again.");
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    router.back();
  };

  return (
    <SignUpForm
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

export default SignUpFormWrapper;
