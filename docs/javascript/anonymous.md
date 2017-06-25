# javascript中的匿名函数

> 匿名函数可以有效的保证在页面上写入Javascript，而不会造成全局变量的污染。

## 1. 匿名函数的调用

### 1.1 把函数表达式赋值给一个变量，通过变量名调用

```
var fn = function(){
	console.log('a');
}
fn();
```

### 1.2 立即调用的函数表达式

```
(function(){
	console.log('b');   // b
})();
```

使用括号运算符（分组运算符）包含函数体，括号表达式会返回这个匿名函数，后面的括号就是给匿名函数传递参数并立即执行之。


```
function(){
	console.log('b');   // 报错
}();
```

**为什么`(function {// code})();`可以被执行, 而`function {// code}();`却会报错?**

+ 首先，要清楚两者的区别：`(function {// code})`是表达式， `function {// code}`是函数声明
+ 其次，js"预编译"的特点：js在"预编译"阶段, 会解释函数声明, 但却会忽略表式
+ 当js执行到`function() {//code}();`时，由于`function() {//code}`在"预编译"阶段已经被解释过, js会跳过`function(){//code}`，试图去执行`();`， 故会报错
+ 当js执行到`(function {// code})();`时，由于`(function {// code})`是表达式, js会去对它求解得到返回值，由于返回值是一 个函数, 故而遇到`();`时，便会被执行


## 2. 匿名函数立即调用的写法

> 在匿名函数附近使用括号或者一元运算符，可引导解析器，运算符附近是一个表达式。

按照这个理解，可以举出五类，超过十几种的让匿名函数表达式立即调用的写法：

```
( function() {}() );
( function() {} )();
[ function() {}() ];

~ function() {}();
! function() {}();
+ function() {}();
- function() {}();

delete function() {}();
typeof function() {}();
void function() {}();
new function() {}();
new function() {};

var f = function() {}();

1, function() {}();
1 ^ function() {}();
1 > function() {}();
```

另外值得再次注意的是，括号的含混使用——它可以用来执行一个函数，还可以做为分组运算符来对表达式求值。比如使用圆括号或方括号的话，可以在行首加一个分号，避免被用做函数执行或下标运算：

```
g()
// 可能放了几行注释——不知道是用自动化脚本合并的文件，还是哪里拷的函数。
;( function() {}() )
```

# 参考

+ [cnblogs - pssp - 对匿名函数的深入理解（彻底版）](http://www.cnblogs.com/pssp/p/5216668.html)
+ [脚本之家 - 浅析Javascript匿名函数与自执行函数](http://www.jb51.net/article/79238.htm)
+ [知乎 - JavaScript 匿名函数有哪几种执行方式?](https://www.zhihu.com/question/20249179/answer/14487857)