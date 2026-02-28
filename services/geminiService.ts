
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { MilingoResult } from "../types";
// Initialize GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeImageForLanguage = async (base64Image: string, targetLanguage: string): Promise<MilingoResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: `Hãy đóng vai là trợ lý học tập MiLingo. Phân tích hình ảnh này và chọn một đối tượng nổi bật nhất.
          Sau đó tạo một bài học ngôn ngữ ngắn sang ${targetLanguage}.
          Yêu cầu trả về JSON với các trường:
          - keyword: tên đối tượng bằng ${targetLanguage}.
          - translation: nghĩa tiếng Việt.
          - pronunciation: cách phát âm (phiên âm Latinh hoặc Romaji/Pinyin/Hangeul tùy ngôn ngữ).
          - sentence: một câu giao tiếp ngắn gọn, tự nhiên có chứa từ khóa đó bằng ${targetLanguage}.
          - sentenceTranslation: bản dịch tiếng Việt của câu đó.`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          keyword: { type: Type.STRING },
          translation: { type: Type.STRING },
          pronunciation: { type: Type.STRING },
          sentence: { type: Type.STRING },
          sentenceTranslation: { type: Type.STRING },
        },
        required: ["keyword", "translation", "pronunciation", "sentence", "sentenceTranslation"],
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as MilingoResult;
};

export const generateSpeech = async (text: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: text }] }],
    config: {
      responseModalities: ["AUDIO" as Modality],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    console.error("No audio data in response", response);
    throw new Error("Could not generate audio");
  }
  return base64Audio;
};
