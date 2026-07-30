import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

export const expectedWorkspaces = [
  'apps/docs',
  'apps/playground',
  'packages/cli',
  'packages/css',
  'packages/documentation-schema',
  'packages/eslint-config',
  'packages/icons',
  'packages/react',
  'packages/react-native',
  'packages/themes',
  'packages/tokens',
  'packages/typescript-config',
];

export async function readManifest(root, workspace) {
  const source = await readFile(join(root, workspace, 'package.json'), 'utf8');
  return JSON.parse(source);
}

export function validateManifest(workspace, manifest) {
  const errors = [];

  if (manifest.private !== true) {
    errors.push(`${workspace} must remain private during Phase Zero`);
  }

  if (manifest.rancard?.status !== 'planned') {
    errors.push(`${workspace} must have the planned lifecycle status`);
  }

  for (const section of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ]) {
    for (const [name, range] of Object.entries(manifest[section] ?? {})) {
      if (
        name.startsWith('@rancard/') &&
        !String(range).startsWith('workspace:')
      ) {
        errors.push(
          `${workspace} ${section}.${name} must use the workspace protocol`,
        );
      }
    }
  }

  if (workspace.startsWith('packages/') && manifest.exports === undefined) {
    errors.push(`${workspace} must declare explicit exports`);
  }

  return errors;
}

export async function validateWorkspace(root = process.cwd()) {
  const present = [];
  for (const parent of ['apps', 'packages']) {
    const entries = await readdir(join(root, parent), { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) present.push(`${parent}/${entry.name}`);
    }
  }

  const errors = [];
  for (const workspace of expectedWorkspaces) {
    if (!present.includes(workspace)) {
      errors.push(`Missing workspace: ${workspace}`);
      continue;
    }
    const manifest = await readManifest(root, workspace);
    errors.push(...validateManifest(workspace, manifest));
  }

  for (const workspace of present) {
    if (!expectedWorkspaces.includes(workspace)) {
      errors.push(`Unexpected workspace: ${workspace}`);
    }
  }

  return errors;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const errors = await validateWorkspace();
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Validated ${expectedWorkspaces.length} workspace manifests.`);
  }
}
