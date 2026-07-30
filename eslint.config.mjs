import rancardConfig from '@rancard/eslint-config';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**'],
  },
  ...rancardConfig,
];
