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
}

export interface ParsedList {
  id: string;
  name: string;
  questions: Set<string>;
}
