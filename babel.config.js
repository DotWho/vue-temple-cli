module.exports = {
    presets: [
        [
            '@vue/app',
            {
                polyfills: ['es6.promise', 'es6.symbol', 'es6.array.find-index']
            }
        ]
    ],
    plugins: []
}