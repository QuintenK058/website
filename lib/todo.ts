/** TODO-placeholders: zichtbaar in dev/preview, verborgen in productie. */
export const showTodos = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_PREVIEW === 'true';

export const isTodo = (v: unknown): boolean => typeof v === 'string' && /^\s*TODO\b/i.test(v);

export function filled<T>(v: T | null | undefined): T | undefined {
  if (v == null) return undefined;
  if (typeof v === 'string' && (v.trim() === '' || isTodo(v))) return undefined;
  return v;
}

/** Strip alles vanaf "TODO" (voor meta-tags, schema's en productie). */
export function stripTodo(text: string): string {
  const i = text.search(/\bTODO\b/);
  return (i === -1 ? text : text.slice(0, i)).trim();
}
