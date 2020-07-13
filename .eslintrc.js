module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  // extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018
  },
  rules: {
    'vue/html-self-closing': 'off',
    'vue/no-v-html': 'off',
    // 'vue/component-name-in-template-casing': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/valid-v-else': 'off',
    'vue/no-parsing-error': [
      'error',
      {
        'x-invalid-end-tag': false
      }
    ],
    // 'vue/html-indent': 'off',
    // 'vue/html-indent': ['error', 2, { baseIndent: 1 }],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/script-indent': ['error', 2, { baseIndent: 0, switchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    // indent: 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
