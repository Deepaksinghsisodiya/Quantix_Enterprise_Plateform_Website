// src/features/Register/RegisterFormWrapper.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignupMutation, useValidateSignupMutation } from "./Service/RegisterService";
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
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
  phone: Yup.string()
    .matches(/^[+\d][\d\s().-]{6,20}$/, "Please enter a valid phone number")
    .required("Contact phone is required"),
  country: Yup.string()
    .required("Country is required"),
  merchantType: Yup.string()
    .oneOf(["Enterprise", "Standalone"], "Please select a valid merchant type")
    .required("Merchant type is required"),
  billingCycle: Yup.string()
    .oneOf(["Daily", "Monthly", "Annual"], "Please select a valid billing cycle")
    .required("Billing cycle is required"),
});

const initialValues: SignUpFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "United States",
  merchantType: "Enterprise",
  planId: "",
  billingCycle: "Monthly",
};

const extractMerchantId = (res: any) =>
  res?.data?.merchantId ||
  res?.data?.leadId ||
  res?.data?.id ||
  res?.merchantId ||
  res?.leadId ||
  res?.id;

const isValidationRejected = (res: any) => {
  const data = res?.data ?? res;
  const validity = data?.isValid ?? data?.valid ?? data?.available;
  return validity === false;
};

const getApiMessage = (payload: any, fallback: string) =>
  payload?.data?.message ||
  payload?.message ||
  payload?.data?.errors?.[0] ||
  payload?.errors?.[0] ||
  fallback;

export const RegisterFormWrapper: React.FC = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const [validateSignup, { isLoading: isValidating }] = useValidateSignupMutation();

  const formik = useFormik<SignUpFormValues>({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        const cleaned = {
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          company: values.company.trim(),
          phone: values.phone.trim(),
          country: values.country.trim(),
        };

        const validation = await validateSignup({
          email: cleaned.email,
          companyName: cleaned.company,
        }).unwrap();

        if (isValidationRejected(validation)) {
          const message = getApiMessage(validation, "This email or company is already registered.");
          setFieldError("email", message);
          toast.error(message);
          return;
        }

        const res = await signup({
          merchantType: values.merchantType,
          companyName: cleaned.company,
          contactName: cleaned.name,
          contactEmail: cleaned.email,
          contactPhone: cleaned.phone,
          country: cleaned.country,
          planId: values.planId || null,
          billingCycle: values.billingCycle,
        }).unwrap();

        const merchantId = extractMerchantId(res);

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
      isLoading={isLoading || isValidating}
      onCancel={handleCancel}
    />
  );
};

export default RegisterFormWrapper;
