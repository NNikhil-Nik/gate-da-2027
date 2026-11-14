import { useState } from 'react';
import { MathText } from './Math';
import { PracticeQuestionCard } from './PracticeQuestion';
import type { TopicContent, UserProgress } from '../types/content';

interface Props {
  topic: TopicContent;
  progress: UserProgress;
  onToggleComplete: (id: string) => void;
  onBookmark: (id: string) => void;
  onAttempt: (id: string, answer: string | string[], correct: boolean) => void;
  onClearAttempt: (id: string) => void;
}

type Tab = 'learn' | 'examples' | 'practice' | 'formulas';

export function TopicViewer({ topic, progress, onToggleComplete, onBookmark, onAttempt, onClearAttempt }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const isComplete = progress.completedTopics.includes(topic.id);

  const pyqs = topic.practiceQuestions.filter(q => q.isPYQ);
  const [practiceFilter, setPracticeFilter] = useState<'all' | 'basic' | 'intermediate' | 'gate' | 'challenging' | 'pyq' | 'bookmarked' | 'incorrect'>('all');

  const filteredQuestions = (() => {
    switch (practiceFilter) {
      case 'pyq': return pyqs;
      case 'bookmarked': return topic.practiceQuestions.filter(q => progress.bookmarkedQuestions.includes(q.id));
      case 'incorrect': return topic.practiceQuestions.filter(q => progress.incorrectQuestions.includes(q.id));
      case 'all': return topic.practiceQuestions;
      default: return topic.practiceQuestions.filter(q => q.difficulty === practiceFilter);
    }
  })();

  const tabs: { key: Tab; label: string }[] = [
    { key: 'learn', label: 'Learn' },
    { key: 'examples', label: `Examples (${topic.workedExamples.length})` },
    { key: 'practice', label: `Practice (${topic.practiceQuestions.length})` },
    { key: 'formulas', label: 'Formulas' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{topic.title}</h1>
          <button
            onClick={() => onToggleComplete(topic.id)}
            className={`text-[12px] font-medium px-3 py-1 rounded-full border transition-colors ${
              isComplete
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400'
                : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            {isComplete ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
        <p className="text-[13px] text-gray-400 dark:text-gray-500">{topic.dayRange}</p>
      </div>

      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'learn' && (
        <div className="space-y-8">
          <section>
            <h2 className="text-[15px] font-semibold text-gray-800 dark:text-gray-200 mb-3">Intuition</h2>
            <div className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              <MathText content={topic.conceptExplanation.intuition} />
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-gray-800 dark:text-gray-200 mb-3">Definition</h2>
            <div className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              <MathText content={topic.conceptExplanation.definition} />
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-gray-800 dark:text-gray-200 mb-3">Why It Works</h2>
            <div className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              <MathText content={topic.conceptExplanation.whyItWorks} />
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-gray-800 dark:text-gray-200 mb-3">When to Use</h2>
            <div className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              <MathText content={topic.conceptExplanation.whenToUse} />
            </div>
          </section>

          {topic.conceptExplanation.commonMistakes.length > 0 && (
            <section className="p-4 rounded-lg bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/30">
              <h2 className="text-[13px] font-semibold text-red-700 dark:text-red-400 mb-2">Common Mistakes</h2>
              <ul className="space-y-1.5">
                {topic.conceptExplanation.commonMistakes.map((m, i) => (
                  <li key={i} className="text-[13px] text-red-800/80 dark:text-red-300/80 flex gap-2">
                    <span className="shrink-0 mt-0.5">•</span>
                    <MathText content={m} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {topic.conceptExplanation.examTips && topic.conceptExplanation.examTips.length > 0 && (
            <section className="p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-900/30">
              <h2 className="text-[13px] font-semibold text-blue-700 dark:text-blue-400 mb-2">Exam Tips</h2>
              <ul className="space-y-1.5">
                {topic.conceptExplanation.examTips.map((t, i) => (
                  <li key={i} className="text-[13px] text-blue-800/80 dark:text-blue-300/80 flex gap-2">
                    <span className="shrink-0 mt-0.5">•</span>
                    <MathText content={t} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {activeTab === 'examples' && (
        <div className="space-y-8">
          {topic.workedExamples.map((ex, idx) => (
            <WorkedExampleCard key={ex.id} example={ex} index={idx + 1} />
          ))}
        </div>
      )}

      {activeTab === 'practice' && (
        <div>
          <div className="flex items-center gap-1.5 mb-5 flex-wrap">
            {(['all', 'basic', 'intermediate', 'gate', 'challenging', 'pyq', 'bookmarked', 'incorrect'] as const).map(f => (
              <button
                key={f}
                onClick={() => setPracticeFilter(f)}
                className={`text-[12px] px-2.5 py-1 rounded-full transition-colors ${
                  practiceFilter === f
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {f === 'pyq' ? `PYQs (${pyqs.length})` : f === 'all' ? `All (${topic.practiceQuestions.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {filteredQuestions.length === 0 ? (
            <p className="text-[13px] text-gray-400 dark:text-gray-500 py-8 text-center">No questions match this filter.</p>
          ) : (
            filteredQuestions.map(q => (
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

      {activeTab === 'formulas' && (
        <div className="space-y-4">
          {topic.formulas.map((f, i) => (
            <div key={i} className="p-4 rounded-lg border border-gray-150 dark:border-gray-800">
              <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 mb-2">{f.name}</h3>
              <div className="mb-2">
                <MathText content={`$$${f.latex}$$`} />
              </div>
              {f.variables && (
                <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
                  <span className="font-medium">Variables:</span> <MathText content={f.variables} />
                </p>
              )}
              {f.conditions && (
                <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
                  <span className="font-medium">Conditions:</span> <MathText content={f.conditions} />
                </p>
              )}
              {f.notes && (
                <p className="text-[12px] text-amber-600 dark:text-amber-400 mt-2">
                  <MathText content={f.notes} />
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkedExampleCard({ example, index }: { example: TopicContent['workedExamples'][0]; index: number }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="border border-gray-150 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500">Example {index}</span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${difficultyLabel(example.difficulty)}`}>
            {example.difficulty.toUpperCase()}
          </span>
        </div>
        <h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200 mb-2">{example.title}</h3>
        <div className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300">
          <MathText content={example.problem} />
        </div>
      </div>

      {!showSolution ? (
        <div className="px-5 pb-4">
          <button
            onClick={() => setShowSolution(true)}
            className="text-[13px] font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Show Solution
          </button>
        </div>
      ) : (
        <div className="px-5 pb-4 pt-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="space-y-2">
            {example.solution.map((step, i) => (
              <div key={i} className="text-[13px] leading-relaxed text-gray-700 dark:text-gray-300">
                <MathText content={step.explanation} />
                {step.latex && (
                  <div className="my-1">
                    <MathText content={`$$${step.latex}$$`} />
                  </div>
                )}
              </div>
            ))}
          </div>
          {example.alternativeApproach && (
            <div className="mt-3 p-3 rounded bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/40 dark:border-blue-800/30">
              <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mb-1">Alternative Approach</p>
              <div className="text-[13px] text-blue-800/80 dark:text-blue-300/80">
                <MathText content={example.alternativeApproach} />
              </div>
            </div>
          )}
          {example.examTip && (
            <div className="mt-2 p-3 rounded bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-800/30">
              <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 mb-1">Exam Tip</p>
              <div className="text-[13px] text-amber-800/80 dark:text-amber-300/80">
                <MathText content={example.examTip} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function difficultyLabel(d: string) {
  const map: Record<string, string> = {
    basic: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
    intermediate: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
    gate: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
    challenging: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30',
  };
  return map[d] || '';
}
