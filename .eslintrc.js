module.exports = {
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parser: 'babel-eslint',
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
    'no-async-promise-executor': 0,
    'no-undef': 0
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
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
