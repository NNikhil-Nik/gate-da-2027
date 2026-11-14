import { Link } from 'react-router-dom';
import type { Module, UserProgress } from '../types/content';

interface Props {
  modules: Module[];
  progress: UserProgress;
  stats: { totalAttempts: number; correctAttempts: number; accuracy: number; completedTopics: number; bookmarkedCount: number; incorrectCount: number };
}

export function Home({ modules, progress, stats }: Props) {
  const totalTopics = modules.reduce((sum, m) => sum + m.topics.length, 0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">GATE DA 2027 — Probability & Statistics</h1>
        <p className="text-[14px] text-gray-500 dark:text-gray-400">Interactive learning platform for GATE Data Science and AI preparation.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <StatCard label="Topics Done" value={`${stats.completedTopics}/${totalTopics}`} />
        <StatCard label="Questions" value={String(stats.totalAttempts)} />
        <StatCard label="Accuracy" value={`${stats.accuracy}%`} />
        <StatCard label="Bookmarked" value={String(stats.bookmarkedCount)} />
      </div>

      <div className="space-y-6">
        {modules.map(mod => {
          const completedCount = mod.topics.filter(t => progress.completedTopics.includes(t.id)).length;
          const totalCount = mod.topics.length;
          const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <div key={mod.id}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-[15px] font-semibold text-gray-800 dark:text-gray-200">{mod.title}</h2>
                  <p className="text-[12px] text-gray-400 dark:text-gray-500">{mod.dayRange} &middot; {completedCount}/{totalCount} topics</p>
                </div>
                <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500">{pct}%</span>
              </div>

              <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="space-y-1">
                {mod.topics.map(topic => {
                  const done = progress.completedTopics.includes(topic.id);
                  const qCount = topic.practiceQuestions.length;
                  const pyqCount = topic.practiceQuestions.filter(q => q.isPYQ).length;
                  return (
                    <Link
                      key={topic.id}
                      to={`/topic/${topic.id}`}
                      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900 group"
                    >
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                        done
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500'
                      }`}>
                        {done && '✓'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                          {topic.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {pyqCount > 0 && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-950/30 text-violet-500 dark:text-violet-400">
                            {pyqCount} PYQ{pyqCount > 1 ? 's' : ''}
                          </span>
                        )}
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                          {qCount}q
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-gray-150 dark:border-gray-800">
      <p className="text-[18px] font-semibold text-gray-900 dark:text-gray-100">{value}</p>
      <p className="text-[11px] text-gray-400 dark:text-gray-500">{label}</p>
    </div>
  );
}
