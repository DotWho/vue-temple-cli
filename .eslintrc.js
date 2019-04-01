module.exports = {
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
        'vue/no-v-html': 'off',
        'vue/html-self-closing': 'off',
        'vue/component-name-in-template-casing': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-indent': 4,
        'vue/valid-v-else': 'off',
        'vue/no-parsing-error': [
            2,
            {
                'x-invalid-end-tag': false
            }
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    }
}
