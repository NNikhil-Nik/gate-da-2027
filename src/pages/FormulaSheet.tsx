import { useState } from 'react';
import { MathText } from '../components/Math';
import type { Module } from '../types/content';

interface Props {
  modules: Module[];
}

export function FormulaSheet({ modules }: Props) {
  const [activeModule, setActiveModule] = useState(modules[0]?.id || '');

  const currentModule = modules.find(m => m.id === activeModule);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Formula Sheet</h1>
      <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-6">Quick reference for all formulas across modules.</p>

      <div className="flex gap-1 mb-6">
        {modules.map(mod => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={`px-3 py-1.5 rounded text-[12px] font-medium transition-colors ${
              activeModule === mod.id
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {mod.title}
          </button>
        ))}
      </div>

      {currentModule && (
        <div className="space-y-8">
          {currentModule.topics.map(topic => (
            <div key={topic.id}>
              <h2 className="text-[14px] font-semibold text-gray-800 dark:text-gray-200 mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                {topic.title}
              </h2>
              <div className="space-y-3">
                {topic.formulas.map((f, i) => (
                  <div key={i} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                    <p className="text-[12px] font-medium text-gray-600 dark:text-gray-300 mb-1">{f.name}</p>
                    <MathText content={`$$${f.latex}$$`} />
                    {f.variables && (
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                        <MathText content={f.variables} />
                      </p>
                    )}
                    {f.conditions && (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">
                        <MathText content={f.conditions} />
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
