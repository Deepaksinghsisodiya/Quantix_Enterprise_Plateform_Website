// src/components/organisms/ContactSalesSection/ContactSalesFormWrapper.tsx

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSubmitContactFormMutation } from "@/redux/services/contactApi";
import {
    ContactSalesForm,
    type ContactSalesFormValues,
} from "./ContactSalesForm";

// ─── Yup Validation Schema ────────────────────────────────────────────────────

const contactSchema = Yup.object<ContactSalesFormValues>({
    fullName: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Full name is required"),

    workEmail: Yup.string()
        .email("Please enter a valid work email")
        .required("Work email is required"),

    message: Yup.string()
        .min(20, "Message must be at least 20 characters")
        .max(1000, "Message cannot exceed 1000 characters")
        .required("Message is required"),
});

// ─── Initial Values ───────────────────────────────────────────────────────────

const initialValues: ContactSalesFormValues = {
    fullName: "",
    workEmail: "",
    message: "",
};

// ─── Wrapper Component ────────────────────────────────────────────────────────

export const ContactSalesFormWrapper: React.FC = () => {
    const router = useRouter();
    const [submitContact, { isLoading }] = useSubmitContactFormMutation();

    // ── Formik ──────────────────────────────────────────────────────────────────

    const formik = useFormik<ContactSalesFormValues>({
        initialValues,
        validationSchema: contactSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await submitContact(values).unwrap();
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

    // ── Handlers ─────────────────────────────────────────────────────────────────

    const handleCancel = () => {
        formik.resetForm();
        router.back(); // cancel pe
    };

    // ── Render (only the dumb component — zero layout JSX here) ─────────────────

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