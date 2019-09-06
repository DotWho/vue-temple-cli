/*
 * @Author: Dr.Who
 * @Description: file content
 * @Date: 2019-08-12 14:06:23
 * @LastEditors: Dr.Who
 * @LastEditTime: 2019-08-13 14:49:33
 */
module.exports = {
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment']
      }
    ],
    'declaration-colon-space-after': 'always',
    indentation: [
      2,
      {
        except: ['value'],
        indentInsideParens: 'twice'
      }
    ],
    'max-empty-lines': 2,
    'unit-whitelist': ['px', 'rem', '%', 's', 'ms', 'vh', 'vw', 'deg', 'turn'],
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true
  }
}
