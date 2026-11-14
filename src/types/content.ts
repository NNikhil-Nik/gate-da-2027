export type QuestionFormat = 'MCQ' | 'MSQ' | 'NAT';
export type Difficulty = 'basic' | 'intermediate' | 'gate' | 'challenging';

export interface Formula {
  name: string;
  latex: string;
  variables: string;
  conditions?: string;
  notes?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  difficulty: Difficulty;
  problem: string;
  solution: SolutionStep[];
  alternativeApproach?: string;
  examTip?: string;
}

export interface SolutionStep {
  explanation: string;
  latex?: string;
}

export interface Hint {
  text: string;
  latex?: string;
}

export interface PracticeQuestion {
  id: string;
  topicId: string;
  question: string;
  format: QuestionFormat;
  difficulty: Difficulty;
  options?: { label: string; text: string }[];
  correctAnswer: string | string[];
  hints: Hint[];
  solution: SolutionStep[];
  explanation: string;
  commonMistakes?: string;
  isPYQ: boolean;
  pyqMeta?: {
    year: number;
    questionNumber?: number;
    marks: number;
    verified: boolean;
    verificationNote?: string;
  };
}

export interface TopicContent {
  id: string;
  moduleId: string;
  title: string;
  dayRange: string;
  order: number;

  conceptExplanation: {
    intuition: string;
    definition: string;
    whyItWorks: string;
    whenToUse: string;
    commonMistakes: string[];
    examTips?: string[];
  };

  diagrams?: DiagramConfig[];

  formulas: Formula[];
  workedExamples: WorkedExample[];
  practiceQuestions: PracticeQuestion[];
}

export interface DiagramConfig {
  id: string;
  type: 'venn' | 'tree' | 'flow' | 'bar' | 'line' | 'scatter' | 'area' | 'custom-svg';
  title: string;
  description?: string;
  data?: Record<string, unknown>;
  svgContent?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  dayRange: string;
  topics: TopicContent[];
}

export interface UserProgress {
  completedTopics: string[];
  bookmarkedQuestions: string[];
  incorrectQuestions: string[];
  questionAttempts: Record<string, {
    answer: string | string[];
    correct: boolean;
    timestamp: number;
  }>;
  topicNotes: Record<string, string>;
}
