/*
 * @Author: Dr.Who
 * @Description: file content
 * @Date: 2019-04-17 15:50:17
 * @LastEditors: Dr.Who
 * @LastEditTime: 2019-08-13 14:12:34
 */
// core-js

const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    [
      '@vue/app',
      {
        polyfills: [
          'es6.promise',
          'es6.symbol',
          'es6.array.find-index',
          'es6.string.includes',
          'es6.array.iterator',
          'es6.string.iterator',
          'es7.array.includes',
          'es7.symbol.async-iterator'
        ]
      }
    ]
  ],
  plugins: plugins
}
