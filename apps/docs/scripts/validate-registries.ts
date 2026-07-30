import {
  getComponentRegistry,
  getPackageRegistry,
  getTokenRegistry,
  validateRegistryRelationships,
} from '../lib/registries';

const [components, packages, tokens] = await Promise.all([
  getComponentRegistry(),
  getPackageRegistry(),
  getTokenRegistry(),
]);

await validateRegistryRelationships();

process.stdout.write(
  `Validated ${components.length} components, ${packages.length} packages, and ${tokens.length} tokens.\n`,
);
