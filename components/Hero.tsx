import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-32 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden max-w-full relative">
      {/* Cute Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#FFE5A3] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-10 w-40 h-40 bg-[#FFD6E0] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-[#C3E2C2] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8 max-w-2xl text-center lg:text-left mx-auto lg:mx-0 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1D24] text-[#2D3277] dark:text-[#73CED5] rounded-full text-xs font-black uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-700 shadow-sm border border-[#73CED5]/20 hover:scale-105 transition-transform cursor-default">
            <span className="text-base">✨</span> {t.hero.badge}
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#2D3277] dark:text-white leading-[1] md:leading-[1] tracking-tighter transition-colors brand-font">
            {t.hero.title1} <br/>
            <span className="relative inline-block mt-2">
               <span className="relative z-10 brand-text-gradient">{t.hero.title2}</span>
               <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#FFD6E0] dark:text-[#2D3277] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
               </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-lg mx-auto lg:mx-0 transition-colors font-medium">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 w-full sm:w-auto">
            <button 
               onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-8 py-5 bg-[#2D3277] text-white rounded-[2rem] text-lg font-bold hover:bg-[#3D44A6] shadow-[0_10px_30px_rgba(45,50,119,0.3)] dark:shadow-none transition-all hover:scale-105 active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              <span>{t.hero.btn1}</span>
              <span className="group-hover:rotate-12 transition-transform">👉</span>
            </button>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-5 bg-white dark:bg-[#1A1D24] text-[#2D3277] dark:text-white border-2 border-stone-100 dark:border-stone-700 rounded-[2rem] text-lg font-bold hover:border-[#73CED5] hover:text-[#73CED5] transition-all active:scale-95 w-full sm:w-auto hover:shadow-lg"
            >
              {t.hero.btn2}
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 text-sm font-bold text-stone-400">
             <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FFD6E0] flex items-center justify-center border-2 border-white text-lg">🐱</div>
                <div className="w-10 h-10 rounded-full bg-[#C3E2C2] flex items-center justify-center border-2 border-white text-lg">🐶</div>
                <div className="w-10 h-10 rounded-full bg-[#E2C2C6] flex items-center justify-center border-2 border-white text-lg">🦊</div>
             </div>
             <p>Loved by language learners</p>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0 px-4 sm:px-0">
          <div className="relative w-full max-w-[320px] md:max-w-[400px] perspective-1000">
            {/* Phone Container - Cute Style */}
            <div className="relative z-10 bg-black rounded-[3rem] p-3 shadow-[0_25px_60px_-15px_rgba(45,50,119,0.4)] transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 ring-8 ring-[#2D3277]/10 dark:ring-white/10">
               {/* Screen */}
               <div className="relative rounded-[2.5rem] overflow-hidden aspect-[9/19] bg-stone-900 border-4 border-black">
                 <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop" 
                    alt="Cafe vibe" 
                    className="w-full h-full object-cover"
                 />
                 
                 {/* UI Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60">
                    <div className="absolute top-6 left-0 right-0 flex justify-center">
                        <div className="w-20 h-6 bg-black/30 backdrop-blur-md rounded-full"></div>
                    </div>

                    {/* Focus Corners */}
                    <div className="absolute inset-8 border-2 border-white/40 rounded-[2rem] opacity-70">
                       <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#FF5C8D] rounded-tl-xl -mt-1 -ml-1"></div>
                       <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#FF5C8D] rounded-tr-xl -mt-1 -mr-1"></div>
                       <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#FF5C8D] rounded-bl-xl -mb-1 -ml-1"></div>
                       <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#FF5C8D] rounded-br-xl -mb-1 -mr-1"></div>
                    </div>

                    {/* Result Pop-up */}
                    <div className="absolute bottom-10 left-4 right-4">
                       <div className="bg-white/95 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl animate-bounce-slight border-2 border-white">
                          <div className="flex justify-between items-start mb-2">
                             <div>
                                <h3 className="text-2xl font-black text-[#2D3277] brand-font">Espresso</h3>
                                <p className="text-xs font-bold text-[#FF5C8D] uppercase tracking-wider">Italian • Italiano</p>
                             </div>
                             <div className="text-3xl">☕️</div>
                          </div>
                          <p className="text-sm font-medium text-stone-600 leading-snug">
                            "Un caffè per iniziare la giornata."
                          </p>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 -right-8 bg-white dark:bg-[#2D3277] p-4 rounded-3xl shadow-xl animate-float z-20 rotate-6">
               <span className="text-3xl">🥐</span>
            </div>
            <div className="absolute bottom-32 -left-8 bg-white dark:bg-[#2D3277] p-4 rounded-3xl shadow-xl animate-float animation-delay-1000 z-20 -rotate-6">
               <span className="text-3xl">🇮🇹</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;