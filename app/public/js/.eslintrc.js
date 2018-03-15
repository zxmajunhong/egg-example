module.exports = {
  env: {
    browser: true,
    jquery: true // 预置 jQuery 环境
  },
  globals: {
    Vue: true,
  },
  rules: {
    'func-names': 'off', // 要求使用命名的 function 表达式
    'prefer-arrow-callback': 'off', // 要求使用箭头函数作为回调
    'no-var': 'off', // 要求使用 let 或 const 而不是 var
    'prefer-rest-params': 'off', // 要求用 rest 代替 arguments
    'comma-dangle': 'off', // 要求末尾逗号
    'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
    'prefer-template': 'off', // 要求使用模板字面量而非字符串连接
    'object-shorthand': 'off', // 要求对象字面量中方法和属性使用简写语法
    'vars-on-top': 'off', // 要求所有的 var 声明出现在它们所在的作用域顶部
    'no-use-before-define': 'off', // 禁止在变量定义之前使用它们
  }
};
