import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '../types';
import { generateSpeech } from '../services/geminiService';
import { useLibrary } from '../contexts/LibraryContext';
import { useUI } from '../contexts/UIContext';

// Audio decoding utilities
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext) {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

const LibraryModal: React.FC = () => {
  const { library, deleteItem } = useLibrary();
  const { isLibraryOpen, closeLibrary } = useUI();
  
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [filterLang, setFilterLang] = useState<string>('all');

  if (!isLibraryOpen) return null;

  const filteredItems = filterLang === 'all' 
    ? library 
    : library.filter(item => item.languageId === filterLang);

  const handlePlay = async (text: string, id: string) => {
    if (playingId) return;
    setPlayingId(id);
    try {
      const base64Audio = await generateSpeech(text);
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setPlayingId(null);
      source.start();
    } catch (e) {
      console.error(e);
      setPlayingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity"
        onClick={closeLibrary}
      ></div>

      <div className="relative bg-[#F8F7F4] dark:bg-[#0F1115] w-full max-w-5xl h-[85vh] rounded-[3rem] shadow-2xl border-4 border-white dark:border-stone-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 md:p-8 bg-white dark:bg-[#1A1D24] border-b border-stone-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FFD6E0] rounded-full flex items-center justify-center text-2xl shadow-sm">📚</div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#2D3277] dark:text-white brand-font">My Collection</h2>
                <p className="text-stone-500 font-bold text-sm">{library.length} memories saved</p>
              </div>
           </div>

           <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
              <button 
                onClick={() => setFilterLang('all')}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${filterLang === 'all' ? 'bg-[#2D3277] text-white shadow-lg' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200'}`}
              >
                All
              </button>
              {SUPPORTED_LANGUAGES.filter(l => l.id !== 'vi').map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setFilterLang(lang.id)}
                  className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all ${filterLang === lang.id ? 'bg-[#73CED5] text-[#2D3277] shadow-lg' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200'}`}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden md:inline">{lang.name}</span>
                </button>
              ))}
           </div>

           <button 
             onClick={closeLibrary}
             className="absolute top-4 right-4 md:static p-3 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-red-100 text-stone-400 hover:text-red-500 transition-colors"
           >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
           {filteredItems.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
                <div className="w-32 h-32 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center text-6xl animate-bounce">
                  👻
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-stone-400">It's quiet in here...</h3>
                  <p className="text-stone-400 font-medium mt-2">Go capture some words to fill your library!</p>
                </div>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const lang = SUPPORTED_LANGUAGES.find(l => l.id === item.languageId);
                  return (
                    <div key={item.id} className="bg-white dark:bg-[#1A1D24] rounded-[2rem] p-6 shadow-sm border-2 border-stone-100 dark:border-white/5 hover:border-[#AF86FF] hover:shadow-xl transition-all group relative">
                       <button 
                         onClick={() => deleteItem(item.id)}
                         className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 text-stone-300 hover:text-red-500 transition-all bg-stone-50 dark:bg-stone-800 rounded-full"
                         title="Remove"
                       >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>

                       <div className="flex justify-between items-start mb-4">
                          <span className="text-4xl">{lang?.flag}</span>
                          <span className="text-xs font-bold text-stone-300 uppercase tracking-wider bg-stone-50 dark:bg-stone-800 px-2 py-1 rounded-md">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                       </div>

                       <div className="space-y-1 mb-4">
                          <div className="flex items-center gap-2">
                             <h3 className="text-2xl font-black text-[#2D3277] dark:text-white brand-font">{item.keyword}</h3>
                             <button 
                               onClick={() => handlePlay(item.keyword, item.id + 'k')}
                               className={`p-1.5 rounded-full bg-[#E8F8F9] text-[#73CED5] hover:bg-[#73CED5] hover:text-white transition-colors ${playingId === item.id + 'k' ? 'animate-spin' : ''}`}
                             >
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                             </button>
                          </div>
                          <p className="text-stone-500 font-mono text-sm">{item.pronunciation}</p>
                          <p className="text-lg font-bold text-stone-600 dark:text-stone-300">{item.translation}</p>
                       </div>

                       <div className="bg-[#F8F7F4] dark:bg-[#252830] p-4 rounded-xl relative">
                          <p className="text-stone-700 dark:text-stone-200 font-medium italic pr-6">"{item.sentence}"</p>
                          <p className="text-stone-400 text-sm mt-1">{item.sentenceTranslation}</p>
                          <button 
                               onClick={() => handlePlay(item.sentence, item.id + 's')}
                               className={`absolute top-2 right-2 p-1.5 rounded-full text-stone-400 hover:text-[#AF86FF] transition-colors ${playingId === item.id + 's' ? 'animate-pulse text-[#AF86FF]' : ''}`}
                           >
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                          </button>
                       </div>
                    </div>
                  );
                })}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default LibraryModal;