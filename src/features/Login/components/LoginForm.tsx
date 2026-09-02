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
    <div className="space-y-3 font-sans text-left">
      <ATMTextField
        name="email"
        type="email"
        label="Work Email"
        placeholder="Work Email"
        leftIcon={<Mail size={14} />}
        required
      />
      <ATMTextField
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        leftIcon={<Lock size={14} />}
        required
      />
      
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs pt-0.5">
        <ATMCheckbox name="remember" label="Remember this device" />
        <Link href="/forgot-password" className="font-semibold text-[#FF4D00] hover:text-[#E03E00] transition-colors">
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
          className="h-10 sm:h-10.5 bg-gradient-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#FF621F] hover:to-[#FF4D00] shadow-md shadow-orange-500/25 text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer"
          rightIcon={<ArrowRight size={15} className="stroke-[2.5]" />}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </ATMButton>
      </div>
    </div>
  );
};

export default LoginForm;
