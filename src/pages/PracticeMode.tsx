import { useState, useMemo } from 'react';
import { PracticeQuestionCard } from '../components/PracticeQuestion';
import type { Module, UserProgress, PracticeQuestion } from '../types/content';

interface Props {
  modules: Module[];
  progress: UserProgress;
  onBookmark: (id: string) => void;
  onAttempt: (id: string, answer: string | string[], correct: boolean) => void;
  onClearAttempt: (id: string) => void;
}

type Filter = 'all' | 'pyq' | 'bookmarked' | 'incorrect' | 'unattempted';

export function PracticeMode({ modules, progress, onBookmark, onAttempt, onClearAttempt }: Props) {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [filter, setFilter] = useState<Filter>('all');

  const allQuestions = useMemo(() => {
    const qs: (PracticeQuestion & { moduleName: string; topicName: string })[] = [];
    for (const mod of modules) {
      for (const topic of mod.topics) {
        for (const q of topic.practiceQuestions) {
          qs.push({ ...q, moduleName: mod.title, topicName: topic.title });
        }
      }
    }
    return qs;
  }, [modules]);

  const filtered = useMemo(() => {
    let qs = allQuestions;
    if (selectedModule !== 'all') {
      qs = qs.filter(q => {
        const mod = modules.find(m => m.topics.some(t => t.id === q.topicId));
        return mod?.id === selectedModule;
      });
    }
    switch (filter) {
      case 'pyq': return qs.filter(q => q.isPYQ);
      case 'bookmarked': return qs.filter(q => progress.bookmarkedQuestions.includes(q.id));
      case 'incorrect': return qs.filter(q => progress.incorrectQuestions.includes(q.id));
      case 'unattempted': return qs.filter(q => !progress.questionAttempts[q.id]);
      default: return qs;
    }
  }, [allQuestions, selectedModule, filter, modules, progress]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Practice Mode</h1>
      <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-6">
        {filtered.length} question{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedModule('all')}
            className={`text-[12px] px-2.5 py-1 rounded-full ${
              selectedModule === 'all'
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            All Modules
          </button>
          {modules.map(mod => (
            <button
              key={mod.id}
              onClick={() => setSelectedModule(mod.id)}
              className={`text-[12px] px-2.5 py-1 rounded-full ${
                selectedModule === mod.id
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              M{mod.id.replace('module', '')}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(['all', 'pyq', 'bookmarked', 'incorrect', 'unattempted'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[12px] px-2.5 py-1 rounded-full ${
                filter === f
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {f === 'pyq' ? 'PYQs' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[14px] text-gray-400 dark:text-gray-500 py-12 text-center">No questions match the current filters.</p>
      ) : (
        filtered.map(q => (
          <PracticeQuestionCard
            key={q.id}
            question={q}
            isBookmarked={progress.bookmarkedQuestions.includes(q.id)}
            previousAttempt={progress.questionAttempts[q.id]}
            onBookmark={onBookmark}
            onAttempt={onAttempt}
            onClearAttempt={onClearAttempt}
          />
        ))
      )}
    </div>
  );
}
