import { getAllPages } from './content';
import {
  getComponentRegistry,
  getPackageRegistry,
  getTokenRegistry,
} from './registries';

const staticRoutes = ['/', '/components', '/packages', '/tokens'];

export function extractInternalLinks(source: string): string[] {
  const links = [
    ...source.matchAll(/\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g),
    ...source.matchAll(/href=["']([^"']+)["']/g),
  ].flatMap((match) => (match[1] ? [match[1]] : []));

  return links.filter(
    (link) =>
      link.startsWith('/') || (link.startsWith('#') && !link.startsWith('#!')),
  );
}

export function validateInternalTargets(
  links: Array<{ source: string; target: string }>,
  knownTargets: Set<string>,
): string[] {
  return links.flatMap(({ source, target }) => {
    const normalized =
      target.endsWith('/') && target !== '/' ? target.slice(0, -1) : target;
    return knownTargets.has(normalized)
      ? []
      : [`${source} references missing internal target ${target}.`];
  });
}

export async function validateInternalLinks(): Promise<string[]> {
  const [pages, components, packages, tokens] = await Promise.all([
    getAllPages(),
    getComponentRegistry(),
    getPackageRegistry(),
    getTokenRegistry(),
  ]);
  const knownTargets = new Set(staticRoutes);
  const links: Array<{ source: string; target: string }> = [];

  for (const page of pages) {
    knownTargets.add(page.url);
    for (const heading of page.tableOfContents) {
      knownTargets.add(`${page.url}#${heading.id}`);
    }
  }

  for (const component of components) {
    knownTargets.add(`/components/category/${component.category}`);
    links.push({
      source: `component registry entry ${component.name}`,
      target: component.documentation,
    });
  }

  for (const page of pages) {
    for (const target of extractInternalLinks(page.body)) {
      links.push({
        source: page.url,
        target: target.startsWith('#') ? `${page.url}${target}` : target,
      });
    }
  }

  for (const packageEntry of packages) {
    if (packageEntry.documentation) {
      links.push({
        source: `package registry entry ${packageEntry.name}`,
        target: packageEntry.documentation,
      });
    }
  }

  void tokens;
  return validateInternalTargets(links, knownTargets);
}
