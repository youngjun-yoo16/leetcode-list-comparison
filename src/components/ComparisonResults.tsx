import React from 'react';
import { ComparisonResult, ComparisonStats } from '../types';

interface ComparisonResultsProps {
  results: ComparisonResult[];
  stats: ComparisonStats;
}

export const ComparisonResults: React.FC<ComparisonResultsProps> = ({ results, stats }) => {
  if (results.length === 0) {
    return (
      <p className="placeholder">
        No lists to compare. Please add at least one list with questions.
      </p>
    );
  }

  return (
    <>
      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{stats.totalLists}</div>
          <div className="stat-label">Lists</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalUniqueQuestions}</div>
          <div className="stat-label">Unique Questions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalQuestionsAcrossLists}</div>
          <div className="stat-label">Total Questions</div>
        </div>
      </div>

      {results.map((result) => (
        <div key={result.name} className="result-group">
          <h3>{result.name}</h3>
          <div className="unique-questions">
            {result.uniqueQuestions.length > 0 ? (
              <>
                <p>
                  <strong>{result.uniqueCount} unique question(s):</strong>
                </p>
                {result.uniqueQuestions.map((question, index) => (
                  <div key={index} className="question-item">
                    {question}
                  </div>
                ))}
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
    </>
  );
};
