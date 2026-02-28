
export interface MilingoResult {
  keyword: string;
  translation: string;
  pronunciation: string;
  sentence: string;
  sentenceTranslation: string;
}

export interface SavedItem extends MilingoResult {
  id: string;
  languageId: string;
  timestamp: number;
}

export interface SectionProps {
  id?: string;
}

export interface Language {
  id: string;
  name: string;
  flag: string;
  promptName: string;
}

export interface User {
  name: string;
  avatar: string; // Emoji
  dailyGoal: number;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { id: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', promptName: 'Vietnamese' },
  { id: 'en', name: 'Tiếng Anh', flag: '🇺🇸', promptName: 'English' },
  { id: 'ja', name: 'Tiếng Nhật', flag: '🇯🇵', promptName: 'Japanese' },
  { id: 'zh', name: 'Tiếng Trung', flag: '🇨🇳', promptName: 'Chinese' },
  { id: 'ko', name: 'Tiếng Hàn', flag: '🇰🇷', promptName: 'Korean' },
];
