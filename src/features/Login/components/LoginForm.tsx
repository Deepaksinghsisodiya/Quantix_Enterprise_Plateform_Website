import React from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { ATMTextField } from '@/components/atoms/ATMTextField';
import { ATMCheckbox } from '@/components/atoms/ATMCheckbox';
import { ATMButton } from '@/components/atoms/ATMButton';

interface LoginFormProps {
  loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ loading }) => {
  return (
    <>
      <ATMTextField
        name="email"
        type="email"
        label="Corporate Work Email"
        placeholder="Enter your enterprise work email"
        leftIcon={<Mail size={16} />}
      />
      <ATMTextField
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        leftIcon={<Lock size={16} />}
      />
      
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs">
        <ATMCheckbox name="remember" label="Remember this device" />
        <Link href="/forgot-password" className="font-bold text-primary hover:text-primary-light transition-colors">
          Forgot password?
        </Link>
      </div>

      <ATMButton
        type="submit"
        variant="form"
        size="form"
        fullWidth
        className="mt-4"
        isLoading={loading}
        disabled={loading}
        rightIcon={<ArrowRight size={16} />}
      >
        Sign In to Enterprise HQ
      </ATMButton>
    </>
  );
};

export default LoginForm;
