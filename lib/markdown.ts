import 'server-only';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { showTodos } from './todo';

const root = join(process.cwd(), 'content');

/**
 * Markdown → HTML. Alinea's die met "TODO" beginnen worden in productie
 * weggelaten en in dev als gele markering getoond. keepTodos = altijd tonen
 * (juridische pagina's).
 */
export function renderMarkdown(md: string, keepTodos = false): string {
  const blocks = md.split(/\n{2,}/).flatMap((b) => {
    if (!/^\s*TODO\b/.test(b)) return [b];
    if (!(showTodos || keepTodos)) return [];
    const safe = b.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return [`<div data-todo class="rounded-lg border border-dashed border-todo bg-todo-bg px-4 py-3 text-sm text-todo">${safe}</div>`];
  });
  return marked.parse(blocks.join('\n\n'), { async: false }) as string;
}

export type MdFile<T> = { slug: string; data: T; html: string; body: string };

export function readMd<T>(dir: string, slug: string, keepTodos = false): MdFile<T> {
  const raw = readFileSync(join(root, dir, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  return { slug, data: data as T, html: renderMarkdown(content, keepTodos), body: content };
}

export function readMdDir<T>(dir: string, keepTodos = false): MdFile<T>[] {
  return readdirSync(join(root, dir))
    .filter((f) => f.endsWith('.md'))
    .map((f) => readMd<T>(dir, f.replace(/\.md$/, ''), keepTodos));
}

export function readMdRoot<T>(file: string): MdFile<T> {
  const raw = readFileSync(join(root, file), 'utf8');
  const { data, content } = matter(raw);
  return { slug: file, data: data as T, html: renderMarkdown(content), body: content };
}
