
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
  flag: string; // URL to flag image
  code: string; // Country code for display
  promptName: string;
}

export interface User {
  name: string;
  avatar: string; // Emoji
  dailyGoal: number;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { id: 'vi', name: 'Tiếng Việt', flag: 'https://flagcdn.com/w80/vn.png', code: 'VN', promptName: 'Vietnamese' },
  { id: 'en', name: 'Tiếng Anh', flag: 'https://flagcdn.com/w80/us.png', code: 'US', promptName: 'English' },
  { id: 'ja', name: 'Tiếng Nhật', flag: 'https://flagcdn.com/w80/jp.png', code: 'JP', promptName: 'Japanese' },
  { id: 'zh', name: 'Tiếng Trung', flag: 'https://flagcdn.com/w80/cn.png', code: 'CN', promptName: 'Chinese' },
  { id: 'ko', name: 'Tiếng Hàn', flag: 'https://flagcdn.com/w80/kr.png', code: 'KR', promptName: 'Korean' },
  { id: 'fr', name: 'Tiếng Pháp', flag: 'https://flagcdn.com/w80/fr.png', code: 'FR', promptName: 'French' },
  { id: 'de', name: 'Tiếng Đức', flag: 'https://flagcdn.com/w80/de.png', code: 'DE', promptName: 'German' },
  { id: 'es', name: 'Tiếng Tây Ban Nha', flag: 'https://flagcdn.com/w80/es.png', code: 'ES', promptName: 'Spanish' },
  { id: 'it', name: 'Tiếng Ý', flag: 'https://flagcdn.com/w80/it.png', code: 'IT', promptName: 'Italian' },
];
