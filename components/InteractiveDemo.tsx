import React, { useState, useRef } from 'react';
import { analyzeImageForLanguage, generateSpeech } from '../services/geminiService';
import { MilingoResult, SUPPORTED_LANGUAGES, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useLibrary } from '../contexts/LibraryContext';
import { useUI } from '../contexts/UIContext';

// Audio Utility Functions
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const InteractiveDemo: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addItem } = useLibrary();
  const { openAuth } = useUI();
  
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Audio states
  const [playingKeyword, setPlayingKeyword] = useState(false);
  const [playingSentence, setPlayingSentence] = useState(false);
  
  // Save state
  const [isSaved, setIsSaved] = useState(false);

  const [result, setResult] = useState<MilingoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<Language>(SUPPORTED_LANGUAGES.find(l => l.id === 'en') || SUPPORTED_LANGUAGES[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleAnalysis = async (base64: string, lang: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setIsSaved(false);
    try {
      const data = await analyzeImageForLanguage(base64, lang);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("AI analysis failed. Please try a different photo.");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (text: string, setPlayingState: (isPlaying: boolean) => void) => {
    if (playingKeyword || playingSentence) return;
    
    setPlayingState(true);
    try {
      const base64Audio = await generateSpeech(text);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const audioBuffer = await decodeAudioData(
        decodeBase64(base64Audio),
        ctx,
        24000,
        1
      );
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setPlayingState(false);
      source.start();
    } catch (err) {
      console.error("Audio playback error:", err);
      setPlayingState(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    
    if (!user) {
        openAuth();
        return;
    }
    
    addItem(result, selectedLang.id);
    setIsSaved(true);
    // Simulate a brief delay to show the success state
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fullBase64 = event.target?.result as string;
      const base64Data = fullBase64.split(',')[1];
      setImage(fullBase64);
      handleAnalysis(base64Data, selectedLang.promptName);
    };
    reader.readAsDataURL(file);
  };

  const changeLanguage = (lang: Language) => {
    setSelectedLang(lang);
    if (image) {
      const base64Data = image.split(',')[1];
      handleAnalysis(base64Data, lang.promptName);
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 px-4 md:px-6 bg-[#E8F8F9] dark:bg-[#0F1115] overflow-hidden transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 space-y-4">
           <div className="inline-block px-4 py-2 bg-[#73CED5] text-white rounded-full text-sm font-black uppercase tracking-wider mb-2 -rotate-1 shadow-sm">
             Magic Demo
           </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#2D3277] dark:text-[#A5A9E8] brand-font">{t.demo.title}</h2>
          <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto font-medium">
            {t.demo.desc}
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          {SUPPORTED_LANGUAGES.filter(l => l.id !== 'vi').map((lang) => (
            <button
              key={lang.id}
              onClick={() => changeLanguage(lang)}
              className={`flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 rounded-[2rem] border-b-4 transition-all font-bold text-sm md:text-base ${
                selectedLang.id === lang.id
                  ? 'border-[#2D3277] bg-[#73CED5] text-white shadow-lg translate-y-1'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1A1D24] text-stone-500 dark:text-stone-400 hover:border-[#73CED5] hover:-translate-y-1'
              }`}
            >
              <span className="text-xl md:text-2xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Upload Area */}
          <div className="space-y-6">
            <div 
              className="group relative aspect-[4/3] w-full border-4 border-dashed border-[#73CED5]/30 dark:border-white/20 rounded-[3rem] flex flex-col items-center justify-center hover:border-[#73CED5] hover:bg-[#F0FBFC] dark:hover:bg-[#73CED5]/5 transition-all cursor-pointer bg-white dark:bg-[#1A1D24] overflow-hidden shadow-sm active:scale-[0.99]"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Upload preview" className="w-full h-full object-cover rounded-[2.5rem]" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-8 py-4 bg-white/95 backdrop-blur-md rounded-full text-base font-black text-[#2D3277] shadow-xl border-2 border-white transform scale-110">Change Photo 📸</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 md:p-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-[#E8F8F9] dark:bg-[#252830] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 shadow-md transition-all group-hover:rotate-6">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-[#73CED5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[#2D3277] dark:text-white font-black text-xl md:text-2xl transition-colors">{t.demo.upload}</p>
                  <p className="text-stone-400 dark:text-stone-500 font-bold mt-2">{t.demo.hint}</p>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            {error && <p className="text-red-500 text-sm text-center font-bold bg-red-100 border-2 border-red-200 py-3 rounded-2xl animate-bounce">{error}</p>}
          </div>

          {/* Results Area */}
          <div className="space-y-8 min-h-[300px] md:min-h-[400px]">
            {loading && (
               <div className="h-full min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center space-y-8 bg-white dark:bg-[#1A1D24] rounded-[3rem] border-4 border-white dark:border-stone-800 shadow-xl overflow-hidden relative group">
                
                {/* Background Ambient Effects */}
                <div className="absolute inset-0 pointer-events-none">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#73CED5]/20 to-[#AF86FF]/20 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center">
                     {/* Outer Spinning Ring */}
                     <div className="absolute inset-0 border-[6px] border-[#73CED5]/20 rounded-full"></div>
                     <div className="absolute inset-0 border-[6px] border-t-[#73CED5] border-r-[#AF86FF] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                     
                     {/* Floating Logo Icon */}
                     <div className="w-12 h-12 md:w-16 md:h-16 animate-[bounce_1s_infinite]">
                        <span className="text-5xl">✨</span>
                     </div>
                  </div>

                  <div className="text-center space-y-3 px-4 mt-6">
                    <h3 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#2D3277] to-[#AF86FF] animate-pulse">
                      {t.demo.analyzing}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 font-bold text-sm md:text-base max-w-xs mx-auto animate-pulse">
                      {t.demo.loadingSubtext}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!loading && !result && !image && (
              <div className="h-full min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center text-center p-8 md:p-12 border-4 border-dashed border-[#E8F8F9] dark:border-white/10 rounded-[3rem] bg-white/50 dark:bg-[#1A1D24]/50 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 text-[#E2C2C6] dark:text-stone-700 mb-6 transition-colors animate-pulse">
                   <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p className="text-stone-400 dark:text-stone-500 font-bold text-lg md:text-xl leading-relaxed max-w-xs transition-colors">
                  {t.demo.placeholder}
                </p>
              </div>
            )}

            {!loading && result && (
              <div className="bg-white dark:bg-[#1A1D24] text-stone-900 dark:text-white p-6 md:p-10 rounded-[3rem] shadow-[0_25px_50px_rgba(0,0,0,0.08)] dark:shadow-none border-4 border-white dark:border-stone-800 space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="inline-block px-4 py-1.5 bg-[#F2F0FF] dark:bg-purple-900/30 text-[#7E57C2] dark:text-[#AF86FF] text-xs font-black rounded-full uppercase tracking-widest mb-4">
                      {t.demo.keyword} ({selectedLang.name})
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#2D3277] dark:text-white break-words hyphens-auto brand-font">{result.keyword}</h3>
                      <button 
                        onClick={() => playAudio(result.keyword, setPlayingKeyword)}
                        disabled={playingKeyword || playingSentence}
                        className={`p-3 md:p-4 rounded-2xl bg-[#F0FBFC] dark:bg-[#252830] text-[#7E57C2] dark:text-[#AF86FF] hover:bg-[#73CED5] hover:text-white transition-all flex items-center justify-center shadow-sm flex-shrink-0 ${playingKeyword ? 'animate-bounce opacity-50' : 'hover:scale-110 active:scale-95'}`}
                      >
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                      </button>
                    </div>
                    <div className="mt-3 flex items-baseline gap-4">
                      <span className="text-stone-400 dark:text-stone-400 text-lg md:text-2xl font-bold font-mono bg-stone-50 dark:bg-stone-800 px-3 py-1 rounded-lg">{result.pronunciation}</span>
                    </div>
                    <p className="text-2xl md:text-3xl text-stone-600 dark:text-stone-300 mt-4 font-bold">{result.translation}</p>
                  </div>
                  <div className="text-5xl md:text-6xl drop-shadow-md flex-shrink-0 animate-bounce-slight">{selectedLang.flag}</div>
                </div>

                <div className="h-1 bg-stone-100 dark:bg-white/10 rounded-full w-full"></div>

                <div className="space-y-4">
                  <div className="inline-block px-4 py-1.5 bg-[#E8F8F9] dark:bg-teal-900/30 text-[#4AA9B3] dark:text-[#73CED5] text-xs font-black rounded-full uppercase tracking-widest">
                    {t.demo.sentence}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-[#2D3277] dark:text-[#A5A9E8]">"{result.sentence}"</p>
                        <button
                            onClick={() => playAudio(result.sentence, setPlayingSentence)}
                            disabled={playingKeyword || playingSentence}
                            className={`p-2 rounded-full bg-stone-100 dark:bg-[#252830] text-[#7E57C2] dark:text-[#AF86FF] hover:bg-[#AF86FF] hover:text-white transition-all flex-shrink-0 mt-1 ${playingSentence ? 'animate-bounce opacity-50' : 'hover:scale-110 active:scale-95'}`}
                            title="Listen to sentence"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        </button>
                    </div>
                    <div className="p-4 bg-[#F8F7F4] dark:bg-[#252830] rounded-2xl border-l-4 border-[#73CED5]">
                        <p className="text-lg md:text-xl text-stone-500 dark:text-stone-300 italic font-medium">{result.sentenceTranslation}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 md:pt-6">
                  <button 
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`w-full py-5 rounded-[2rem] font-black text-lg md:text-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                      isSaved 
                      ? 'bg-green-400 text-white shadow-none transform scale-95' 
                      : 'bg-[#2D3277] text-white hover:bg-[#3D44A6] shadow-[0_15px_35px_rgba(45,50,119,0.25)] dark:shadow-none hover:-translate-y-1'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <svg className="w-6 h-6 md:w-8 md:h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        <span>{t.demo.save.includes('Lưu') ? 'Đã lưu!' : 'Saved!'}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        <span>{t.demo.save.replace('{lang}', selectedLang.name)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;