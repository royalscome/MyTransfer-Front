/*
 * @Date: 2024-03-26 21:50:39
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-03-26 21:50:46
 * @FilePath: /MyTransfer-front/stylelint.config.js
 */
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "font-family-no-missing-generic-family-keyword": null,
    "color-hex-length": "long", // 指定十六进制颜色长或短的符号
    "no-descending-specificity": null, // 不允许选择器之后覆盖选择器的低特异性更高的特异性
    "comment-whitespace-inside": "always", // 需要或不允许空格里面的注释标记
    "declaration-empty-line-before": "never", // 要求声明前不允许空一行
    "declaration-block-no-duplicate-properties": true, // 禁止在声明块内出现重复属性
    "no-duplicate-selectors": true, // 不允许重复的选择器
    "no-empty-source": null, // 不允许空的来源
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extend",
          "at-root",
          "debug",
          "warn",
          "error",
          "if",
          "else",
          "for",
          "each",
          "while",
          "mixin",
          "include",
          "content",
          "return",
          "function"
        ]
      }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["export"]
      }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ],
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["theme", "/^menu/", "/^side/", "/^subMenu/"]
      }
    ]
  }
};
