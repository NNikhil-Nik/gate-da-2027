import { useState, useCallback } from 'react';
import { MathText } from './Math';
import type { PracticeQuestion as PQ } from '../types/content';

interface Props {
  question: PQ;
  isBookmarked: boolean;
  previousAttempt?: { answer: string | string[]; correct: boolean };
  onBookmark: (id: string) => void;
  onAttempt: (id: string, answer: string | string[], correct: boolean) => void;
  onClearAttempt: (id: string) => void;
}

const difficultyColors: Record<string, string> = {
  basic: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
  intermediate: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
  gate: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
  challenging: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30',
};

export function PracticeQuestionCard({ question, isBookmarked, previousAttempt, onBookmark, onAttempt, onClearAttempt }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    previousAttempt?.answer ?? (question.format === 'MSQ' ? [] : '')
  );
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(!!previousAttempt);
  const [isCorrect, setIsCorrect] = useState(previousAttempt?.correct ?? false);
  const [natInput, setNatInput] = useState(typeof previousAttempt?.answer === 'string' ? previousAttempt.answer : '');

  const handleMCQSelect = useCallback((label: string) => {
    if (submitted) return;
    setSelectedAnswer(label);
  }, [submitted]);

  const handleMSQToggle = useCallback((label: string) => {
    if (submitted) return;
    setSelectedAnswer(prev => {
      const arr = Array.isArray(prev) ? prev : [];
      return arr.includes(label) ? arr.filter(l => l !== label) : [...arr, label];
    });
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (submitted) return;

    let answer: string | string[];
    let correct: boolean;

    if (question.format === 'NAT') {
      answer = natInput.trim();
      const userVal = parseFloat(answer);
      const correctVal = parseFloat(question.correctAnswer as string);
      correct = !isNaN(userVal) && Math.abs(userVal - correctVal) <= Math.max(0.02 * Math.abs(correctVal), 0.01);
    } else if (question.format === 'MSQ') {
      answer = Array.isArray(selectedAnswer) ? [...selectedAnswer].sort() : [selectedAnswer];
      const correctArr = Array.isArray(question.correctAnswer)
        ? [...question.correctAnswer].sort()
        : [question.correctAnswer];
      correct = JSON.stringify(answer) === JSON.stringify(correctArr);
    } else {
      answer = selectedAnswer as string;
      correct = answer === question.correctAnswer;
    }

    setIsCorrect(correct);
    setSubmitted(true);
    onAttempt(question.id, answer, correct);
  }, [submitted, question, selectedAnswer, natInput, onAttempt]);

  const handleRetry = useCallback(() => {
    setSelectedAnswer(question.format === 'MSQ' ? [] : '');
    setNatInput('');
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint1(false);
    setShowHint2(false);
    setShowSolution(false);
    onClearAttempt(question.id);
  }, [question, onClearAttempt]);

  const canSubmit = question.format === 'NAT'
    ? natInput.trim() !== ''
    : question.format === 'MSQ'
      ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0
      : selectedAnswer !== '';

  return (
    <div className="border border-gray-150 dark:border-gray-800 rounded-lg p-5 mb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${difficultyColors[question.difficulty]}`}>
            {question.difficulty.toUpperCase()}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {question.format}
          </span>
          {question.isPYQ && question.pyqMeta && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400">
              GATE {question.pyqMeta.year} &middot; {question.pyqMeta.marks}M
            </span>
          )}
          {submitted && (
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
            }`}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          )}
        </div>
        <button
          onClick={() => onBookmark(question.id)}
          className={`shrink-0 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isBookmarked ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600'
          }`}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
            <path d="M3 2h10v13l-5-3-5 3V2z" />
          </svg>
        </button>
      </div>

      <div className="text-[14px] leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
        <MathText content={question.question} />
      </div>

      {question.format === 'MCQ' && question.options && (
        <div className="space-y-2 mb-4">
          {question.options.map(opt => {
            const isSelected = selectedAnswer === opt.label;
            const isCorrectOption = opt.label === question.correctAnswer;
            let style = 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600';
            if (submitted) {
              if (isCorrectOption) style = 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20';
              else if (isSelected && !isCorrect) style = 'border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/20';
            } else if (isSelected) {
              style = 'border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20';
            }
            return (
              <button
                key={opt.label}
                onClick={() => handleMCQSelect(opt.label)}
                disabled={submitted}
                className={`w-full text-left px-4 py-2.5 rounded border text-[13px] transition-colors ${style}`}
              >
                <span className="font-medium text-gray-500 dark:text-gray-400 mr-2">({opt.label})</span>
                <MathText content={opt.text} />
              </button>
            );
          })}
        </div>
      )}

      {question.format === 'MSQ' && question.options && (
        <div className="space-y-2 mb-4">
          {question.options.map(opt => {
            const isSelected = Array.isArray(selectedAnswer) && selectedAnswer.includes(opt.label);
            const correctArr = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
            const isCorrectOption = correctArr.includes(opt.label);
            let style = 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600';
            if (submitted) {
              if (isCorrectOption) style = 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20';
              else if (isSelected) style = 'border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/20';
            } else if (isSelected) {
              style = 'border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20';
            }
            return (
              <button
                key={opt.label}
                onClick={() => handleMSQToggle(opt.label)}
                disabled={submitted}
                className={`w-full text-left px-4 py-2.5 rounded border text-[13px] transition-colors flex items-center gap-2 ${style}`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                  isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {isSelected && '✓'}
                </span>
                <span>
                  <span className="font-medium text-gray-500 dark:text-gray-400 mr-2">({opt.label})</span>
                  <MathText content={opt.text} />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {question.format === 'NAT' && (
        <div className="mb-4">
          <input
            type="text"
            value={natInput}
            onChange={e => setNatInput(e.target.value)}
            disabled={submitted}
            placeholder="Enter your numerical answer..."
            className={`w-full max-w-xs px-3 py-2 rounded border text-[13px] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${
              submitted
                ? isCorrect
                  ? 'border-emerald-400 dark:border-emerald-600'
                  : 'border-red-400 dark:border-red-600'
                : 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none'
            }`}
          />
          {submitted && !isCorrect && (
            <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
              Correct answer: <MathText content={`$${question.correctAnswer}$`} />
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="px-4 py-1.5 rounded text-[13px] font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        )}
        {submitted && (
          <button
            onClick={handleRetry}
            className="px-4 py-1.5 rounded text-[13px] font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Retry
          </button>
        )}
        {question.hints.length > 0 && !showHint1 && (
          <button
            onClick={() => setShowHint1(true)}
            className="px-3 py-1.5 rounded text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Hint 1
          </button>
        )}
        {showHint1 && question.hints.length > 1 && !showHint2 && (
          <button
            onClick={() => setShowHint2(true)}
            className="px-3 py-1.5 rounded text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Hint 2
          </button>
        )}
        {!showSolution && (
          <button
            onClick={() => setShowSolution(true)}
            className="px-3 py-1.5 rounded text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Show Solution
          </button>
        )}
      </div>

      {showHint1 && question.hints[0] && (
        <div className="mt-3 p-3 rounded bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30">
          <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 mb-1">Hint 1</p>
          <div className="text-[13px] text-gray-700 dark:text-gray-300">
            <MathText content={question.hints[0].text} />
          </div>
        </div>
      )}
      {showHint2 && question.hints[1] && (
        <div className="mt-2 p-3 rounded bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30">
          <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 mb-1">Hint 2</p>
          <div className="text-[13px] text-gray-700 dark:text-gray-300">
            <MathText content={question.hints[1].text} />
          </div>
        </div>
      )}

      {showSolution && (
        <div className="mt-3 p-4 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mb-2">Solution</p>
          <div className="space-y-2">
            {question.solution.map((step, i) => (
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
          {question.explanation && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1">Key Takeaway</p>
              <div className="text-[13px] text-gray-600 dark:text-gray-400">
                <MathText content={question.explanation} />
              </div>
            </div>
          )}
          {question.commonMistakes && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <p className="text-[11px] font-medium text-red-500 dark:text-red-400 mb-1">Common Mistakes</p>
              <div className="text-[13px] text-gray-600 dark:text-gray-400">
                <MathText content={question.commonMistakes} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
