# javascript闭包

+ 闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数里创建另一个函数。
+ 由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

## 1. 理解闭包的基础
### 1.1 变量的作用域

+ 要理解闭包，首先必须理解Javascript特殊的变量作用域。
+ 变量的作用域无非就是两种：全局变量和局部变量。
+ Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。
+ 另一方面，在函数外部自然无法读取函数内的局部变量。
+ 这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！

### 1.2 作用域链

+ 当某个函数被调用时，会创建一个执行环境（execution context）及相应的作用域链
+ 然后，使用arguments和其他命名参数的值来初始化函数的活动对象（activation object）
+ 在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，...，直至作为作用域链终点的全局执行环境

```
function compare(value1, value2){
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}

var result = compare(1, 2);
```

以上代码先定义了 compare() 函数，然后又在全局作用域中调用了它。当调用 compare()时，会创建一个包含 arguments、value1、value2 的活动对象。全局执行环境的变量对象（包含 result 和 compare）在 compare() 执行环境的作用域链中则处于第二位。

无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。一般来讲，当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。


## 3. 闭包的用途

### 3.1 读取函数内部的变量

> 正常情况下，是无法从外部读取到函数内部的局部变量的。此时，可以通过闭包来实现。

```
function f1(){
    var n = 999;
    function f2(){
		alert(n); 
    }
    return f2;
}
var result = f1();
result(); // 999
```

f2可以读取f1中的局部变量，那么把f2作为返回值，就可以在f1外部读取它的内部变量了。

### 3.2 让函数内部的变量值始终保存在内存中

```
function f1(){
    var n = 999;
    nAdd = function(){
		n+=1;
	}
    function f2(){
    	alert(n);
    }
    return f2;
}
var result = f1();
result(); // 999
nAdd();
result(); // 1000
```

在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

这段代码中另一个值得注意的地方，就是"nAdd=function(){n+=1}"这几行，首先在nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

## 4. 闭包的应用

### 4.1 函数作为返回值

```
function fn() {
	var max = 10;
	return function bar(x) {
		if (x > max) {
			console.log(x);
		}
	}
}

var f1 = fn();
f1(11);     // 11
f1 = null;
```

通常情况下，函数调用完成之后，其活动对象会被销毁。但是，在该例中，fn()执行完之后并没有马上销毁，因为f1()，也就是bar()执行需要用到fn()的活动对象。也因此，使用闭包会更占内存。

但是，最后加一行 f1 = null，解除了对函数 bar 的引用，bar 的作用域链被销毁，fn 的作用域链也会随之被安全的销毁。内存便会得到释放。

### 4.2 函数作为参数被传递

```
var max = 10,
	fn = function (x) {
		if (x > max) {
			console.log(x);
		}
	};

(function(f){
	var max = 100;
	f(15);      // 15
})(fn);
```

## 5. 循环中的闭包

```
var arr = [];
for(var i=0; i<3; i++){
	arr[i] = function(){
		return i;
	};
}
console.log(arr[0]());  // 3  
console.log(arr[1]());  // 3
console.log(arr[2]());  // 3
```

上述例子中，得到一个函数数组，每个函数都返回3，并没有像预期那样返回各自的索引值。

这是因为，3次循环产生了3个闭包，但这个3个闭包共享一个变量i。for循环结束时，只是把3个函数push给了数组arr，在for循环中，这三个函数并没有执行。而是当循环结束之后，尔后打印时再执行的匿名函数，此时i=3，所以每个匿名函数都会输出3。

**为了解决上面提到的问题，可以再加一层闭包来使得函数行为符合预期：**

```
var arr = [];
for(var i=0; i<3; i++){
    arr[i] = function(x){
        return function(){
			return x;
		};
    }(i);
}
console.log(arr[0]());  // 0
console.log(arr[1]());  // 1
console.log(arr[2]());  // 2
```

## 6. 使用闭包的注意点

+ 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

+ 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

# 参考

+ 高程3 P73-74，P178-182
+ [阮一峰的网络日志 - 学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
+ [cnblogs - wangfupeng1988 - 深入理解javascript原型和闭包（15）——闭包](http://www.cnblogs.com/wangfupeng1988/p/3994065.html)