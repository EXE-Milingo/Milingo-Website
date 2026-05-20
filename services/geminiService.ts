import { GoogleGenAI, Type, Modality } from "@google/genai";
import { MilingoResult } from "../types";

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.API_KEY;

let aiClient: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!apiKey) {
    throw new Error("Missing Gemini API key. Please set VITE_GEMINI_API_KEY.");
  }
  if (!aiClient) aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
};

export const MI_CHAT_PROMPT = `Bạn là Mi, trợ lý học ngoại ngữ của Milingo.
Quy tắc:
- Trả lời dạng văn bản thuần (plain text), không dùng định dạng markdown.
- Chỉ trả lời 1-2 câu, ngắn gọn, rõ ràng và hữu ích, dùng tiếng Việt.
Nhiệm vụ:
- Hỗ trợ giải nghĩa từ, phát âm, đặt câu ví dụ, chia sẻ mẹo học và hướng dẫn cách chụp vật thể để học từ vựng.`;


export const analyzeImageForLanguage = async (
  base64Image: string,
  targetLanguage: string
): Promise<MilingoResult> => {
  const response = await getAiClient().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        {
          text: `You are the MiLingo learning assistant. Analyze this image and choose the most prominent object.
Create a short language lesson in ${targetLanguage}.
Strict rules:
- "keyword" must be in ${targetLanguage}.
- "sentence" must be in ${targetLanguage}.
- "translation" must always be Vietnamese.
- "sentenceTranslation" must always be Vietnamese.
Return JSON with keyword, translation, pronunciation, sentence, sentenceTranslation.`,
        },
      ],
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
      },
    },
  });
  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as MilingoResult;
};

export interface ConversationLine {
  speaker: string;
  text: string;
  translation: string;
}

export const generateConversation = async (
  keyword: string,
  targetLanguage: string
): Promise<ConversationLine[]> => {
  const response = await getAiClient().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a short, natural conversation (4 lines) between two people in ${targetLanguage} using "${keyword}".
Return a JSON array with speaker, text, translation (Vietnamese).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            speaker: { type: Type.STRING },
            text: { type: Type.STRING },
            translation: { type: Type.STRING },
          },
          required: ["speaker", "text", "translation"],
        },
      },
    },
  });
  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as ConversationLine[];
};

export const generateSpeech = async (text: string): Promise<string> => {
  const response = await getAiClient().models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
      },
    },
  });
  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Could not generate audio");
  return base64Audio;
};

export const chatWithMi = async (userMessage: string, targetLanguage: string): Promise<string> => {
  const systemPrompt = `${MI_CHAT_PROMPT}
Ngôn ngữ hiện tại ưu tiên: ${targetLanguage}.`;

  const response = await getAiClient().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${systemPrompt}\n\nNgười dùng: ${userMessage}\nMi:`,
  });
  const text = response.text?.trim();
  if (!text) throw new Error("No response from AI");
  return text;
};
