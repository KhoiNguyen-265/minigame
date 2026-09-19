export type QuestionType = 'music' | 'image' | 'trivia';

export interface Question {
  id: number;
  type: QuestionType;
  category: string; // e.g. "Đoán bài hát", "Đuổi hình bắt chữ", "Công nghệ IT", "Đời sống sinh viên"
  title: string;
  points: number;
  timeLimit: number; // in seconds
  // Music specific
  audioSnippetDuration?: number; // 3 to 5 seconds
  audioUrl?: string; // audio file or synthesized melody fallback
  songTitle?: string;
  artist?: string;
  // Image specific
  imageUrl?: string;
  imageHint?: string; // e.g. "2 từ (8 chữ cái)"
  // Trivia specific
  options?: string[];
  // Common
  answer: string;
  explanation?: string;
}

export interface Team {
  id: number;
  name: string;
  leader: string;
  color: string;
  glowClass: string;
  borderClass: string;
  badgeBg: string;
  score: number;
  bonusPoints: number;
}

export type SlideType = 
  | 'lobby'
  | 'rules'
  | 'round1-intro'
  | 'question'
  | 'round2-intro'
  | 'music-question'
  | 'victory';

export interface SlideItem {
  id: string;
  type: SlideType;
  title: string;
  questionIndex?: number;
  musicQuestionIndex?: number;
}
