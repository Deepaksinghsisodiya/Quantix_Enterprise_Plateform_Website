import * as Yup from "yup";

// Helper error messages
const requiredMsg = (field: string) => `${field} is required`;
const emailMsg = "Please enter a valid email address";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email(emailMsg)
    .required(requiredMsg("Email")),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required(requiredMsg("Password")),
});

export const registerStep1Schema = Yup.object({
  fullName: Yup.string().required(requiredMsg("Full name")),
  email: Yup.string().email(emailMsg).required(requiredMsg("Email")),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required(requiredMsg("Password")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(requiredMsg("Confirm password")),
});

export const registerStep2Schema = Yup.object({
  businessName: Yup.string().required(requiredMsg("Business name")),
  industry: Yup.string().required(requiredMsg("Industry")),
  numberOfLocations: Yup.string().required(requiredMsg("Number of locations")),
  phone: Yup.string().required(requiredMsg("Phone number")),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email(emailMsg).required(requiredMsg("Email")),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required(requiredMsg("Password")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(requiredMsg("Confirm password")),
});
