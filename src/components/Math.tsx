import katex from 'katex';
import { useMemo } from 'react';

interface MathProps {
  tex: string;
  display?: boolean;
  className?: string;
}

export function Math({ tex, display = false, className = '' }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return `<span style="color:red">Error: ${tex}</span>`;
    }
  }, [tex, display]);

  if (display) {
    return (
      <div
        className={`my-3 overflow-x-auto ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface MarkdownMathProps {
  content: string;
  className?: string;
}

export function MathText({ content, className = '' }: MarkdownMathProps) {
  const parts = useMemo(() => {
    const result: { type: 'text' | 'display-math' | 'inline-math'; value: string }[] = [];
    const regex = /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        result.push({ type: 'text', value: content.slice(lastIndex, match.index) });
      }
      if (match[1] !== undefined) {
        result.push({ type: 'display-math', value: match[1] });
      } else if (match[2] !== undefined) {
        result.push({ type: 'inline-math', value: match[2] });
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      result.push({ type: 'text', value: content.slice(lastIndex) });
    }

    return result;
  }, [content]);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.type === 'display-math') {
          return <Math key={i} tex={part.value} display />;
        }
        if (part.type === 'inline-math') {
          return <Math key={i} tex={part.value} />;
        }
        return <span key={i}>{part.value}</span>;
      })}
    </span>
  );
}
