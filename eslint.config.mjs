// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// Plugins adicionais
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,

  // Ignorar arquivos de build/output
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  {
    // Regras customizadas
    rules: {
      // Prettier
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
        },
      ],

      // Variáveis não usadas
      'no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],

      // Console.log no código de produção
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Import/Export organizado
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },

    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
  },
]);
