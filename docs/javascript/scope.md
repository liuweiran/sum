# javascript中的作用域

## 函数作用域

> Javascript没有块级作用域，而是函数作用域。所谓函数作用域就是说，变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的。

```
function foo(){
	var bar = 1;
	console.log(bar);   // 1
}
foo();
console.log(bar);   // Uncaught ReferenceError: bar is not defined
```

上述例子中，在foo函数中定义了一个变量bar，在该函数体内可以访问到该变量；但是在该函数外，是访问不到该变量的。

> 只有函数拥有局部环境，if语句、for循环等都是没有的。

```
if (true) {
	var foo = 1;
}
console.log(foo);   // 1

for(var i=0; i<2; i++){
	var bar = 3;
}
console.log(i);    // 2
console.log(bar);  // 3
```

## 变量作用域

> 没有用 var 声明的变量都是全局变量，在全局范围内都可以被访问到。

```
function fn(){
	a = 1;
	var b = 2;
}
fn();
console.log(a);     // 1
console.log(b);     // Uncaught ReferenceError: b is not defined
```
