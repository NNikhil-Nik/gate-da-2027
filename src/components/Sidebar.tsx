import { NavLink, useParams } from 'react-router-dom';
import type { Module } from '../types/content';

interface SidebarProps {
  modules: Module[];
  completedTopics: string[];
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ modules, completedTopics, collapsed, onToggle }: SidebarProps) {
  const { topicId } = useParams();

  if (collapsed) {
    return (
      <aside className="w-12 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col items-center py-4 shrink-0">
        <button
          onClick={onToggle}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          aria-label="Expand sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col shrink-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <NavLink to="/" className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          GATE DA 2027
        </NavLink>
        <button
          onClick={onToggle}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
          aria-label="Collapse sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3l-5 5 5 5" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {modules.map(mod => (
          <div key={mod.id} className="mb-1">
            <div className="px-4 py-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {mod.title}
              </span>
              <span className="text-[10px] text-gray-300 dark:text-gray-600 ml-1.5">
                {mod.dayRange}
              </span>
            </div>
            {mod.topics.map(topic => {
              const isComplete = completedTopics.includes(topic.id);
              const isActive = topicId === topic.id;
              return (
                <NavLink
                  key={topic.id}
                  to={`/topic/${topic.id}`}
                  className={`flex items-center gap-2 px-4 py-1.5 mx-2 rounded text-[13px] leading-snug transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[9px] ${
                    isComplete
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {isComplete && '✓'}
                  </span>
                  <span className="truncate">{topic.title}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2">
        <NavLink
          to="/formulas"
          className={({ isActive }) =>
            `block py-1.5 text-[13px] ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`
          }
        >
          Formula Sheet
        </NavLink>
        <NavLink
          to="/practice"
          className={({ isActive }) =>
            `block py-1.5 text-[13px] ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`
          }
        >
          Practice Mode
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `block py-1.5 text-[13px] ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`
          }
        >
          Statistics
        </NavLink>
        <NavLink
          to="/revision"
          className={({ isActive }) =>
            `block py-1.5 text-[13px] ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`
          }
        >
          Revision Mode
        </NavLink>
      </div>
    </aside>
  );
}
