export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'admin' | 'zo' | 'ro' | 'supervisor' | 'enumerator';
  status: 'active' | 'inactive' | 'suspended';
  parentUserId?: string;
  jurisdictionCode?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Survey {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number;
  maxAttempts: number;
  targetStartDate?: string;
  targetEndDate?: string;
  status: 'draft' | 'active' | 'inactive' | 'archived';
  createdBy: string;
  createdAt: string;
  sections?: QuestionSection[];
}

export interface QuestionSection {
  id: string;
  surveyId: string;
  sectionName: string;
  sectionOrder: number;
  questionsCount: number;
  description?: string;
}

export interface Question {
  id: string;
  surveyId: string;
  sectionId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  complexity: 'easy' | 'medium' | 'hard';
  marks: number;
  explanation?: string;
  topic?: string;
  isActive: boolean;
}

export interface TestSession {
  id: string;
  userId: string;
  surveyId: string;
  attemptNumber: number;
  status: 'started' | 'paused' | 'completed' | 'expired' | 'abandoned';
  startTime: string;
  endTime?: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  submittedAt?: string;
}

export interface SessionQuestion {
  id: string;
  sessionId: string;
  questionId: string;
  questionOrder: number;
  isAttempted: boolean;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  isMarkedForReview: boolean;
  timeSpent: number;
  question?: Question;
}

export interface TestResult {
  id: string;
  sessionId: string;
  userId: string;
  surveyId: string;
  attemptNumber: number;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  passStatus: boolean;
  timeTaken: number;
  sectionWiseScores?: Record<string, any>;
  generatedAt: string;
}

export interface Certificate {
  id: string;
  resultId: string;
  userId: string;
  surveyId: string;
  certificateNumber: string;
  issueDate: string;
  isValid: boolean;
  verificationToken: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}