// src/features/Register/RegisterFormWrapper.tsx
import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignupMutation, useValidateSignupMutation } from "./services/RegisterServices";
import { SignUpFormValues } from "./Types/RegisterTypes";
import { RegisterForm } from "./RegisterForm";
import { registerValidationSchema } from "./validation/RegisterValidation";

type SignupResponseLike = {
  data?: {
    merchantId?: string;
    leadId?: string;
    id?: string;
    message?: string;
    errors?: string[];
  };
  merchantId?: string;
  leadId?: string;
  id?: string;
  message?: string;
  errors?: string[];
};

type ValidationResponseLike = {
  data?: {
    isValid?: boolean;
    valid?: boolean;
    available?: boolean;
    message?: string;
    errors?: string[];
  };
  isValid?: boolean;
  valid?: boolean;
  available?: boolean;
  message?: string;
  errors?: string[];
};

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

const extractMerchantId = (res: SignupResponseLike) =>
  res?.data?.merchantId ||
  res?.data?.leadId ||
  res?.data?.id ||
  res?.merchantId ||
  res?.leadId ||
  res?.id;

const isValidationRejected = (res: ValidationResponseLike) => {
  const data = res?.data ?? res;
  const validity = data?.isValid ?? data?.valid ?? data?.available;
  return validity === false;
};

const getApiMessage = (payload: ValidationResponseLike | SignupResponseLike, fallback: string) =>
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
    validationSchema: registerValidationSchema,
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
      } catch (err: unknown) {
        const error = err as { data?: { message?: string }; message?: string };
        const message = error?.data?.message || error?.message || "Failed to register. Please check details and try again.";
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
