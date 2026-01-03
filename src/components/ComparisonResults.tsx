import React, { useState, useMemo } from 'react';
import { ComparisonResult, ComparisonStats } from '../types';
import { getTopic, topicOrder, Topic } from '../utils/topicMapping';

interface ComparisonResultsProps {
  results: ComparisonResult[];
  stats: ComparisonStats;
}

type SortType = 'none' | 'difficulty' | 'topic';

const getDifficultyClass = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  if (lowerQuestion.includes('(easy)')) {
    return 'difficulty-easy';
  } else if (lowerQuestion.includes('(med.)') || lowerQuestion.includes('(medium)')) {
    return 'difficulty-medium';
  } else if (lowerQuestion.includes('(hard)')) {
    return 'difficulty-hard';
  }
  return '';
};

const getDifficultyValue = (question: string): number => {
  const lowerQuestion = question.toLowerCase();
  if (lowerQuestion.includes('(easy)')) return 1;
  if (lowerQuestion.includes('(med.)') || lowerQuestion.includes('(medium)')) return 2;
  if (lowerQuestion.includes('(hard)')) return 3;
  return 0;
};

const sortQuestions = (questions: string[], sortType: SortType): string[] => {
  if (sortType === 'none') {
    return [...questions];
  }
  
  if (sortType === 'difficulty') {
    return [...questions].sort((a, b) => {
      const diffA = getDifficultyValue(a);
      const diffB = getDifficultyValue(b);
      if (diffA !== diffB) {
        return diffA - diffB;
      }
      return a.localeCompare(b);
    });
  }
  
  if (sortType === 'topic') {
    return [...questions].sort((a, b) => {
      const topicA = getTopic(a);
      const topicB = getTopic(b);
      const indexA = topicOrder.indexOf(topicA);
      const indexB = topicOrder.indexOf(topicB);
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      return a.localeCompare(b);
    });
  }
  
  return questions;
};

const groupByTopic = (questions: string[]): Map<Topic, string[]> => {
  const grouped = new Map<Topic, string[]>();
  questions.forEach((question) => {
    const topic = getTopic(question);
    if (!grouped.has(topic)) {
      grouped.set(topic, []);
    }
    grouped.get(topic)!.push(question);
  });
  
  // Sort each topic group by difficulty, then alphabetically
  grouped.forEach((topicQuestions) => {
    topicQuestions.sort((a, b) => {
      const diffA = getDifficultyValue(a);
      const diffB = getDifficultyValue(b);
      if (diffA !== diffB) {
        return diffA - diffB;
      }
      return a.localeCompare(b);
    });
  });
  
  return grouped;
};

const getDifficultyBreakdown = (questions: string[]): { easy: number; medium: number; hard: number } => {
  let easy = 0;
  let medium = 0;
  let hard = 0;
  
  questions.forEach((question) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('(easy)')) {
      easy++;
    } else if (lowerQuestion.includes('(med.)') || lowerQuestion.includes('(medium)')) {
      medium++;
    } else if (lowerQuestion.includes('(hard)')) {
      hard++;
    }
  });
  
  return { easy, medium, hard };
};

export const ComparisonResults: React.FC<ComparisonResultsProps> = ({ results, stats }) => {
  const [sortType, setSortType] = useState<SortType>('none');

  if (results.length === 0) {
    return (
      <p className="placeholder">
        No lists to compare. Please add at least one list with questions.
      </p>
    );
  }

  const sortedResults = useMemo(() => {
    return results.map((result) => ({
      ...result,
      sortedQuestions: sortQuestions(result.uniqueQuestions, sortType),
      groupedByTopic: sortType === 'topic' ? groupByTopic(result.uniqueQuestions) : null,
      difficultyBreakdown: getDifficultyBreakdown(result.uniqueQuestions),
    }));
  }, [results, sortType]);

  const sortedSharedQuestions = useMemo(() => {
    return sortQuestions(stats.sharedQuestionsList, sortType);
  }, [stats.sharedQuestionsList, sortType]);

  const sharedGroupedByTopic = useMemo(() => {
    return sortType === 'topic' ? groupByTopic(stats.sharedQuestionsList) : null;
  }, [stats.sharedQuestionsList, sortType]);

  const sharedDifficultyBreakdown = useMemo(() => {
    return getDifficultyBreakdown(stats.sharedQuestionsList);
  }, [stats.sharedQuestionsList]);

  return (
    <>
      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{stats.totalLists}</div>
          <div className="stat-label">Lists</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalUniqueQuestions}</div>
          <div className="stat-label">Total Distinct</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.sharedQuestions}</div>
          <div className="stat-label">Shared Questions</div>
        </div>
      </div>

      <div className="sort-controls">
        <label htmlFor="sort-select">Sort by: </label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value as SortType)}
        >
          <option value="none">None</option>
          <option value="difficulty">Difficulty</option>
          <option value="topic">Topic</option>
        </select>
      </div>

      {stats.sharedQuestions > 0 && (
        <div className="shared-questions-section">
          <h2 className="section-title">Shared Questions</h2>
          <div className="unique-questions">
            <p>
              <strong>
                {stats.sharedQuestions} shared question(s): {sharedDifficultyBreakdown.easy} Easy, {sharedDifficultyBreakdown.medium} Med, {sharedDifficultyBreakdown.hard} Hard
              </strong>
            </p>
            {sortType === 'topic' && sharedGroupedByTopic ? (
              // Grouped by topic display
              Array.from(sharedGroupedByTopic.entries())
                .sort(([topicA], [topicB]) => {
                  const indexA = topicOrder.indexOf(topicA);
                  const indexB = topicOrder.indexOf(topicB);
                  return indexA - indexB;
                })
                .map(([topic, questions]) => (
                  <div key={topic} className="topic-group">
                    <div className="topic-header">{topic}</div>
                    {questions.map((question, index) => (
                      <div key={index} className={`question-item ${getDifficultyClass(question)}`}>
                        {question}
                      </div>
                    ))}
                  </div>
                ))
            ) : (
              // Regular list display
              sortedSharedQuestions.map((question, index) => (
                <div key={index} className={`question-item ${getDifficultyClass(question)}`}>
                  {question}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="results-grid">
        {sortedResults.map((result) => (
          <div key={result.name} className="result-group">
            <h3>{result.name}</h3>
            <div className="unique-questions">
              {result.uniqueQuestions.length > 0 ? (
                <>
                  <p>
                    <strong>
                      {result.uniqueCount} unique question(s): {result.difficultyBreakdown.easy} Easy, {result.difficultyBreakdown.medium} Med, {result.difficultyBreakdown.hard} Hard
                    </strong>
                  </p>
                  {sortType === 'topic' && result.groupedByTopic ? (
                    // Grouped by topic display
                    Array.from(result.groupedByTopic.entries())
                      .sort(([topicA], [topicB]) => {
                        const indexA = topicOrder.indexOf(topicA);
                        const indexB = topicOrder.indexOf(topicB);
                        return indexA - indexB;
                      })
                      .map(([topic, questions]) => (
                        <div key={topic} className="topic-group">
                          <div className="topic-header">{topic}</div>
                          {questions.map((question, index) => (
                            <div key={index} className={`question-item ${getDifficultyClass(question)}`}>
                              {question}
                            </div>
                          ))}
                        </div>
                      ))
                  ) : (
                    // Regular list display
                    result.sortedQuestions.map((question, index) => (
                      <div key={index} className={`question-item ${getDifficultyClass(question)}`}>
                        {question}
                      </div>
                    ))
                  )}
                </>
              ) : (
                <div className="no-unique">
                  No unique questions. All questions in this list appear in at least one other list.
                </div>
              )}
              <p style={{ marginTop: '15px', color: '#6c757d', fontSize: '0.9em' }}>
                Total questions in list: {result.totalQuestions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
