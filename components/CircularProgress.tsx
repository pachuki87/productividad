
import React from 'react';
import { PRIMARY_GREEN } from '../constants';

interface CircularProgressProps {
  percentage: number;
  size?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, size = 100 }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90 transform">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-200"
          viewBox="0 0 100 100"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke={PRIMARY_GREEN}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
          viewBox="0 0 100 100"
        />
      </svg>
      <span className="absolute text-xl font-bold text-gray-700">{percentage}%</span>
    </div>
  );
};

export default CircularProgress;
