# javascript中的自由变量

## 什么是自由变量？

如在全局中定义了一个变量foo，然后在函数中使用了这个foo，这个foo就可以称之为自由变量。可以这样理解，凡是跨了自己的作用域的变量都叫自由变量。

```
var foo = 1;
function bar(){
	console.log(foo);	// 1
}
bar();
```

上面的这段代码中的变量foo就是一个自由变量，因为在函数bar执行到console.log(foo)的时候，发现在函数中找不到变量foo，于是就往上一层中找，最后找到了全局变量foo。

## 作用域的进阶

```
var a = 1;
function f1(){
	console.log(a);
}
function f2(fn){
	var a = 2;
	fn();
}
f2(f1);     // 1
```

打印结果是1，而不是2。

**一个函数在被创建的时候，其作用域就已经决定了，而不是在调用的时候。**

**所以，函数中的变量，要到创建这个函数的作用域中去取值，而不是调用这个函数的作用域。**

```
function fn(){
	console.log(x);
}
function show(f){
	var x = 20;
	f();
}
show(fn);   // Uncaught ReferenceError: x is not defined
```

**函数中的变量，跟它调用所在的作用域没有关系。如果定义这个函数所在的作用域（包括它的上级作用域）找不到该变量，则执行该函数会报错。**

# 参考

+ [cnblogs - pssp - 理解js中的自由变量以及作用域的进阶](http://www.cnblogs.com/pssp/p/5206240.html)
+ [cnblogs - wangfupeng1988 - 深入理解javascript原型和闭包（14）——从【自由变量】到【作用域链】](http://www.cnblogs.com/wangfupeng1988/p/3992795.html)