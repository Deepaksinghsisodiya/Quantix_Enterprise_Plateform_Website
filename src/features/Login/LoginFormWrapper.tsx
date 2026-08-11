// src/features/Login/LoginFormWrapper.tsx
import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useLoginMutation } from "./services/LoginServices";
import { setCredentials } from "@/redux/slices/authSlice";
import { SignInFormValues } from "./Types/LoginTypes";
import { LoginForm } from "./LoginForm";
import { loginValidationSchema } from "./validation/LoginValidation";
import { useAppDispatch } from "@/redux/hooks";

type LoginResponseLike = {
  data?: {
    token?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: unknown;
  };
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: unknown;
};

const initialValues: SignInFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const LoginFormWrapper: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik<SignInFormValues>({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login({
          username: values.email,
          password: values.password,
        }).unwrap();

        const responseData = response as LoginResponseLike;
        const rawData = responseData.data ?? responseData;
        const token = rawData.token || rawData.accessToken;
        const refreshToken = rawData.refreshToken;
        const user = rawData.user;

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
      } catch (err: unknown) {
        const error = err as { data?: { message?: string }; message?: string };
        const message = error?.data?.message || error?.message || "Failed to sign in. Please check your credentials.";
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
