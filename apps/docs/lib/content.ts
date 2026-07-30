import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import { parsePageFrontmatter } from '@rancard/documentation-schema';
import GithubSlugger from 'github-slugger';
import matter from 'gray-matter';

import type { PageFrontmatter } from '@rancard/documentation-schema';

export interface TableOfContentsItem {
  depth: 2 | 3;
  id: string;
  title: string;
}

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface DocumentationPage {
  body: string;
  breadcrumbs: Breadcrumb[];
  filePath: string;
  frontmatter: PageFrontmatter;
  slug: string[];
  tableOfContents: TableOfContentsItem[];
  url: string;
}

export interface NavigationGroup {
  label: string;
  pages: Array<Pick<DocumentationPage, 'frontmatter' | 'url'>>;
}

const contentRoot = path.resolve(process.cwd(), '../../content');

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(entryPath) : [entryPath];
    }),
  );

  return files
    .flat()
    .filter((file) => file.endsWith('.mdx'))
    .sort();
}

function titleCase(value: string): string {
  return value
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function extractTableOfContents(source: string): TableOfContentsItem[] {
  const slugger = new GithubSlugger();
  const headings: TableOfContentsItem[] = [];

  for (const line of source.split('\n')) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match?.[1] || !match[2]) continue;

    const title = match[2]
      .replace(/[`_*[\]]/g, '')
      .replace(/\([^)]*\)/g, '')
      .trim();

    headings.push({
      depth: match[1].length as 2 | 3,
      id: slugger.slug(title),
      title,
    });
  }

  return headings;
}

function createBreadcrumbs(slug: string[], title: string): Breadcrumb[] {
  return [
    { label: 'Documentation', url: '/' },
    ...slug.map((segment, index) => ({
      label: index === slug.length - 1 ? title : titleCase(segment),
      url: `/${slug.slice(0, index + 1).join('/')}`,
    })),
  ];
}

export async function getAllPages(): Promise<DocumentationPage[]> {
  const files = await walk(contentRoot);
  const pages = await Promise.all(
    files.map(async (filePath) => {
      const source = await readFile(filePath, 'utf8');
      const parsed = matter(source);
      const relativePath = path.relative(contentRoot, filePath);
      const slug = relativePath.replace(/\.mdx$/, '').split(path.sep);
      const frontmatter = parsePageFrontmatter(parsed.data, relativePath);

      return {
        body: parsed.content,
        breadcrumbs: createBreadcrumbs(slug, frontmatter.title),
        filePath,
        frontmatter,
        slug,
        tableOfContents: extractTableOfContents(parsed.content),
        url: `/${slug.join('/')}`,
      };
    }),
  );

  return pages.sort(
    (left, right) =>
      left.frontmatter.order - right.frontmatter.order ||
      left.frontmatter.title.localeCompare(right.frontmatter.title),
  );
}

export async function getPage(
  slug: string[],
): Promise<DocumentationPage | undefined> {
  const pages = await getAllPages();
  return pages.find((page) => page.slug.join('/') === slug.join('/'));
}

export async function getNavigation(): Promise<NavigationGroup[]> {
  const pages = await getAllPages();
  const groups = new Map<string, NavigationGroup>();

  for (const page of pages) {
    const key = page.slug[0] ?? page.frontmatter.category;
    const group = groups.get(key) ?? { label: titleCase(key), pages: [] };
    group.pages.push({ frontmatter: page.frontmatter, url: page.url });
    groups.set(key, group);
  }

  return [...groups.values()];
}

export async function getAdjacentPages(slug: string[]) {
  const pages = await getAllPages();
  const index = pages.findIndex(
    (page) => page.slug.join('/') === slug.join('/'),
  );

  return {
    next: index >= 0 ? pages[index + 1] : undefined,
    previous: index > 0 ? pages[index - 1] : undefined,
  };
}
