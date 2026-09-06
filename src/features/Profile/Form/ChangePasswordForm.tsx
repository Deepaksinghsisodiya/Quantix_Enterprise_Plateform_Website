// src/features/Profile/Form/ChangePasswordForm.tsx
'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import { Lock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { ATMTextField, ATMButton } from '@/components/atoms';
import { ChangePasswordValidationSchema } from '../validation/ChangePasswordValidation';
import { INITIAL_CHANGE_PASSWORD_VALUES } from '../Constants/ProfileConstants';
import { ChangePasswordFormValues } from '../Types/ProfileTypes';
import { useChangePasswordMutation } from '../Service/ProfileService';
import { parseApiError } from '@/lib/errorHandler';

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSuccess }) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (values: ChangePasswordFormValues, { resetForm }: any) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();

      toast.success('Password updated successfully! Your account is now secured.');
      resetForm();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      const errorMsg = parseApiError(err, 'Failed to update password. Please check your current password.');
      toast.error(errorMsg);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_CHANGE_PASSWORD_VALUES}
      validationSchema={ChangePasswordValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="space-y-2">
          <div className="bg-amber-500/10 dark:bg-amber-500/15 py-1.5 px-2.5 rounded-xl border border-amber-500/20 text-[10px] sm:text-[10.5px] text-amber-800 dark:text-amber-200 flex items-start gap-1.5">
            <ShieldAlert size={13} className="text-[#FF4D00] shrink-0 mt-0.5" />
            <span className="leading-tight">
              Enter your current password and choose a strong new password to protect your account.
            </span>
          </div>

          <ATMTextField
            name="currentPassword"
            type="password"
            label="Current Password"
            placeholder="Enter current password"
            leftIcon={<Lock size={13} />}
            className="h-9 sm:h-9.5 text-xs"
            required
          />

          <ATMTextField
            name="newPassword"
            type="password"
            label="New Password"
            placeholder="Min. 8 chars (A-Z, 0-9, @#$)"
            leftIcon={<Lock size={13} />}
            className="h-9 sm:h-9.5 text-xs"
            required
          />

          <ATMTextField
            name="confirmPassword"
            type="password"
            label="Confirm New Password"
            placeholder="Re-type new password"
            leftIcon={<Lock size={13} />}
            className="h-9 sm:h-9.5 text-xs"
            required
          />

          {/* Password Strength Checklist */}
          <div className="py-1.5 px-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800 space-y-1">
            <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Password Requirements
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9.5px] sm:text-[10px]">
              <div className={`flex items-center gap-1.5 ${values.newPassword.length >= 8 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                <CheckCircle2 size={11} className={values.newPassword.length >= 8 ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'} />
                <span>8+ Characters</span>
              </div>
              <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(values.newPassword) ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                <CheckCircle2 size={11} className={/[A-Z]/.test(values.newPassword) ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'} />
                <span>1 Uppercase (A-Z)</span>
              </div>
              <div className={`flex items-center gap-1.5 ${/[0-9]/.test(values.newPassword) ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                <CheckCircle2 size={11} className={/[0-9]/.test(values.newPassword) ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'} />
                <span>1 Number (0-9)</span>
              </div>
              <div className={`flex items-center gap-1.5 ${/[^A-Za-z0-9]/.test(values.newPassword) ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                <CheckCircle2 size={11} className={/[^A-Za-z0-9]/.test(values.newPassword) ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'} />
                <span>1 Special (@#$)</span>
              </div>
            </div>
          </div>

          <div className="pt-0.5">
            <ATMButton
              type="submit"
              variant="form"
              fullWidth
              size="form"
              isLoading={isLoading}
              loadingText="Updating..."
            >
              Update Password
            </ATMButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
