import { useState, useMemo } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopicViewer } from './components/TopicViewer';
import { Home } from './pages/Home';
import { FormulaSheet } from './pages/FormulaSheet';
import { PracticeMode } from './pages/PracticeMode';
import { Stats } from './pages/Stats';
import { Revision } from './pages/Revision';
import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { allModules } from './content';
import type { TopicContent } from './types/content';

function TopicPage({ topicMap, ...rest }: {
  topicMap: Map<string, TopicContent>;
  progress: ReturnType<typeof useProgress>['progress'];
  onToggleComplete: (id: string) => void;
  onBookmark: (id: string) => void;
  onAttempt: (id: string, answer: string | string[], correct: boolean) => void;
  onClearAttempt: (id: string) => void;
}) {
  const { topicId } = useParams();
  const topic = topicId ? topicMap.get(topicId) : undefined;

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <p className="text-[14px] text-gray-400 dark:text-gray-500">Topic not found.</p>
      </div>
    );
  }

  return <TopicViewer topic={topic} {...rest} />;
}

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const { progress, toggleTopicComplete, toggleBookmark, recordAttempt, clearAttempt, getStats } = useProgress();

  const topicMap = useMemo(() => {
    const map = new Map<string, TopicContent>();
    for (const mod of allModules) {
      for (const topic of mod.topics) {
        map.set(topic.id, topic);
      }
    }
    return map;
  }, []);

  const stats = getStats();

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Sidebar
        modules={allModules}
        completedTopics={progress.completedTopics}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-6 py-2.5 flex items-center justify-end gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 1v1m0 12v1m7-7h-1M2 8H1m12.07-4.07-.71.71M4.64 11.36l-.71.71m9.14 0-.71-.71M4.64 4.64l-.71-.71" />
                <circle cx="8" cy="8" r="3" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13.36 10.36a6 6 0 01-7.72-7.72A6 6 0 1013.36 10.36z" />
              </svg>
            )}
          </button>
          <span className="text-[11px] text-gray-300 dark:text-gray-600">
            {stats.completedTopics} topics &middot; {stats.accuracy}% accuracy
          </span>
        </header>

        <div className="px-6 py-8">
          <Routes>
            <Route index element={<Home modules={allModules} progress={progress} stats={stats} />} />
            <Route
              path="topic/:topicId"
              element={
                <TopicPage
                  topicMap={topicMap}
                  progress={progress}
                  onToggleComplete={toggleTopicComplete}
                  onBookmark={toggleBookmark}
                  onAttempt={recordAttempt}
                  onClearAttempt={clearAttempt}
                />
              }
            />
            <Route path="formulas" element={<FormulaSheet modules={allModules} />} />
            <Route
              path="practice"
              element={
                <PracticeMode
                  modules={allModules}
                  progress={progress}
                  onBookmark={toggleBookmark}
                  onAttempt={recordAttempt}
                  onClearAttempt={clearAttempt}
                />
              }
            />
            <Route path="stats" element={<Stats modules={allModules} progress={progress} />} />
            <Route
              path="revision"
              element={
                <Revision
                  modules={allModules}
                  progress={progress}
                  onBookmark={toggleBookmark}
                  onAttempt={recordAttempt}
                  onClearAttempt={clearAttempt}
                />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
