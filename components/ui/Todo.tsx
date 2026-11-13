import { showTodos } from '@/lib/todo';

/** Gele TODO-markering: alleen in dev of met NEXT_PUBLIC_PREVIEW=true. */
export function Todo({ text, block = false }: { text?: string; block?: boolean }) {
  if (!showTodos) return null;
  const label = (text ?? '').replace(/^\s*TODO:?\s*/i, '');
  const Tag = block ? 'div' : 'span';
  return (
    <Tag data-todo className={`rounded-md border border-dashed border-todo bg-todo-bg text-sm font-medium text-todo ${block ? 'block px-4 py-3' : 'inline-block px-2 py-0.5'}`}>
      TODO{label ? `: ${label}` : ''}
    </Tag>
  );
}

/** Tekst met mogelijk een TODO-staart: in productie alleen het echte deel. */
export function TodoText({ text, className, as: Tag = 'p' }: { text: string; className?: string; as?: 'p' | 'span' | 'div' }) {
  const i = text.search(/\bTODO\b/);
  const real = (i === -1 ? text : text.slice(0, i)).trim();
  const todo = i === -1 ? '' : text.slice(i);
  if (!real && !(todo && showTodos)) return null;
  return (
    <Tag className={className}>
      <span dangerouslySetInnerHTML={{ __html: real }} />
      {todo && showTodos ? <> <Todo text={todo} /></> : null}
    </Tag>
  );
}
