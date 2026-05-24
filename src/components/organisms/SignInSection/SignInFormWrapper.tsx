// src/components/organisms/SignInSection/SignInFormWrapper.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignInForm, type SignInFormValues } from "./SignInForm";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid work email")
    .required("Work email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValues: SignInFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const SignInFormWrapper: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<SignInFormValues>({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true);
        // Simulate API check
        await new Promise((resolve) => setTimeout(resolve, 1200));
        toast.success("Welcome back! Signed in successfully.");
        router.push("/");
      } catch (err) {
        toast.error("Failed to sign in. Please check your credentials.");
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
    <SignInForm
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

export default SignInFormWrapper;
