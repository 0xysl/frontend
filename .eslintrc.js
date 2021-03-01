module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
  env: {
    es6: true,
    browser: true,
    jest: false,
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    '@pancakeswap-libs/eslint-config-pancake',
  ],

  rules: {
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'no-plusplus': 0,
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-underscore-dangle': 0,
    'max-classes-per-file': 0,
    camelcase: 0,
    'no-alert': 0,
    // Start temporary rules
    // These rules are here just to keep the lint error to 0 during the migration to the new rule set
    // They need to be removed and fixed as soon as possible
    'no-case-declarations': 0,
    'no-await-in-loop': 0,
    'no-nested-ternary': 0,
    'default-case': 0,
    'react/require-default-props': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    radix: 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/media-has-caption': 0,
    // End temporary rules
  },
}
