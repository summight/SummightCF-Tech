
import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-cyan-400">Course Progress</span>
        <span className="text-sm font-medium text-cyan-400">{Math.round(safePercentage)}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safePercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
