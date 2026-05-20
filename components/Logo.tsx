
import React from 'react';

const Logo: React.FC<{ className?: string; withText?: boolean }> = ({ className = "", withText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className.includes('mx-auto') ? 'justify-center' : ''} ${className}`}>
      <img src="img/LOGO.png" alt="MiLingo Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
      {withText && (
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#2D2926] dark:text-white brand-font uppercase transition-colors whitespace-nowrap">
          MiLingo
        </span>
      )}
    </div>
  );
};

export default Logo;
