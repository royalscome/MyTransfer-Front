module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "prettier"], // "plugin:prettier/recommended"
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "prettier/prettier": "error",
    // "prettier.eslintIntegration": true,
    "no-undef": 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到. e.g. /* global Stomp SockJS */ in .vue file's <scrpit>
    "no-undef-init": 2, // 禁止将变量初始化为 undefined
    "no-extend-native": 2, // 禁止扩展原生类型
    "no-return-assign": 2, // 禁止在 return 语句中使用赋值语句
    // "import/order": 0, // Enforce a convention in module import order
    // "import/no-extraneous-dependencies": 0, // 禁止导入未在package.json的依赖项，devDependencies，optionalDependencies或peerDependencies中声明的外部模块。将使用最接近的父package.json。
    // "import/no-dynamic-require": 1, // CommonJS的require方法用于从不同文件导入模块。与ES6导入语法不同，可以为其提供将在运行时解析的表达式。虽然这有时是必要且有用的，但在大多数情况下并非如此。使用表达式（例如，连接路径和变量）作为参数使得工具更难以进行静态代码分析，或者在代码库中找到使用模块的位置。
    // "import/extensions": 0, // 某些文件解析算法允许您在导入源路径中省略文件扩展名。例如，节点解析器可以将./foo/bar解析为绝对路径/User/someone/foo/bar.js，因为默认情况下会自动解析.js扩展名。根据解析程序，您可以配置更多扩展程序以自动解决。
    // "import/no-unresolved": 0, // 确保导入的模块可以解析为本地文件系统上的模块，如标准Node require.resolve行为所定义。
    // "import/prefer-default-export": 1, // 当模块中只有一个导出时，更喜欢使用默认导出而不是命名导出。
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "all",
      },
    ], // 禁止出现未使用过的变量
    "generator-star-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ], // 强制 generator 函数中 * 号周围使用一致的空格
    "no-plusplus": 0, // 禁用一元操作符 ++ 和 --
    "func-names": 0, // 要求或禁止使用命名的 function 表达式
    radix: 0, // 强制在parseInt()使用基数参数
    "no-control-regex": 0, // 禁止在正则表达式中使用控制字符
    "no-continue": 0, // 禁用 continue 语句
    "no-param-reassign": 0, // 禁止对 function 的参数进行重新赋值
    "no-underscore-dangle": 1, // 禁止标识符中有悬空下划线"_"
    "global-require": 0, // 要求 require() 出现在顶层模块作用域中
    "no-var": 1, // 要求使用 let 或 const 而不是 var
    "vars-on-top": 1, // 要求所有的 var 声明出现在它们所在的作用域顶部
    "prefer-destructuring": 1, // 优先使用数组和对象解构
    "no-useless-concat": 1, // 禁止不必要的字符串字面量或模板字面量的连接
    "no-shadow": 1, // 禁止变量声明与外层作用域的变量同名
    "guard-for-in": 0, // 要求 for-in 循环中有一个 if 语句,旨在防止使用for in循环而不过滤循环中的结果时可能出现的意外行为。
    "no-restricted-syntax": 0, // 禁用特定的语法
    "consistent-return": 0, // 要求 return 语句要么总是指定返回的值，要么不指定
    eqeqeq: ["error", "always", { null: "ignore" }], // 要求使用 === 和 !==
    "no-unused-expressions": 0, // 禁止出现未使用过的表达式
    camelcase: 1, // 强制使用骆驼拼写法命名约定
    "block-scoped-var": 1, // 强制把变量的使用限制在其定义的作用域范围内,旨在减少绑定上下文之外的变量的使用，并从其他语言模拟传统的块范围。这是为了帮助语言新手避免变量提升的难题。
    "no-redeclare": 2, // 禁止多次声明同一变量
    "prefer-arrow-callback": 1, // 要求回调函数使用箭头函数
    "array-callback-return": 0, // 强制数组方法的回调函数中有 return 语句,Array有几种过滤，映射和折叠的方法。如果我们忘记return在这些回调中写入语句，那可能是一个错误。
    "default-case": 1, // 要求 switch 语句中有 default 分支
    "no-loop-func": 1, // 禁止在循环中出现 function 声明和表达式
    "no-fallthrough": 2, // 禁止 case 语句落空
    "no-multi-assign": 1, // 禁止连续赋值
    "no-lonely-if": 0, // 禁止 if 作为唯一的语句出现在 else 语句中.如果一个if陈述是该else块中唯一的陈述，那么使用一个else if表格通常会更清晰。
    "no-irregular-whitespace": 2, // 禁止在字符串和注释之外不规则的空白
    "prefer-const": 2, // 要求使用 const 声明那些声明后不再被修改的变量.如果一个变量从不重新分配，使用const声明更好。const 声明告诉读者，“这个变量永远不会被重新分配，”减少认知负荷并提高可维护性。
    "no-use-before-define": 1, // 禁止在变量定义之前使用它们
    "no-useless-escape": 0, // 禁用不必要的转义字符
    "no-array-constructor": 2, // 禁用 Array 构造函数,由于单参数的缺陷以及Array全局可能被重新定义，所以通常不鼓励使用构造函数来构造新Array数组，而是倾向于使用数组文字符号。例外情况是Array构造函数用于通过给构造函数一个数字参数有意创建指定大小的稀疏数组。
    "object-shorthand": 1, // 要求或禁止对象字面量中方法和属性使用简写语法
    "no-prototype-builtins": 1, // 禁止直接调用 Object.prototypes 的内置属性.当假定对象将具有属性时，这可能导致错误Object.prototype。此规则可防止Object.prototype直接从对象调用方法。
    "no-nested-ternary": 0, // 禁用嵌套的三元表达式.嵌套三元表达式会使代码更难理解。
    "no-new-wrappers": 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符.没有任何理由将这些基本包装用作构造函数
    "prefer-promise-reject-errors": 1, // 要求使用 Error 对象作为 Promise 拒绝的原因
    "no-labels": [
      2,
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ], // 禁用标签语句
    "max-classes-per-file": ["error", 10], // 对每个文件强制使用最大类数
    "new-cap": [
      2,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ], // 要求构造函数首字母大写
    "accessor-pairs": 2, // 强制getter/setter成对出现在对象中
    "arrow-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ], // 要求箭头函数的箭头之前或之后有空格
    "block-spacing": [2, "always"], // 禁止或强制在代码块中开括号前和闭括号后有空格
    "brace-style": [
      2,
      "1tbs",
      {
        allowSingleLine: true,
      },
    ], // 大括号风格要求
    "comma-dangle": [2, "never"], // 要求或禁止使用拖尾逗号
    "comma-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ], // 强制在逗号周围使用空格
    "comma-style": [2, "last"], // 强制使用一致的逗号风格
    "constructor-super": 2, // 要求在构造函数中有 super() 的调用
    curly: [2, "all"], // 强制所有控制语句使用一致的括号风格
    "dot-location": [2, "property"], // 强制在点号之前和之后一致的换行
    "eol-last": 2, // 要求或禁止文件末尾存在空行
    "handle-callback-err": [0, "^(err|error)$"], // 要求回调函数中有容错处理
    indent: "off", // 强制使用一致的缩进

    "jsx-quotes": [2, "prefer-double"], // 强制在 JSX 属性中一致地使用双引号或单引号
    "key-spacing": [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ], // 强制在对象字面量的属性中键和值之间使用一致的间距
    "keyword-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ], // 强制在关键字前后使用一致的空格
    "new-parens": 2, // 强制或禁止调用无参构造函数时有圆括号
    "no-caller": 2, // 禁用 arguments.caller 或 arguments.callee
    "no-class-assign": 2, // 禁止修改类声明的变量
    "no-cond-assign": 2, // 禁止条件表达式中出现赋值操作符
    "no-const-assign": 2, // 禁止修改 const 声明的变量
    "no-delete-var": 2, // 禁止删除变量
    "no-dupe-args": 2, // 禁止 function 定义中出现重名参数
    "no-dupe-class-members": 2, // 禁止类成员中出现重复的名称
    "no-dupe-keys": 2, // 禁止对象字面量中出现重复的 key
    "no-duplicate-case": 2, // 禁止出现重复的 case 标签
    "no-empty-character-class": 2, // 禁止在正则表达式中使用空字符集
    "no-empty-pattern": 2, // 禁止使用空解构模式
    "no-eval": 2, // 禁用 eval()
    "no-ex-assign": 2, // 禁止对 catch 子句的参数重新赋值
    "no-extra-bind": 2, // 禁止不必要的 .bind() 调用
    "no-extra-boolean-cast": 2, // 禁止不必要的布尔转换
    "no-extra-parens": [2, "functions"], // 禁止不必要的括号
    "no-floating-decimal": 2, // 禁止数字字面量中使用前导和末尾小数点
    "no-func-assign": 2, // 禁止对 function 声明重新赋值
    "no-implied-eval": 2, // 禁止使用类似 eval() 的方法
    "no-inner-declarations": [2, "functions"], // 禁止在嵌套的块中出现变量声明或 function 声明
    "no-invalid-regexp": 2, // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    "no-iterator": 2, // 禁用 __iterator__ 属性
    "no-label-var": 2, // 不允许标签与变量同名
    "no-lone-blocks": 2, // 禁用不必要的嵌套块
    "no-mixed-spaces-and-tabs": 2, // 禁止空格和 tab 的混合缩进
    "no-multi-spaces": 2, // 禁止使用多个空格
    "no-multi-str": 2, // 禁止使用多行字符串
    "no-multiple-empty-lines": [
      2,
      {
        max: 1,
      },
    ], // 禁止出现多行空行
    "no-global-assign": 2, // 禁止对原生对象或只读的全局对象进行赋值
    "no-new-object": 2, // 禁用 Object 的构造函数
    "no-new-require": 2, // 禁止调用 require 时使用 new 操作符
    "no-new-symbol": 2, // 禁止 Symbolnew 操作符和 new 一起使用
    "no-obj-calls": 2, // 禁止把全局对象作为函数调用
    "no-octal": 2, // 禁用八进制字面量
    "no-octal-escape": 2, // 禁止在字符串中使用八进制转义序列
    "no-path-concat": 2, // 禁止对 __dirname 和 __filename 进行字符串连接
    "no-proto": 2, // 禁用 __proto__ 属性
    "no-regex-spaces": 2, // 禁止正则表达式字面量中出现多个空格
    "no-self-assign": 2, // 禁止自我赋值
    "no-self-compare": 2, // 禁止自身比较
    "no-sequences": 0, // 禁用逗号操作符
    "no-shadow-restricted-names": 2, // 禁止将标识符定义为受限的名字
    "func-call-spacing": 2, // 禁止在函数标识符和其调用之间有空格
    "no-sparse-arrays": 2, // 禁用稀疏数组
    "no-this-before-super": 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    "no-throw-literal": 2, // 禁止抛出异常字面量
    "no-trailing-spaces": 2, // 禁用行尾空格
    "no-unexpected-multiline": 2, // 禁止出现令人困惑的多行表达式
    "no-unmodified-loop-condition": 2, // 禁用一成不变的循环条件
    "no-unneeded-ternary": [
      2,
      {
        defaultAssignment: false,
      },
    ], // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    "no-unreachable": 2, // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unsafe-finally": 2, // 禁止在 finally 语句块中出现控制流语句
    "no-useless-call": 2, // 禁止不必要的 .call() 和 .apply()
    "no-useless-computed-key": 2, // 禁止在对象中使用不必要的计算属性
    "no-useless-constructor": 2, // 禁用不必要的构造函数
    "no-whitespace-before-property": 2, // 禁止属性前有空白
    "no-with": 2, // 禁用 with 语句
    "one-var": [
      2,
      {
        initialized: "never",
      },
    ], // 强制函数中的变量要么一起声明要么分开声明
    "operator-linebreak": [
      2,
      "after",
      {
        overrides: {
          "?": "before",
          ":": "before",
        },
      },
    ], // 强制操作符使用一致的换行符
    "padded-blocks": [2, "never"], // 禁止块内填充
    quotes: [
      2,
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ], // 强制使用一致的反勾号、双引号或单引号
    semi: [2, "always"], // 要求或禁止使用分号代替 ASI
    "semi-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ], // 强制分号之前和之后使用一致的空格
    "space-before-blocks": [2, "always"], // 强制在块之前使用一致的空格
    // "space-before-function-paren": [2, "never"], // 强制在 function的左括号之前使用一致的空格
    "space-in-parens": [2, "never"], // 强制在圆括号内使用一致的空格
    "space-infix-ops": 2, // 要求操作符周围有空格
    "space-unary-ops": [
      2,
      {
        words: true,
        nonwords: false,
      },
    ], // 强制在一元操作符前后使用一致的空格
    "spaced-comment": [
      2,
      "always",
      {
        markers: [
          "global",
          "globals",
          "eslint",
          "eslint-disable",
          "*package",
          "!",
          ",",
        ],
      },
    ], // 强制在注释中 // 或 /* 使用一致的空格
    "template-curly-spacing": [2, "never"], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    "use-isnan": 2, // 要求使用 isNaN() 检查 NaN
    "valid-typeof": 2, // 强制 typeof 表达式与有效的字符串进行比较
    "wrap-iife": [2, "any"], // 要求 IIFE 使用括号括起来
    "yield-star-spacing": [2, "both"], // 强制在 yield* 表达式中 * 周围使用空格
    yoda: [2, "never"], // 要求或禁止 “Yoda” 条件
    // "object-curly-spacing": [
    //   2,
    //   "always",
    //   {
    //     objectsInObjects: false
    //   }
    // ], // 强制在大括号中使用一致的空格
    "array-bracket-spacing": [2, "never"], // 强制数组方括号中使用一致的空格
    // "vue/max-attributes-per-line": [
    //   "error",
    //   {
    //     singleline: 1,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false
    //     }
    //   }
    // ], // 强制每行的最大属性数
    "vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行
    "vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行
    "vue/component-definition-name-casing": ["PascalCase" | "kebab-case"], // 在Vue组件中对name属性强制使用特定大小写
    "vue/no-v-html": "off", // 禁止使用v-html防止XSS攻
    "vue/no-mutating-props": "off",
    "vue/multi-word-component-names": "off",
  },
};
