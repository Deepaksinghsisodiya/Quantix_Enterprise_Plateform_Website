// src/features/Profile/Form/ChangePasswordForm.tsx
'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import { Lock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { ATMTextField } from '@/components/atoms/ATMTextField';
import { ATMButton } from '@/components/atoms/ATMButton';
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
      {({ values, errors, touched }) => (
        <Form className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <ShieldAlert size={15} className="text-[#FF4D00] shrink-0 mt-0.5" />
            <span>Enter the temporary password given by your Admin, then choose a strong new permanent password.</span>
          </div>

          <ATMTextField
            name="currentPassword"
            type="password"
            label="Current Temporary Password"
            placeholder="Enter temporary password"
            leftIcon={<Lock size={14} />}
            required
          />

          <ATMTextField
            name="newPassword"
            type="password"
            label="New Permanent Password"
            placeholder="Min. 8 characters (A-Z, 0-9, @#$)"
            leftIcon={<Lock size={14} />}
            required
          />

          <ATMTextField
            name="confirmPassword"
            type="password"
            label="Confirm New Password"
            placeholder="Re-type new password"
            leftIcon={<Lock size={14} />}
            required
          />

          {/* Password Strength Checklist */}
          <div className="p-3 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Security Requirements</div>
            <div className="grid grid-cols-2 gap-1 text-[10.5px]">
              <div className={`flex items-center gap-1.5 ${values.newPassword.length >= 8 ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 size={12} className={values.newPassword.length >= 8 ? 'text-emerald-500' : 'text-slate-300'} />
                <span>8+ Characters</span>
              </div>
              <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(values.newPassword) ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 size={12} className={/[A-Z]/.test(values.newPassword) ? 'text-emerald-500' : 'text-slate-300'} />
                <span>1 Uppercase (A-Z)</span>
              </div>
              <div className={`flex items-center gap-1.5 ${/[0-9]/.test(values.newPassword) ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 size={12} className={/[0-9]/.test(values.newPassword) ? 'text-emerald-500' : 'text-slate-300'} />
                <span>1 Number (0-9)</span>
              </div>
              <div className={`flex items-center gap-1.5 ${/[^A-Za-z0-9]/.test(values.newPassword) ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 size={12} className={/[^A-Za-z0-9]/.test(values.newPassword) ? 'text-emerald-500' : 'text-slate-300'} />
                <span>1 Special (@#$)</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <ATMButton
              type="submit"
              variant="form"
              fullWidth
              size="form"
              isLoading={isLoading}
              className="bg-[#FF4D00] hover:bg-[#E03E00]"
            >
              Update & Secure Password
            </ATMButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
