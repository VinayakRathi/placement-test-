import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label }) => {
  const percentage = Math.min(Math.max((current / max) * 100, 0), 100);
  
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1 text-xs font-mono uppercase tracking-wider text-emerald-400">
        <span>{label}</span>
        <span>{current} / {max}</span>
      </div>
      <div className="h-3 w-full bg-black/40 border border-emerald-900/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
