import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Astro recommended rules
  ...eslintPluginAstro.configs.recommended,

  // Prettier configuration to disable conflicting rules
  eslintConfigPrettier,

  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'pnpm-lock.yaml',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
    ],
  },

  // TypeScript files configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Add custom TypeScript rules here if needed
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Astro files configuration
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      // Add custom Astro rules here if needed
    },
  },
];
