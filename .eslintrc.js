module.exports = {
  extends: '@domoapps/eslint-config',
  ignorePatterns: ['setupProxy.js', 'react-app-env.d.ts'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
