# Javascript中的循环

JavaScript 支持不同类型的循环：

+ for - 循环代码块一定的次数
+ for/in - 循环遍历对象的属性/数组
+ while - 当指定的条件为 true 时循环指定的代码块
+ do/while - 同样当指定的条件为 true 时循环指定的代码块

## for 循环

> for 语句是一种前测试循环语句。

```
for (语句 1; 语句 2; 语句 3) {
    //被执行的代码块
}
  
/*
 * 语句 1 在循环（代码块）开始前执行
 * 语句 2 定义运行循环（代码块）的条件
 * 语句 3 在循环（代码块）已被执行之后执行
 */

```

```
for (var i=0; i<5; i++) {
	console.log(i);
}
```

### 语句 1

+ 通常我们会使用语句 1 初始化循环中所用的变量 (var i=0)。
+ 语句 1 是可选的，也就是说不使用语句 1 也可以。
+ 您可以在语句 1 中初始化任意（或者多个）值：

```
var colors = ['red', 'grey', 'blue'];
for (var i=0, len=colors.length; i<len; i++) {
	console.log(colors[i]);
}
```
> 同时您还可以省略语句 1（比如在循环开始前已经设置了值时）：

```
var colors = ['red', 'grey', 'blue'];
var i = 0, len = colors.length;
for (; i<len; i++) {
	console.log(colors[i]);
}
```

### 语句 2

+ 通常语句 2 用于评估初始变量的条件。
+ 语句 2 同样是可选的。
+ 如果语句 2 返回 true，则循环再次开始，如果返回 false，则循环将结束。
+ 提示：如果您省略了语句 2，那么必须在循环内提供 break。否则循环就无法停下来。这样有可能令浏览器崩溃。

### 语句 3

+ 通常语句 3 会增加初始变量的值。
+ 语句 3 也是可选的。
+ 语句 3 有多种用法。增量可以是负数 (i--)，或者更大 (i=i+15)。
+ 语句 3 也可以省略（比如当循环内部有相应的代码时）：

```
var colors = ['red', 'grey', 'blue'];
var i = 0, len = colors.length;
for (; i<len;) {
	console.log(colors[i]);
	i++;
}
```

> 也有把循环条件和判断条件写到一起的：

```
for (var i=5; i--;) {
	console.log(i);     //打印4/3/2/1/0  i-到0时为false,循环将停止
}
```

## for/In 循环

> for/in 语句循环遍历对象的属性：

```
var person = {name: 'Peter', sex: 'male', age: '30'};
for (x in person) {
	console.log(person[x]);     // x分别等于 name/sex/age  打印结果分别为 peter/male/30
}
```

```
var colors = ['red', 'grey', 'blue'];
for (i in colors) {
	console.log(colors[i]);     // i分别等于 0/1/2  打印结果分别为 red/grey/blue
}
```

## while 循环

> while 语句属于前测试循环语句。在循环体内的代码被执行之前，就会对出口条件求值。因此，循环体内的代码有可能不会被执行。

```
while (条件) {
    //需要执行的代码
}
```

```
var i = 0;
while (i<5) {
	console.log(i);
	i += 2;
}
```

## do/while 循环

> do/while 语句是一种后测试循环语句，即只有在循环体中的代码执行之后，才会测试出口条件。也就是说，在对条件表达式求值之前，该循环会执行一次代码块，在检查条件是否为真之前，然后如果条件为真的话，就会重复这个循环。

```
do {
    //需要执行的代码
} while (条件);
```

```
var i = 0;
do {
	i += 2;
    console.log(i);     // 会执行一次 打印2
} while (i <=0 );
```
# 参考

+ [w3school](http://www.w3school.com.cn/js/js_loop_for.asp)
+ 高程3 P55-58