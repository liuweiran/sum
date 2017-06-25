# javascript中的回调函数

> 在JavaScript中，回调函数具体的定义为：函数A作为参数(函数引用)传递到另一个函数B中，并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。因此callback 不一定用于异步，一般同步(阻塞)的场景下也经常用到回调，比如要求执行某些操作后执行回调函数。

**一个同步(阻塞)中使用回调的例子，目的是在fn1代码执行完成后执行fn2。**

```
function fn1(callback){
	// do somenthig
	callback && typeof callback === "function" && callback();
}
function fn2(){
	// do somenthig
}

fn1(fn2);
```

注：&&具有短路特性，前一个表达式为false时，后一个表达式不会被执行。


**传递参数作为回调**

```
function fn(arg1, arg2, callback1, callback2){
	if (arg1 > arg2) {
		callback1();
	} else {
		callback2();
	}
}

fn(1, 2, function(){
	console.log('参数1>参数2');
}, function(){
	console.log('参数1<参数2');
});
```

# 参考

+ [cnblogs - yunkou - 理解javascript 回调函数](http://www.cnblogs.com/yunkou/p/4088755.html)