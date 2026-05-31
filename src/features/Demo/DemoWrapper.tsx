// src/features/Demo/DemoWrapper.tsx
import React from 'react';
import { toast } from 'sonner';
import { useGetDemoMediaQuery } from './Service/DemoService';
import { useSubscribeNewsletterMutation } from '@/features/Contact/Service/ContactService';
import DemoSection from './DemoSection';

export const DemoWrapper: React.FC = () => {
  const { data: demoMedia } = useGetDemoMediaQuery();
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubscribeNewsletter = async (email: string) => {
    try {
      await subscribeNewsletter({ email }).unwrap();
      toast.success("We’ll let you know when more demos are live!");
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <DemoSection 
      demoMedia={demoMedia} 
      onSubscribeNewsletter={handleSubscribeNewsletter}
      isSubmittingNewsletter={isLoading}
    />
  );
};

export default DemoWrapper;
