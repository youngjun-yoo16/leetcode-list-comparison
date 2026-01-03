export interface LeetCodeList {
  id: string;
  name: string;
  questions: string;
}

export interface ComparisonResult {
  name: string;
  uniqueQuestions: string[];
  totalQuestions: number;
  uniqueCount: number;
}

export interface ComparisonStats {
  totalLists: number;
  totalUniqueQuestions: number;
  totalQuestionsAcrossLists: number;
  sharedQuestions: number;
  sharedQuestionsList: string[];
}

export interface ParsedList {
  id: string;
  name: string;
  questions: Set<string>;
}
