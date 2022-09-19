module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    'no-multi-spaces': ['error'],
    'no-sequences': 0,
    'no-extra-boolean-cast': 0,
    'import/no-named-as-default': 0,
    'no-unused-vars': 1,
    'import/no-extraneous-dependencies': 0,
    'linebreak-style': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'default-param-last': 0,
    'function-paren-newline': ['error', 'consistent'],
    'function-call-argument-newline': ['error', 'consistent'],
    'no-param-reassign': 0,
    'max-classes-per-file': 0
  }
};
