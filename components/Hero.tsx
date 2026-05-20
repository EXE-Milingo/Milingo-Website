
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9L21.5 11.5L14.5 14L12 21L9.5 14L2.5 11.5L9.5 9L12 2Z" fill="currentColor" />
  </svg>
);

const BlingIcon = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <SparkleIcon className="w-full h-full text-current opacity-80" />
    <SparkleIcon className="absolute top-0 left-0 w-full h-full text-current scale-50 opacity-25" />
  </div>
);

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-12 md:pb-24 xl:pb-32 px-4 md:px-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[5%] left-[5%] w-48 sm:w-64 h-48 sm:h-64 bg-[#f9b233]/10 rounded-full blur-[80px] sm:blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[20%] right-[5%] w-56 sm:w-72 h-56 sm:h-72 bg-[#e6332a]/10 rounded-full blur-[80px] sm:blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] right-[10%] w-40 sm:w-56 h-40 sm:h-56 bg-[#f9b233]/15 rounded-full blur-[80px] sm:blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-t from-[#FEF3E2]/25 dark:from-[#0F1115] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
        
        {/* Left Column Content */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 text-center lg:text-left flex flex-col items-center lg:items-start">
          
          {/* BADGE - FIXED FOR MOBILE RESPONSIVE */}
          <div className="relative group w-full max-w-[280px] sm:max-w-md lg:max-w-sm mx-auto lg:mx-0">
            {/* Outer glow layer - subtle */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ef6a5c] via-[#f2b85a] to-[#FFEAD8] rounded-full blur-sm opacity-20"></div>
            
            <div className="relative overflow-hidden p-[1.5px] sm:p-[2px] bg-gradient-to-r from-[#ef6a5c] via-[#f2b85a] to-[#FFEAD8] rounded-full shadow-md">
              <div className="px-0.5 py-0.5 bg-white dark:bg-[#0F1115] rounded-full overflow-hidden">
                <div className="flex items-center whitespace-nowrap animate-marquee">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6">
                         <BlingIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#f9b233]" />
                         <span className="text-[8px] sm:text-xs md:text-sm font-black uppercase tracking-[0.18em] text-[#d85749] dark:text-[#ffb68e] py-1.5 sm:py-2">
                           {t.hero.badge}
                         </span>
                         <BlingIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#e6332a]" />
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-9xl font-black text-[#2D2926] dark:text-white leading-[1.05] tracking-tighter brand-font">
              {t.hero.title1} <br className="hidden md:block" />
              <span className="brand-text-gradient block md:inline">{t.hero.title2}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl font-medium opacity-90 mx-auto lg:mx-0 px-4 lg:px-0">
              {t.hero.desc}
            </p>
          </div>
          
          <div className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full px-6 lg:px-0">
            <button 
               onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
               className="group relative px-8 sm:px-12 py-3.5 sm:py-4.5 bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white rounded-[1.5rem] sm:rounded-[2rem] text-base sm:text-lg font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
              <span>{t.hero.btn1}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start pt-2 sm:pt-4">
             <div className="hidden">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-[#0F1115] bg-stone-100 dark:bg-stone-800 flex items-center justify-center shadow-md">
                    <span className="text-sm sm:text-lg">{['📸', '🗣️', '🌍'][i-1]}</span>
                  </div>
                ))}
             </div>
             <p className="hidden">
               Trải nghiệm học ngữ cảnh
             </p>
             <p className="hidden">
               Học ngôn ngữ theo ngữ cảnh thực tế
             </p>
          </div>
        </div>

        {/* Right Column Mockup Section */}
        <div className="relative mt-2 sm:mt-6 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative w-full lg:w-[800%] xl:w-[900%] animate-float lg:translate-x-16 xl:translate-x-24 origin-right">
            <img 
              src="img/mockup2.png" 
              alt="MiLingo Mockup" 
              className="w-full h-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.18)]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="lg:hidden flex justify-center w-full px-6">
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white rounded-[1.5rem] text-base font-black shadow-xl active:scale-95 transition-all flex items-center justify-center overflow-hidden w-full max-w-sm"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
            <span>{t.hero.btn1}</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
