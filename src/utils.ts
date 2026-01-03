export function parseQuestions(questionsText: string): string[] {
  return questionsText
    .split('\n')
    .map((q) => q.trim())
    .filter((q) => q.length > 0)
    .map((q) => q.toLowerCase().trim());
}

export function generateListId(): string {
  return `list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
