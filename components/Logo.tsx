import React from 'react';

const Logo: React.FC<{ className?: string; withText?: boolean }> = ({ className = "w-10 h-10", withText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#73CED5" />
            <stop offset="100%" stopColor="#AF86FF" />
          </linearGradient>
        </defs>
        {/* The wavy 'M' shape */}
        <path 
          d="M15 65 C 25 20, 45 20, 50 45 C 55 70, 75 70, 85 25" 
          stroke="url(#logoGradient)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Smiling dots/crescent */}
        <circle cx="45" cy="35" r="4" fill="#73CED5" opacity="0.8" />
        <path d="M52 35 Q 56 31, 60 35" stroke="#AF86FF" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
      {withText && (
        <span className="text-2xl font-bold tracking-tight text-[#2D3277] dark:text-white brand-font uppercase transition-colors">
          MiLingo
        </span>
      )}
    </div>
  );
};

export default Logo;