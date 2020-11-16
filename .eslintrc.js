module.exports = {
  extends: ['airbnb'],
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
    'no-unused-vars': 'error',
    'eol-last': ['error', 'always'],
    'no-compare-neg-zero': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-empty': 'error',
    'no-func-assign': 'error',
    'no-unreachable': 'error',
    'use-isnan': 'error',
    'no-unexpected-multiline': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-useless-catch': 'error',
    'func-names': ['error', 'as-needed']
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ]
      }
    }
  },
  globals: {
    '$': true,
    'jquery': true,
    'jQuery': true,
    'Popper': true,
    'popper.js': true,
    'window': true
  }
}
