module.exports = {
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ["jest"],
  rules: {
    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
    }],
    "func-names": "off",
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
  },
};
