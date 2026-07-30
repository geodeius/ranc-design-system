import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['error', { allow: ['error', 'warn'] }],
    },
  },
];
