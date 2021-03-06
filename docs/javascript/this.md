# javascript的this用法

> this是Javascript语言的一个关键字。
> 它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。比如，

```
function test(){
    this.x = 1;
}
```

随着函数使用场合的不同，this的值会发生变化。但是有一个总的原则，那就是this指的是，调用函数的那个对象。

**下面分四种情况，详细讨论this的用法。**

## 情况一：纯粹的函数调用

> 这是函数的最通常用法，属于全局性调用，因此this就代表全局对象Global。

请看下面这段代码，它的运行结果是1。

```
function test(){
    this.x = 1;
    console.log(this.x);
}
test();   // 1
```

为了证明this就是全局对象，我对代码做一些改变：

```
var x = 1;
function test(){
	console.log(this.x);
}
test();   // 1
```

运行结果还是1。再变一下：

```
var x = 1;
function test(){
	this.x = 0;
}
test();
console.log(x);  // 0
```

## 情况二：作为对象方法的调用

> 函数还可以作为某个对象的方法调用，这时this就指这个上级对象。

```
function test(){
	console.log(this.x);
}
var o = {};
o.x = 1;
o.m = test;
o.m();   // 1
```

## 情况三 作为构造函数调用

> 所谓构造函数，就是通过这个函数生成一个新对象（object）。这时，this就指这个新对象。

```
function test(){
	this.x = 1;
}
var o = new test();
console.log(o.x);   // 1
```

运行结果为1。为了表明这时this不是全局对象，我对代码做一些改变：

```
var x = 2;
function test(){
	this.x = 1;
}
var o = new test();
console.log(x);   // 2
```

运行结果为2，表明全局变量x的值根本没变。

## 情况四 apply/call调用

> apply() / call() 是函数对象的一个方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象。因此，this指的就是这第一个参数。

```
var x = 0;
function test(){
	console.log(this.x);
}
var o = {};
o.x = 1;
o.m = test;
o.m.apply();   // 0
```

apply()的参数为空时，默认调用全局对象。因此，这时的运行结果为0，证明this指的是全局对象。

<br>

如果把最后一行代码修改为

```
o.m.apply(o);   // 1
```

运行结果就变成了1，证明了这时this代表的是对象o。

## 补充说明

### setTimeout/setInterval

> 超时调用的代码都是在全局作用域中执行的，因此定时器中的函数中this的值在非严格模式下指向window对象，在严格模式下是undefined”。在这里，我们只讨论非严格模式。

```
var a = 1;
function fn(){
	var a = 2;
    setTimeout(function(){
		var a = 3;
        console.log(a);
    },30);
};

fn();   // 3
```

```
var a = 1;
function fn(){
	var a = 2;
    setTimeout(function(){
		var a = 3;
        console.log(this.a);
    },30);
};

fn();   // 1
```

### 匿名函数

> 匿名函数的this指向window。

```
var a = 11;
var A = {
	a: 1,
	b: [2,3,4],
	fn: function(){
		console.log(this.a);    // 1
		this.b.forEach(function(i){
			console.log(this.a);    // 11
		});
	}
}

A.fn();
```

```
var a = 1;
function fn(){
	var a = 2;
	console.log(a); // 2

	var b = [1,2,3];
	b.forEach(function(){
		console.log(this);  // window
		console.log(this.a);    // 1
	});
}
fn();
```

# 参考

+ [阮一峰的网络日志 - Javascript的this用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)