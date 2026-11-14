import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '../types/content';

const STORAGE_KEY = 'gate-da-2027-progress';

const defaultProgress: UserProgress = {
  completedTopics: [],
  bookmarkedQuestions: [],
  incorrectQuestions: [],
  questionAttempts: {},
  topicNotes: {},
};

function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultProgress, ...JSON.parse(stored) };
    }
  } catch {
    // corrupted data, reset
  }
  return defaultProgress;
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleTopicComplete = useCallback((topicId: string) => {
    setProgress(prev => {
      const completed = prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId];
      return { ...prev, completedTopics: completed };
    });
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    setProgress(prev => {
      const bookmarked = prev.bookmarkedQuestions.includes(questionId)
        ? prev.bookmarkedQuestions.filter(id => id !== questionId)
        : [...prev.bookmarkedQuestions, questionId];
      return { ...prev, bookmarkedQuestions: bookmarked };
    });
  }, []);

  const recordAttempt = useCallback((questionId: string, answer: string | string[], correct: boolean) => {
    setProgress(prev => {
      const incorrectQuestions = correct
        ? prev.incorrectQuestions.filter(id => id !== questionId)
        : prev.incorrectQuestions.includes(questionId)
          ? prev.incorrectQuestions
          : [...prev.incorrectQuestions, questionId];
      return {
        ...prev,
        questionAttempts: {
          ...prev.questionAttempts,
          [questionId]: { answer, correct, timestamp: Date.now() },
        },
        incorrectQuestions,
      };
    });
  }, []);

  const clearAttempt = useCallback((questionId: string) => {
    setProgress(prev => {
      const { [questionId]: _, ...rest } = prev.questionAttempts;
      return {
        ...prev,
        questionAttempts: rest,
        incorrectQuestions: prev.incorrectQuestions.filter(id => id !== questionId),
      };
    });
  }, []);

  const getStats = useCallback(() => {
    const totalAttempts = Object.keys(progress.questionAttempts).length;
    const correctAttempts = Object.values(progress.questionAttempts).filter(a => a.correct).length;
    return {
      totalAttempts,
      correctAttempts,
      accuracy: totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
      completedTopics: progress.completedTopics.length,
      bookmarkedCount: progress.bookmarkedQuestions.length,
      incorrectCount: progress.incorrectQuestions.length,
    };
  }, [progress]);

  return {
    progress,
    toggleTopicComplete,
    toggleBookmark,
    recordAttempt,
    clearAttempt,
    getStats,
  };
}
