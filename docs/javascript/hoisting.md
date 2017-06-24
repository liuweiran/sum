# javascript中的变量提升和函数提升

> 提升，在js中是指，把后面定义的东西提升到前面。

## 变量提升

> 变量提升，就是把变量提升提到函数头部。变量提升只提升变量的声明，并不会把赋值也提升上来。 

```
var foo = 1;
function bar() {
	if (!foo) {
		var foo = 10;
	}
	console.log(foo);
}
bar();
```

上述例子打印结果是 10，其执行如下：

```
var foo = 1;
function bar() {
    var foo;    // 变量被提升
	if (!foo) {     // foo 此时是 undifined， !undifined 返回 true 
		foo = 10;
	}
	console.log(foo);
}
bar();
```

## 函数提升

函数定义有两种方式：

+ 函数声明

```
function foo() {
    ...
}
```

+ 函数表达式

```
var foo = function(){
    ...
}
```

> 只有函数声明才存在函数提升，函数的提升不仅仅是声明的提升，函数体也会被提升。

```
foo();
function foo() {
	console.log('1');   // 成功打印1
}
```

```
foo():
var foo = function(){
	console.log('2');   // 浏览器报错
}
```

# 参考

+ [blog.csdn - Javascript作用域和变量提升](http://blog.csdn.net/sunxing007/article/details/9034253)