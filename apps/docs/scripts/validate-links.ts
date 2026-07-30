import { validateInternalLinks } from '../lib/links';

const errors = await validateInternalLinks();

if (errors.length > 0) {
  throw new Error(`Internal link validation failed:\n${errors.join('\n')}`);
}

process.stdout.write('Validated internal documentation and registry links.\n');
