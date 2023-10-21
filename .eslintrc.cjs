module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh', 'prettier', 'import', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  rules: {
    'prefer-const': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'],
          // Группа: Всё, что начинается с "react"
          ['^react', '^@?\\w'],
          // Группа: Импорты из "@config, @lib"
          ['^@config', '^@lib'],
          // Группа: Импорты из "@modules"
          ['^@modules'],
          // Группа: Импорты из текущего каталога
          ['^\\./'],
          // Группа: Стили - scss, sass, css
          ['^.+\\.(scss|sass|css)$'],
          // Группа: Импорты помеченные как type
          ['^.+\\u0000$'],
        ],
      },
    ],
  },
};
