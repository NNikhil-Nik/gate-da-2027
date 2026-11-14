import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Module, UserProgress } from '../types/content';

interface Props {
  modules: Module[];
  progress: UserProgress;
}

export function Stats({ modules, progress }: Props) {
  const moduleStats = useMemo(() => {
    return modules.map(mod => {
      const allQs = mod.topics.flatMap(t => t.practiceQuestions);
      const attempted = allQs.filter(q => progress.questionAttempts[q.id]);
      const correct = attempted.filter(q => progress.questionAttempts[q.id]?.correct);
      const completedTopics = mod.topics.filter(t => progress.completedTopics.includes(t.id));
      return {
        name: mod.title.replace('Module ', 'M').split(':')[0] || mod.title,
        shortName: 'M' + mod.id.replace('module', ''),
        totalQuestions: allQs.length,
        attempted: attempted.length,
        correct: correct.length,
        accuracy: attempted.length > 0 ? Math.round((correct.length / attempted.length) * 100) : 0,
        topicsCompleted: completedTopics.length,
        totalTopics: mod.topics.length,
      };
    });
  }, [modules, progress]);

  const topicStats = useMemo(() => {
    return modules.flatMap(mod =>
      mod.topics.map(topic => {
        const attempted = topic.practiceQuestions.filter(q => progress.questionAttempts[q.id]);
        const correct = attempted.filter(q => progress.questionAttempts[q.id]?.correct);
        return {
          name: topic.title.length > 20 ? topic.title.slice(0, 20) + '...' : topic.title,
          fullName: topic.title,
          attempted: attempted.length,
          correct: correct.length,
          total: topic.practiceQuestions.length,
          accuracy: attempted.length > 0 ? Math.round((correct.length / attempted.length) * 100) : 0,
        };
      })
    );
  }, [modules, progress]);

  const totalAttempted = Object.keys(progress.questionAttempts).length;
  const totalCorrect = Object.values(progress.questionAttempts).filter(a => a.correct).length;
  const totalIncorrect = totalAttempted - totalCorrect;
  const totalUnattempted = modules.reduce((sum, m) => sum + m.topics.reduce((s, t) => s + t.practiceQuestions.length, 0), 0) - totalAttempted;

  const pieData = [
    { name: 'Correct', value: totalCorrect, color: '#10b981' },
    { name: 'Incorrect', value: totalIncorrect, color: '#ef4444' },
    { name: 'Unattempted', value: totalUnattempted, color: '#e5e7eb' },
  ].filter(d => d.value > 0);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Performance Statistics</h1>
      <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-6">Track your progress and identify weak areas.</p>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="p-3 rounded-lg border border-gray-150 dark:border-gray-800">
          <p className="text-[18px] font-semibold text-gray-900 dark:text-gray-100">{totalAttempted}</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">Attempted</p>
        </div>
        <div className="p-3 rounded-lg border border-gray-150 dark:border-gray-800">
          <p className="text-[18px] font-semibold text-emerald-600 dark:text-emerald-400">{totalCorrect}</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">Correct</p>
        </div>
        <div className="p-3 rounded-lg border border-gray-150 dark:border-gray-800">
          <p className="text-[18px] font-semibold text-red-600 dark:text-red-400">{totalIncorrect}</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">Incorrect</p>
        </div>
        <div className="p-3 rounded-lg border border-gray-150 dark:border-gray-800">
          <p className="text-[18px] font-semibold text-gray-900 dark:text-gray-100">
            {totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0}%
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">Accuracy</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-3">Overall Distribution</h2>
          <div className="h-48">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" strokeWidth={0}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value} questions`, name]}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[13px] text-gray-400 dark:text-gray-500">
                No attempts yet
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-4 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-[11px] text-gray-500 dark:text-gray-400">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-3">Module Accuracy</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleStats} barSize={24}>
                <XAxis dataKey="shortName" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Accuracy']}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-3">Topic-wise Progress</h2>
        <div className="space-y-2">
          {topicStats.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[12px] text-gray-600 dark:text-gray-400 w-44 truncate shrink-0" title={t.fullName}>{t.fullName}</span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${t.total > 0 ? (t.attempted / t.total) * 100 : 0}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 w-20 text-right shrink-0">
                {t.attempted}/{t.total} &middot; {t.accuracy}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
