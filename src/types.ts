export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Level {
  number: number;
  title: string;
  difficulty: 'Junior' | 'Intermediate' | 'Senior';
  questions: Question[];
  interviewerFeedback: string;
}

export interface UserProgress {
  unlockedLevel: number;
  completedLevels: number[];
}

export interface Scorecard {
  logic: number;
  optimization: number;
  communication: number;
}
