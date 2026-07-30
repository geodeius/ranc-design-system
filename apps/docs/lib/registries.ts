import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import {
  componentRegistrySchema,
  packageRegistrySchema,
  parseRegistry,
  tokenRegistrySchema,
} from '@rancard/documentation-schema';

import { getAllPages } from './content';

import type {
  ComponentRegistryEntry,
  PackageRegistryEntry,
  TokenRegistryEntry,
} from '@rancard/documentation-schema';

const repositoryRoot = path.resolve(process.cwd(), '../..');
const registryRoot = path.join(repositoryRoot, 'registries');

async function readJson(filePath: string): Promise<unknown> {
  return JSON.parse(await readFile(filePath, 'utf8')) as unknown;
}

export async function getComponentRegistry(): Promise<
  ComponentRegistryEntry[]
> {
  const source = path.join(registryRoot, 'components.json');
  return parseRegistry(
    componentRegistrySchema,
    await readJson(source),
    'registries/components.json',
  );
}

export async function getPackageRegistry(): Promise<PackageRegistryEntry[]> {
  const source = path.join(registryRoot, 'packages.json');
  return parseRegistry(
    packageRegistrySchema,
    await readJson(source),
    'registries/packages.json',
  );
}

export async function getTokenRegistry(): Promise<TokenRegistryEntry[]> {
  const source = path.join(registryRoot, 'tokens.json');
  return parseRegistry(
    tokenRegistrySchema,
    await readJson(source),
    'registries/tokens.json',
  );
}

export interface RegistrySearchEntry {
  category: string;
  description: string;
  status: ComponentRegistryEntry['status'];
  title: string;
  url: string;
}

export async function getRegistrySearchEntries(): Promise<
  RegistrySearchEntry[]
> {
  const [components, packages, tokens] = await Promise.all([
    getComponentRegistry(),
    getPackageRegistry(),
    getTokenRegistry(),
  ]);

  return [
    ...components.map((component) => ({
      category: `Component · ${component.category}`,
      description: `${component.platforms.join(', ')} · ${component.status}`,
      status: component.status,
      title: component.displayName,
      url: component.documentation,
    })),
    ...packages.map((packageEntry) => ({
      category: 'Package',
      description: `${packageEntry.private ? 'Private' : 'Public'} · ${packageEntry.status}`,
      status: packageEntry.status,
      title: packageEntry.name,
      url: packageEntry.documentation ?? '/packages',
    })),
    ...tokens.map((token) => ({
      category: `Token · ${token.group}`,
      description: `${token.platforms.join(', ')} · ${token.status}`,
      status: token.status,
      title: token.name,
      url: '/tokens',
    })),
  ];
}

export async function validateRegistryRelationships(): Promise<void> {
  const [components, packages, tokens] = await Promise.all([
    getComponentRegistry(),
    getPackageRegistry(),
    getTokenRegistry(),
  ]);
  const packageDirectories = await readdir(
    path.join(repositoryRoot, 'packages'),
    { withFileTypes: true },
  );
  const manifests = await Promise.all(
    packageDirectories
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const filePath = path.join(
          repositoryRoot,
          'packages',
          entry.name,
          'package.json',
        );
        return JSON.parse(await readFile(filePath, 'utf8')) as {
          name: string;
          private: boolean;
          rancard: { owners: string[]; status: string };
        };
      }),
  );
  const registryPackages = new Map(
    packages.map((packageEntry) => [packageEntry.name, packageEntry]),
  );

  for (const manifest of manifests) {
    const registryEntry = registryPackages.get(manifest.name);
    if (!registryEntry) {
      throw new Error(
        `Package manifest ${manifest.name} is missing from registries/packages.json.`,
      );
    }
    if (
      registryEntry.private !== manifest.private ||
      registryEntry.status !== manifest.rancard.status ||
      registryEntry.owners.join() !== manifest.rancard.owners.join()
    ) {
      throw new Error(
        `Package registry metadata for ${manifest.name} does not match its package manifest.`,
      );
    }
  }

  if (registryPackages.size !== manifests.length) {
    throw new Error(
      'registries/packages.json contains an entry without a package workspace.',
    );
  }

  const packageNames = new Set(packages.map((entry) => entry.name));
  const documentationPages = new Map(
    (await getAllPages()).map((page) => [page.url, page]),
  );

  for (const component of components) {
    const documentationPage = documentationPages.get(component.documentation);
    if (!documentationPage) {
      throw new Error(
        `Component ${component.name} references missing documentation ${component.documentation}.`,
      );
    }
    if (
      !('package' in documentationPage.frontmatter) ||
      documentationPage.frontmatter.title !== component.displayName ||
      documentationPage.frontmatter.status !== component.status ||
      documentationPage.frontmatter.owners.join() !== component.owners.join()
    ) {
      throw new Error(
        `Component registry metadata for ${component.name} does not match its documentation frontmatter.`,
      );
    }
    for (const packageName of Object.values(component.packages)) {
      if (!packageNames.has(packageName)) {
        throw new Error(
          `Component ${component.name} references unknown package ${packageName}.`,
        );
      }
    }
    if (
      !Object.values(component.packages).includes(
        documentationPage.frontmatter.package,
      )
    ) {
      throw new Error(
        `Component ${component.name} documentation references an unregistered package.`,
      );
    }
  }

  void tokens;
}
