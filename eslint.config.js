import js from '@eslint/js';
import globals from 'globals';
import neostandard from 'neostandard';

export default [
  ...neostandard(
    {
      semi: true,
    }
  ),
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: ['error', 'always'],
      curly: ['error', 'multi'],
      'no-unused-vars': 'warn',
      quotes: ['error', 'single'],
    },
  },
];
