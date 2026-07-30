import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import process from 'node:process';

export function changedPublishablePackages(changedFiles, packages) {
  return packages
    .filter(
      (packageEntry) =>
        !packageEntry.private &&
        changedFiles.some((file) => file.startsWith(`${packageEntry.path}/`)),
    )
    .map((packageEntry) => packageEntry.name)
    .sort();
}

export function hasChangeset(changedFiles) {
  return changedFiles.some(
    (file) =>
      file.startsWith('.changeset/') &&
      file.endsWith('.md') &&
      file !== '.changeset/README.md',
  );
}

async function getPackages(root) {
  const entries = await readdir(join(root, 'packages'), {
    withFileTypes: true,
  });

  return Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const path = `packages/${entry.name}`;
        const manifest = JSON.parse(
          await readFile(join(root, path, 'package.json'), 'utf8'),
        );
        return {
          name: manifest.name,
          path,
          private: manifest.private === true,
        };
      }),
  );
}

function getChangedFiles(baseBranch) {
  return execFileSync(
    'git',
    ['diff', '--name-only', `origin/${baseBranch}...HEAD`],
    { encoding: 'utf8' },
  )
    .split('\n')
    .filter(Boolean);
}

export async function validateChangesets({
  baseBranch = process.env.GITHUB_BASE_REF,
  root = process.cwd(),
} = {}) {
  if (!baseBranch) {
    return {
      message:
        'Changeset policy is configured; no pull-request base was provided for diff validation.',
      valid: true,
    };
  }

  const changedFiles = getChangedFiles(baseBranch);
  const packages = await getPackages(root);
  const affected = changedPublishablePackages(changedFiles, packages);

  if (affected.length > 0 && !hasChangeset(changedFiles)) {
    return {
      message: `Publishable package changes require a Changeset: ${affected.join(', ')}.`,
      valid: false,
    };
  }

  return {
    message:
      affected.length > 0
        ? `Validated release intent for: ${affected.join(', ')}.`
        : 'No publishable package changes require a Changeset.',
    valid: true,
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = await validateChangesets();
  process.stdout.write(`${result.message}\n`);
  if (!result.valid) process.exitCode = 1;
}
