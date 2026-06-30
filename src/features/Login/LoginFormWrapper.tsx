// src/features/Login/LoginFormWrapper.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useLoginMutation } from "./Service/LoginService";
import { setCredentials } from "@/redux/slices/authSlice";
import { SignInFormValues } from "./Types/LoginTypes";
import { LoginForm } from "./LoginForm";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Username or email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValues: SignInFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const LoginFormWrapper: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik<SignInFormValues>({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login({
          username: values.email,
          password: values.password,
        }).unwrap();

        const rawData = (response as any)?.data || response;
        const token = rawData?.token || rawData?.accessToken || response?.token;
        const refreshToken = rawData?.refreshToken || response?.refreshToken;
        const user = rawData?.user || response?.user;

        if (token) {
          Cookies.set("accessToken", token, { expires: values.rememberMe ? 30 : 7 });
          if (refreshToken) {
            Cookies.set("refreshToken", refreshToken, { expires: values.rememberMe ? 30 : 7 });
          }
          dispatch(setCredentials({ token, refreshToken, user }));
          toast.success("Welcome back! Signed in successfully.");
          router.push("/");
        } else {
          toast.error("Failed to sign in. Server did not return a token.");
        }
      } catch (err: any) {
        const message = err?.data?.message || err?.message || "Failed to sign in. Please check your credentials.";
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
    <LoginForm
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

export default LoginFormWrapper;
