# javascript中函数的arguments对象

> ECMAScript中的参数在内部是用一个数组来表示的。在函数体内，可以通过访问类数组对象 arguments 来访问这个参数数组。

## arguments[index]

> arguments[0]是第一个参数，arguments[1]是第二个参数，...，以此类推

```
function fn(){
    console.log(arguments[0] + arguments[1]);
}
fn(1,2);    // 3
```

> arguments对象也可以与命名参数一起使用。

```
function fn(num1, num2){
	arguments[0] = 10;
	console.log(num1 + num2);
}
fn(1,2);
```

**在严格模式中，重写arguments的值会导致语法错误。**

## arguments.length 

> 通过length属性可得到传入的参数个数

```
function fn(){
    console.log(arguments.length);
}
fn(1,2,3);      // 3
fn('a','b');    // 2
```

> 模拟函数重载

ECMAScript函数是没有重载的，不像其他语言（如java）可以为两个函数名定义编写多个定义，只要定义的签名（接收的参数类型和数量）不同即可。在ECMAScript中，定义两个相同名字的函数，后者会覆盖前者。

但是可以利用arguments对象来模拟函数重载：

```
function fn(){
	if (arguments.length === 1) {
		console.log(arguments[0] + 10);
	} else if (arguments.length === 2) {
		console.log(arguments[0] + arguments[1]);
	}
}
fn(1);      // 11
fn(1,2);    // 3
```

## arguments.callee 

> callee属性是一个指针，指向拥有这个arguments对象的函数

```
function fn(num){
    if (num <= 1) {
        return 1;
    } else {
        return num * fn(num-1);
    }
}
fn(4);  // 24
```

上面定义的阶乘函数，将函数的执行与函数名fn紧紧耦合在了一起。为了消除这种耦合，可以使用arguments.callee。

```
function fn(num){
	if (num <= 1) {
		return 1;
	} else {
		return num * arguments.callee(num-1);
	}
}
var test = fn;
fn = function(){
	return 0;
}
console.log(test(4));   // 24
console.log(fn(4));     // 0
```

解除了函数体内的代码与函数名的耦合状态之后，即使重写了fn函数，仍然不影响test函数的执行。

**当函数在严格模式下运行时，访问arguments.callee会导致错误。**

此时，可以使用**命名函数表达式**来解决（命名函数表达式的名字只在其定义的函数作用域内有效）：

```

var fn = function f(x) {
	if (x <= 1) {
		return 1;
	} else {
		return x * f(x-1);
	}
}
var fn2 = fn;
fn = null;
console.log(typeof f);  // undefined
fn2(3);     // 6
```

# 参考

+ 高程3 P64-66，P113-115
+ [haorooms博客 - javascript递归函数理解和说明](http://www.haorooms.com/post/js_dg_jsdihanshu)
+ [汤姆大叔的博客 - 深入理解JavaScript系列（2）：揭秘命名函数表达式](http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html)