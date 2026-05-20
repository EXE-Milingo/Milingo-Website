
import React, { useState, useRef, useEffect } from 'react';
import { analyzeImageForLanguage, generateSpeech, generateConversation, ConversationLine } from '../services/geminiService';
import { MilingoResult, SUPPORTED_LANGUAGES, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t, currentLang } = useLanguage();
  
  // States
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoTargetLang, setDemoTargetLang] = useState<Language>(
      SUPPORTED_LANGUAGES.find(l => l.id === 'en') || SUPPORTED_LANGUAGES[1]
  );
  
  // Result states
  const [result, setResult] = useState<MilingoResult | null>(null);
  const [conversation, setConversation] = useState<ConversationLine[] | null>(null);
  const [loadingConv, setLoadingConv] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio states
  const [playingKeyword, setPlayingKeyword] = useState(false);
  const [playingSentence, setPlayingSentence] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleAnalysis = async (base64: string, targetLangPrompt: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setConversation(null);
    try {
      const data = await analyzeImageForLanguage(base64, targetLangPrompt);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("AI analysis failed. Please try a different photo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentLang !== 'vi') {
      const match = SUPPORTED_LANGUAGES.find(l => l.id === currentLang);
      if (match && match.id !== demoTargetLang.id) {
        setDemoTargetLang(match);
        if (image) {
          const base64Data = image.split(',')[1];
          handleAnalysis(base64Data, match.promptName);
        }
      }
    }
  }, [currentLang]);

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === keyword.toLowerCase() 
            ? <span key={i} className="text-[#73CED5] dark:text-[#AF86FF] font-black underline decoration-2 underline-offset-4">{part}</span> 
            : part
        )}
      </>
    );
  };

  const handleGenerateConversation = async () => {
    if (!result || loadingConv) return;
    setLoadingConv(true);
    try {
        const conv = await generateConversation(result.keyword, demoTargetLang.promptName);
        setConversation(conv);
    } catch (err) {
        console.error(err);
        setError("Failed to generate conversation.");
    } finally {
        setLoadingConv(false);
    }
  };

  const handleAskMoreMi = () => {
    window.dispatchEvent(new CustomEvent('milingo:open-chat'));
  };

  const playAudio = async (text: string, onStart: () => void, onEnd: () => void) => {
    onStart();
    try {
      const base64Audio = await generateSpeech(text);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = onEnd;
      source.start();
    } catch (err) {
      console.error("Audio playback error:", err);
      onEnd();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fullBase64 = event.target?.result as string;
      const base64Data = fullBase64.split(',')[1];
      setImage(fullBase64);
      handleAnalysis(base64Data, demoTargetLang.promptName);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="demo" className="py-12 sm:py-20 md:py-24 px-4 md:px-8 bg-[#FEF3E2]/25 dark:bg-[#0F1115] overflow-hidden transition-colors duration-300 relative">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white dark:from-[#13161C] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
           <div className="inline-block px-4 py-1.5 bg-[#e6332a] text-white rounded-full text-xs sm:text-sm font-black uppercase tracking-wider mb-2 -rotate-1 shadow-sm">
             {t.demo.badge}
           </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#2D2926] dark:text-[#A5A9E8] brand-font">{t.demo.title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto font-medium">
            {t.demo.desc}
          </p>
        </div>

        {/* Demo Language Selector - Mobile Optimized Grid */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-12">
            <p className="text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#2D2926] dark:text-stone-400 mb-6 sm:mb-8">
                {t.demo.targetLang}
            </p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
                {SUPPORTED_LANGUAGES.filter(l => l.id !== 'vi').map(lang => (
                    <button
                        key={lang.id}
                        onClick={() => {
                            if (demoTargetLang.id === lang.id) return;
                            setDemoTargetLang(lang);
                            if (image) {
                                const base64Data = image.split(',')[1];
                                handleAnalysis(base64Data, lang.promptName);
                            }
                        }}
                        className={`group relative p-1.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 transition-all active:scale-95 border-2 ${
                            demoTargetLang.id === lang.id 
                            ? 'bg-[#e6332a] text-white border-[#e6332a] shadow-lg scale-105 z-10' 
                            : 'bg-white dark:bg-[#1A1D24] text-stone-500 border-stone-100 dark:border-white/5 hover:border-[#e6332a]/50 hover:shadow-md'
                        }`}
                    >
                        <div className="relative w-6 h-4 sm:w-8 sm:h-5 overflow-hidden rounded-sm shadow-sm">
                          <img 
                            src={lang.flag} 
                            alt={lang.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col items-center leading-none">
                          <span className={`text-[8px] font-black uppercase tracking-tighter ${demoTargetLang.id === lang.id ? 'text-white/70' : 'text-stone-400'}`}>
                            {lang.code}
                          </span>
                          <span className="text-xs sm:text-sm font-black uppercase">
                            {lang.id}
                          </span>
                        </div>
                        
                        {/* Active Indicator Dot */}
                        {demoTargetLang.id === lang.id && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f9b233] rounded-full border-2 border-white dark:border-[#1A1D24] shadow-sm"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 xl:gap-14 items-start">
          {/* Upload Area */}
          <div className="space-y-4 sm:space-y-6">
            <div 
              className="group relative aspect-video sm:aspect-[4/3] w-full border-4 border-dashed border-[#e6332a]/30 dark:border-white/20 rounded-[2rem] sm:rounded-[3rem] flex flex-col items-center justify-center hover:border-[#e6332a] hover:bg-[#FFF5F2] dark:hover:bg-[#e6332a]/5 transition-all cursor-pointer bg-white dark:bg-[#1A1D24] overflow-hidden shadow-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Upload preview" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-6 sm:px-8 py-3 sm:py-4 bg-white/95 backdrop-blur-md rounded-full text-xs sm:text-base font-black text-[#2D2926] shadow-xl border-2 border-white transform scale-105">Change Photo 📸</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-4 sm:p-8">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#e6332a]/10 dark:bg-[#252830] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md transition-all group-hover:rotate-6">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#e6332a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[#2D2926] dark:text-white font-black text-lg sm:text-2xl">{t.demo.upload}</p>
                  <p className="text-stone-400 dark:text-stone-500 font-bold mt-1 sm:text-base">{t.demo.hint}</p>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            {error && <p className="text-red-500 text-xs sm:text-sm text-center font-bold bg-red-100 border-2 border-red-200 py-3 rounded-xl sm:rounded-2xl animate-bounce">{error}</p>}
          </div>

          {/* Results Area */}
          <div className="space-y-6 sm:space-y-8 min-h-[300px] sm:min-h-[400px]">
            {loading ? (
               <div className="h-full min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center space-y-6 bg-white dark:bg-[#1A1D24] rounded-[2rem] sm:rounded-[3rem] border-2 sm:border-4 border-white dark:border-stone-800 shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 relative flex items-center justify-center">
                     <div className="absolute inset-0 border-[4px] sm:border-[6px] border-t-[#e6332a] border-r-[#f9b233] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                     <span className="text-3xl sm:text-5xl animate-bounce">✨</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#2D2926] to-[#e6332a] mt-4 sm:mt-6 text-center px-4">
                    {t.demo.analyzing}
                  </h3>
                </div>
              </div>
            ) : result ? (
              <div className="bg-white dark:bg-[#1A1D24] p-5 sm:p-8 xl:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-xl border-2 sm:border-4 border-white dark:border-stone-800 space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 min-w-0 pr-0 sm:pr-4 w-full">
                    <div className="inline-block px-3 py-1 bg-[#FFF5F2] dark:bg-orange-900/30 text-[#e6332a] text-[10px] sm:text-xs font-black rounded-full uppercase tracking-widest mb-3 sm:mb-4">
                      {t.demo.keyword} ({demoTargetLang.name})
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#2D2926] dark:text-white brand-font">{result.keyword}</h3>
                      <button onClick={() => playAudio(result.keyword, () => setPlayingKeyword(true), () => setPlayingKeyword(false))} disabled={playingKeyword} className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFF5F2] dark:bg-[#252830] text-[#e6332a] hover:scale-110 active:scale-95 transition-all">
                        <svg className="w-6 h-6 sm:w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                      </button>
                    </div>
                    <p className="text-stone-400 text-base sm:text-lg font-bold font-mono mt-1 sm:mt-2">{result.pronunciation}</p>
                    <p className="text-xl sm:text-3xl text-stone-600 dark:text-stone-300 mt-1 sm:mt-2 font-bold">{result.translation}</p>
                  </div>
                  <div className="hidden sm:block">
                    <img 
                      src={demoTargetLang.flag} 
                      alt={demoTargetLang.name} 
                      className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-lg shadow-md border-2 border-white dark:border-stone-800"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="h-0.5 sm:h-1 bg-stone-100 dark:bg-white/10 rounded-full"></div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-block px-3 py-1 bg-[#FFF5F2] dark:bg-orange-900/30 text-[#e6332a] text-[10px] sm:text-xs font-black rounded-full uppercase tracking-widest">{t.demo.sentence}</div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                        <p className="text-lg sm:text-2xl font-bold leading-tight text-[#2D2926] dark:text-[#A5A9E8]">"{highlightKeyword(result.sentence, result.keyword)}"</p>
                        <button onClick={() => playAudio(result.sentence, () => setPlayingSentence(true), () => setPlayingSentence(false))} disabled={playingSentence} className="p-1.5 sm:p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:scale-110 active:scale-95 transition-all flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        </button>
                    </div>
                    <p className="text-sm sm:text-lg text-stone-500 italic font-medium">{result.sentenceTranslation}</p>
                  </div>
                </div>

                {!conversation && !loadingConv ? (
                    <button onClick={handleGenerateConversation} className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white rounded-[1.5rem] sm:rounded-[2rem] font-black text-lg sm:text-xl hover:scale-[1.02] transition-all shadow-lg active:scale-95">
                        <span>{t.demo.genConv}</span>
                    </button>
                ) : loadingConv ? (
                    <div className="text-center p-4 sm:p-6 font-bold text-stone-500 animate-pulse text-sm sm:text-base">{t.demo.generatingConv}</div>
                ) : conversation ? (
                    <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-5">
                         <h4 className="text-lg sm:text-xl font-black brand-font">{t.demo.convTitle}</h4>
                         <div className="space-y-4">
                            {conversation.map((line, idx) => (
                                <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}>
                                    <div className="text-[10px] font-black uppercase text-stone-400 mb-1">{line.speaker}</div>
                                    <div className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 rounded-2xl sm:rounded-[1.5rem] shadow-sm ${idx % 2 === 0 ? 'bg-stone-50 dark:bg-stone-800/50 border-l-4 border-[#e6332a]' : 'bg-[#FFF5F2] dark:bg-orange-900/10 text-right border-r-4 border-[#f9b233]'}`}>
                                        <p className="font-bold text-sm sm:text-base">{line.text}</p>
                                        <p className="text-stone-400 text-[10px] sm:text-xs mt-1 italic">{line.translation}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                ) : null}

                {conversation && (
                  <div className="flex justify-center pt-1">
                    <button
                      type="button"
                      onClick={handleAskMoreMi}
                      className="w-full max-w-[220px] py-2 sm:py-2.5 bg-white dark:bg-[#111318] text-[#e6332a] border-2 border-[#e6332a]/35 rounded-xl font-black text-sm sm:text-base hover:border-[#e6332a] hover:bg-[#FFF5F2] dark:hover:bg-[#1e222b] transition-all active:scale-95"
                    >
                      Chat with Mi
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center text-center p-6 sm:p-12 border-2 sm:border-4 border-dashed border-[#E8F8F9] rounded-[2rem] sm:rounded-[3rem] bg-white/50 dark:bg-stone-900/20">
                <p className="text-stone-400 font-bold text-base sm:text-xl">{t.demo.placeholder}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
