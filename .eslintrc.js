module.exports = {
  env: {
    'node': true,
    'es6': true,
    'jest': true
  },
  globals: {
    name: 'off'
  },
  rules: {
    'indent': ['error', 2],
    'semi': [2, 'never'],
    'no-console': 'error',
    'arrow-parens': 0,
    'no-console': 'off',
    'no-unused-vars': 'error'
  },
  'parserOptions': {
    'sourceType': 'module',
  }
}
