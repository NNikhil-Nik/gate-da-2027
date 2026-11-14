import { useState } from 'react';
import { MathText } from '../components/Math';
import { PracticeQuestionCard } from '../components/PracticeQuestion';
import type { Module, UserProgress } from '../types/content';

interface Props {
  modules: Module[];
  progress: UserProgress;
  onBookmark: (id: string) => void;
  onAttempt: (id: string, answer: string | string[], correct: boolean) => void;
  onClearAttempt: (id: string) => void;
}

type View = 'formulas' | 'mistakes' | 'bookmarked';

export function Revision({ modules, progress, onBookmark, onAttempt, onClearAttempt }: Props) {
  const [view, setView] = useState<View>('formulas');

  const allFormulas = modules.flatMap(mod =>
    mod.topics.map(t => ({
      topicTitle: t.title,
      formulas: t.formulas,
    }))
  ).filter(t => t.formulas.length > 0);

  const incorrectQuestions = modules.flatMap(mod =>
    mod.topics.flatMap(t =>
      t.practiceQuestions.filter(q => progress.incorrectQuestions.includes(q.id))
    )
  );

  const bookmarkedQuestions = modules.flatMap(mod =>
    mod.topics.flatMap(t =>
      t.practiceQuestions.filter(q => progress.bookmarkedQuestions.includes(q.id))
    )
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Revision Mode</h1>
      <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-6">Quick revision of formulas and previously incorrect questions.</p>

      <div className="flex gap-1 mb-6">
        {([
          { key: 'formulas' as const, label: 'All Formulas' },
          { key: 'mistakes' as const, label: `Mistakes (${incorrectQuestions.length})` },
          { key: 'bookmarked' as const, label: `Bookmarked (${bookmarkedQuestions.length})` },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`px-3 py-1.5 rounded text-[12px] font-medium transition-colors ${
              view === tab.key
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === 'formulas' && (
        <div className="space-y-6">
          {allFormulas.map((topic, i) => (
            <div key={i}>
              <h2 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 pb-1 border-b border-gray-100 dark:border-gray-800">
                {topic.topicTitle}
              </h2>
              <div className="space-y-2">
                {topic.formulas.map((f, j) => (
                  <div key={j} className="flex items-start gap-3 py-1">
                    <span className="text-[12px] text-gray-500 dark:text-gray-400 w-40 shrink-0 pt-0.5">{f.name}</span>
                    <div className="flex-1">
                      <MathText content={`$${f.latex}$`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'mistakes' && (
        <div>
          {incorrectQuestions.length === 0 ? (
            <p className="text-[14px] text-gray-400 dark:text-gray-500 py-12 text-center">
              No incorrect questions yet. Keep practicing!
            </p>
          ) : (
            incorrectQuestions.map(q => (
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
      )}

      {view === 'bookmarked' && (
        <div>
          {bookmarkedQuestions.length === 0 ? (
            <p className="text-[14px] text-gray-400 dark:text-gray-500 py-12 text-center">
              No bookmarked questions yet. Bookmark questions you want to revisit.
            </p>
          ) : (
            bookmarkedQuestions.map(q => (
              <PracticeQuestionCard
                key={q.id}
                question={q}
                isBookmarked={true}
                previousAttempt={progress.questionAttempts[q.id]}
                onBookmark={onBookmark}
                onAttempt={onAttempt}
                onClearAttempt={onClearAttempt}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
