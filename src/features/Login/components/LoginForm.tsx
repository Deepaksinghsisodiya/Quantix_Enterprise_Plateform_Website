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
    <div className="space-y-3.5">
      <ATMTextField
        name="email"
        type="email"
        label="Corporate Work Email"
        placeholder="name@company.com"
        leftIcon={<Mail size={15} />}
      />
      <ATMTextField
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        leftIcon={<Lock size={15} />}
      />
      
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs pt-0.5">
        <ATMCheckbox name="remember" label="Remember this device" />
        <Link href="/forgot-password" className="font-bold text-primary hover:text-primary-light transition-colors">
          Forgot password?
        </Link>
      </div>

      <div className="pt-2">
        <ATMButton
          type="submit"
          variant="form"
          size="form"
          fullWidth
          isLoading={loading}
          disabled={loading}
          className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-md shadow-red-600/30"
          rightIcon={<ArrowRight size={15} className="stroke-[2.5]" />}
        >
          Sign In to Enterprise HQ
        </ATMButton>
      </div>
    </div>
  );
};

export default LoginForm;
