module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "overrides": [
    {
      "files": ["*.vue"],
      "parser": "vue-eslint-parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint"],
      "parserOptions": {
        "tsconfigRootDir": "./",
        "jsx": true,
        "useJSXTextNode": true
      }
    }
  ],
  "extends": ["airbnb"],
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/internal-regex": "^/@",
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        "alias": { "/@": "./src/" },
        "extensions": [".ts", ".tsx", ".js"]
      },
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json",
        "alias": {
          "/@": "./src/"
        }
      }
    }
  },
  "plugins": ["import", "eslint-plugin-vue", "typescript"],
  "globals": {
    "window": true,
    "document": true
  },
  "rules": {
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "no-plusplus": "off",
    "no-unused-vars": [
      "error",
      { "vars": "all", "args": "none", "ignoreRestSiblings": false }
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allowAfterThis": true,
        "allow": ["_this"]
      }
    ],
    "space-before-function-paren": ["error", "always"],
    "array-element-newline": [
      "error",
      {
        "multiline": true,
        "minItems": 3
      }
    ],
    "camelcase": [
      "error",
      {
        "properties": "never"
      }
    ],
    "func-names": ["error", "never"],
    "import/no-unresolved": "error",
    "import/no-absolute-path": [0],
    "import/extensions": [0],
    "no-promise-executor-return": [0],
    "no-param-reassign": [0],
    "no-shadow": ["error", {"builtinGlobals": false, "hoist": "functions", "allow": [] }],
    "prefer-promise-reject-errors": [0],
    "global-require": [0]
  }
}
