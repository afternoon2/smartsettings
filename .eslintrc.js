module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies ESLint parser
  extends: ['airbnb-typescript'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    jsx: false,
  },
  rules: {
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0
  },
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.0'
    },
  }
};
