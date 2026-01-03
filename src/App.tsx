import { useState, useCallback } from 'react';
import { LeetCodeList, ComparisonResult, ComparisonStats, ParsedList } from './types';
import { parseQuestions, generateListId } from './utils';
import { ListItem } from './components/ListItem';
import { ComparisonResults } from './components/ComparisonResults';
import { neetcode150Questions } from './data/neetcode150';
import './styles.css';

function App() {
  const [lists, setLists] = useState<LeetCodeList[]>(() => [
    { id: generateListId(), name: 'NeetCode 150', questions: neetcode150Questions },
  ]);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [stats, setStats] = useState<ComparisonStats | null>(null);

  const addList = useCallback(() => {
    const newList: LeetCodeList = {
      id: generateListId(),
      name: `List ${lists.length + 1}`,
      questions: '',
    };
    setLists((prev: LeetCodeList[]) => [...prev, newList]);
  }, [lists.length]);

  const removeList = useCallback((id: string) => {
    setLists((prev: LeetCodeList[]) => prev.filter((list: LeetCodeList) => list.id !== id));
  }, []);

  const updateList = useCallback((id: string, field: 'name' | 'questions', value: string) => {
    setLists((prev: LeetCodeList[]) =>
      prev.map((list: LeetCodeList) => (list.id === id ? { ...list, [field]: value } : list))
    );
  }, []);

  const compareLists = useCallback(() => {
    const parsedLists: ParsedList[] = lists.map((list: LeetCodeList) => ({
      id: list.id,
      name: list.name || `List ${lists.indexOf(list) + 1}`,
      questions: new Set(parseQuestions(list.questions || '')),
    }));

    const allQuestions = new Set<string>();
    parsedLists.forEach((list) => {
      list.questions.forEach((q) => allQuestions.add(q));
    });

    const results: ComparisonResult[] = parsedLists.map((list) => {
      const uniqueQuestions = new Set<string>();

      list.questions.forEach((question) => {
        const existsInOtherList = parsedLists.some(
          (otherList) => otherList.id !== list.id && otherList.questions.has(question)
        );

        if (!existsInOtherList) {
          uniqueQuestions.add(question);
        }
      });

      return {
        name: list.name,
        uniqueQuestions: Array.from(uniqueQuestions).sort(),
        totalQuestions: list.questions.size,
        uniqueCount: uniqueQuestions.size,
      };
    });

    const comparisonStats: ComparisonStats = {
      totalLists: parsedLists.length,
      totalUniqueQuestions: allQuestions.size,
      totalQuestionsAcrossLists: parsedLists.reduce((sum, list) => sum + list.questions.size, 0),
    };

    setComparisonResults(results);
    setStats(comparisonStats);
  }, [lists]);

  return (
    <div className="container">
      <header>
        <h1>LeetCode List Comparison Tool</h1>
        <p>Compare questions across different LeetCode lists to find unique questions in each list</p>
      </header>

      <main>
        <section className="lists-section">
          <h2>Lists</h2>
          <div id="lists-container">
            {lists.map((list) => (
              <ListItem
                key={list.id}
                list={list}
                onUpdate={updateList}
                onRemove={removeList}
              />
            ))}
          </div>
          <button className="btn btn-primary" onClick={addList}>
            + Add List
          </button>
        </section>

        <section className="comparison-section">
          <h2>Comparison Results</h2>
          <div id="results-container">
            {stats ? (
              <ComparisonResults results={comparisonResults} stats={stats} />
            ) : (
              <p className="placeholder">Add lists and click "Compare" to see results</p>
            )}
          </div>
          <button className="btn btn-secondary" onClick={compareLists}>
            Compare Lists
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
