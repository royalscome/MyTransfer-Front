/*
 * @Date: 2024-03-26 21:47:35
 * @Author: weiyang
 * @LastEditors: weiyang
 * @LastEditTime: 2024-03-26 21:47:49
 * @FilePath: /MyTransfer-front/.prettierrc.cjs
 */
module.exports = {
  printWidth: 120, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, //一个tab代表几个空格数，默认为80
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: false, //字符串是否使用单引号，默认为false，使用双引号
  semi: true, //行位是否使用分号，默认为true
  trailingComma: "none", //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  // parser: "babylon", //代码的解析引擎，默认为babylon，与babel相同。
  endOfLine: "auto", // 设置统一的行结尾样式，保持现有的行尾（通过查看第一行后的内容对一个文件中的混合值进行归一化）
  arrowParens: "avoid", //只有一个参数的箭头函数的参数是否带圆括号（默认avoid不带）
  eslintIntegration: true //让prettier使用eslint的代码格式进行校验
};
