// src/features/Integrations/components/IntegrationCardSkeleton.tsx
import React from 'react';

export const IntegrationCardSkeleton: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between h-48 space-y-4 animate-pulse">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-5 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
          <div className="h-3.5 w-4/5 rounded bg-slate-100 dark:bg-slate-800/60" />
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default IntegrationCardSkeleton;
