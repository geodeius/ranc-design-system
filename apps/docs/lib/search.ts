import { getAllPages } from './content';
import { getRegistrySearchEntries } from './registries';

import type { SearchEntry } from './search-filter';

export async function getSearchIndex(): Promise<SearchEntry[]> {
  const [pages, registryEntries] = await Promise.all([
    getAllPages(),
    getRegistrySearchEntries(),
  ]);
  const entries = new Map<string, SearchEntry>();

  for (const page of pages) {
    const category = page.breadcrumbs.at(1)?.label ?? page.frontmatter.category;
    entries.set(page.url, {
      category,
      description: page.frontmatter.description,
      kind: 'page',
      status: page.frontmatter.status,
      title: page.frontmatter.title,
      url: page.url,
    });

    for (const heading of page.tableOfContents) {
      entries.set(`${page.url}#${heading.id}`, {
        category: `${category} · ${page.frontmatter.title}`,
        description: `Section in ${page.frontmatter.title}`,
        kind: 'heading',
        status: page.frontmatter.status,
        title: heading.title,
        url: `${page.url}#${heading.id}`,
      });
    }
  }

  for (const registryEntry of registryEntries) {
    const existing = entries.get(registryEntry.url);
    if (existing?.title === registryEntry.title) {
      entries.set(registryEntry.url, {
        ...existing,
        category: registryEntry.category,
        description: registryEntry.description,
      });
      continue;
    }

    entries.set(`registry:${registryEntry.title}:${registryEntry.url}`, {
      ...registryEntry,
      kind: 'registry',
    });
  }

  return [...entries.values()];
}
