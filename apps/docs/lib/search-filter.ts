export type SearchEntryKind = 'heading' | 'page' | 'registry';

export interface SearchEntry {
  category: string;
  description: string;
  kind: SearchEntryKind;
  status: string;
  title: string;
  url: string;
}

export function searchIndex(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (terms.length === 0) return entries;

  return entries.filter((entry) => {
    const searchable = [
      entry.title,
      entry.category,
      entry.description,
      entry.status,
      entry.kind,
    ]
      .join(' ')
      .toLowerCase();

    return terms.every((term) => searchable.includes(term));
  });
}
