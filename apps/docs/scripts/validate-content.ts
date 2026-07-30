import { getAllPages } from '../lib/content';

const pages = await getAllPages();

if (pages.length === 0) {
  throw new Error('Content validation failed: no MDX pages were found.');
}

process.stdout.write(`Validated ${pages.length} MDX pages.\n`);
