
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9L21.5 11.5L14.5 14L12 21L9.5 14L2.5 11.5L9.5 9L12 2Z" fill="currentColor" />
  </svg>
);

const AboutUs: React.FC = () => {
  const { t } = useLanguage();
  const sectionBadgeClass =
    "inline-flex items-center justify-center px-7 sm:px-9 py-3 sm:py-3.5 bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white rounded-full text-sm sm:text-base font-black uppercase tracking-wide shadow-lg";

  return (
    <div className="relative">
      {/* Intro Section - GIỚI THIỆU */}
      <section id="about-intro" className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-20 px-4 md:px-8 overflow-hidden bg-[#FEF3E2]/25 dark:bg-[#0F1115]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e6332a]/10 text-[#e6332a] rounded-full text-xs sm:text-sm font-black tracking-tight shadow-sm">
                <span className="text-lg">🧡</span> {t.aboutPage.fptTag}
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#2D2926] dark:text-white leading-tight brand-font">
                {t.aboutPage.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-600 dark:text-stone-300 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                {t.aboutPage.description}
              </p>
            </div>
            
            <div className="relative flex justify-center mt-8 lg:mt-0">
               <div className="aspect-square w-full max-w-[320px] sm:max-w-md bg-gradient-to-br from-[#e6332a] to-[#f9b233] rounded-[2.5rem] sm:rounded-[4rem] flex items-center justify-center p-1 sm:p-1.5 shadow-2xl">
                  <div className="w-full h-full bg-white dark:bg-[#0F1115] rounded-[2.4rem] sm:rounded-[3.9rem] flex flex-col items-center justify-center p-6 md:p-10 text-center space-y-4 sm:space-y-8 relative overflow-hidden">
                     <div className="relative">
                        <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 xl:w-64 xl:h-64 bg-white dark:bg-[#1A1D24] rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center shadow-xl overflow-hidden border-2 sm:border-4 border-[#e6332a]/20 transition-transform hover:scale-105">
                           <img src="img/LOGO.png" alt="Milingo Logo" className="w-full h-full object-cover" />
                        </div>
                     </div>

                     <div className="space-y-1 sm:space-y-2 relative z-10">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D2926] dark:text-white brand-font uppercase tracking-tight">Milingo</h3>
                        <p className="text-stone-400 dark:text-stone-500 font-bold italic text-xs sm:text-base md:text-lg">"Ứng dụng học ngoại ngữ thông qua camera tích hợp AI"</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid Grid optimized for tablet */}
      <section id="about-team" className="py-16 sm:py-24 md:py-32 px-4 md:px-8 bg-white dark:bg-stone-900/10 overflow-hidden border-t border-stone-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4">
             <div className={sectionBadgeClass}>Đội ngũ phát triển</div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
            {t.aboutPage.members.map((member: any, idx: number) => (
              <div 
                key={idx} 
                className="group relative p-4 sm:p-8 xl:p-10 bg-white dark:bg-[#1A1D24] rounded-[1.5rem] sm:rounded-[3rem] border-2 border-stone-100 dark:border-white/5 hover:border-[#e6332a] transition-all duration-500 hover:-translate-y-2 shadow-sm"
              >
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-6 md:space-y-8">
                   <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#e6332a] to-[#f9b233] rounded-[1.2rem] sm:rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 z-10">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-full h-full object-cover rounded-[1rem] sm:rounded-[2.5rem] border-2 sm:border-4 border-white dark:border-[#1A1D24] shadow-xl transition-transform group-hover:scale-105"
                        />
                      </div>
                   </div>
                   
                   <div className="space-y-1 sm:space-y-3">
                      <h4 className="text-sm sm:text-xl lg:text-2xl font-black text-[#2D2926] dark:text-white brand-font leading-tight">{member.name}</h4>
                      <p className="inline-block px-2 sm:px-4 py-1 bg-stone-50 dark:bg-white/5 text-[#2D2926] dark:text-[#e6332a] font-black text-[7px] sm:text-[10px] md:text-xs rounded-full uppercase tracking-wider border border-stone-100 dark:border-white/5">
                        {member.role}
                      </p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Card Section */}
      <section className="py-12 md:py-20 relative overflow-hidden bg-[#FEF3E2]/25 dark:bg-[#0F1115]/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <div className={sectionBadgeClass}>Tầm nhìn &amp; Sứ mệnh</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
               {/* Vision Card */}
               <div className="group relative flex flex-col p-6 sm:p-10 xl:p-12 bg-white/60 dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2rem] sm:rounded-[3rem] border border-white dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
                    <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-3 bg-[#e6332a]/10 dark:bg-[#e6332a]/20 rounded-xl sm:rounded-2xl text-[#e6332a]">
                           <SparkleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h4 className="text-[#e6332a] font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] brand-font">
                          {t.visionMission.visionTitle}
                        </h4>
                    </div>
                    <p className="text-lg sm:text-2xl xl:text-3xl font-black text-[#2D2926] dark:text-white leading-tight brand-font flex-1">
                       {t.visionMission.visionText}
                    </p>
                    <div className="w-10 h-1 bg-[#e6332a] rounded-full group-hover:w-20 transition-all"></div>
                  </div>
               </div>

               {/* Mission Card */}
               <div className="group relative flex flex-col p-6 sm:p-10 xl:p-12 bg-white/60 dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2rem] sm:rounded-[3rem] border border-white dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
                    <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-3 bg-[#f9b233]/10 dark:bg-[#f9b233]/20 rounded-xl sm:rounded-2xl text-[#f9b233]">
                           <SparkleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h4 className="text-[#f9b233] font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] brand-font">
                          {t.visionMission.missionTitle}
                        </h4>
                    </div>
                    <p className="text-lg sm:text-2xl xl:text-3xl font-black brand-text-gradient leading-tight brand-font italic flex-1">
                       "{t.visionMission.missionText}"
                    </p>
                    <div className="w-10 h-1 bg-[#f9b233] rounded-full group-hover:w-20 transition-all self-end"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Responsive Video Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-[#FEF3E2]/15 dark:bg-[#0F1115]/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4 sm:mb-6">
            <div className={sectionBadgeClass}>TVC Video</div>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/ka2ExSKBwC8?autoplay=1&mute=1&playsinline=1&loop=1&playlist=ka2ExSKBwC8&rel=0"
              title="MiLingo Vision Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
