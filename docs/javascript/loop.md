# Javascript中的循环

JavaScript 支持不同类型的循环：

+ [for - 循环代码块一定的次数](#jump_for)
+ [for/in - 遍历对象，循环出的是key (可用于数组则循环出的是索引值)](#jump_forIn)
+ [while - 当指定的条件为 true 时循环指定的代码块](#jump_while)
+ [do/while - 同样当指定的条件为 true 时循环指定的代码块](#jump_doWhile)
+ [for/of - 遍历数组，循环出的是value (不可用于对象)](#jump_forOf)
+ [forEach - 遍历数组，无返回值](#jump_forEach)
+ [map - 遍历数组，返回一个新数组](#jump_map)
+ [filter - 遍历数组，筛选符合条件的元素，返回一个新数组](#jump_filter)
+ [every - 检测数组所有元素是否都符合指定条件，返回一个布尔值](#jump_every)
+ [some - 检测数组所有元素是否至少有一个符合指定条件，返回一个布尔值](#jump_some)
+ [reduce - 为数组中的每一个元素依次执行回调函数](#jump_reduce)

## <span id="jump_for">for 循环</span>

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

## <span id="jump_forIn">for/In 循环</span>

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

## <span id="jump_while">while 循环</span>

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

## <span id="jump_doWhile">do/while 循环</span>

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

## <span id="jump_forOf">for/of</span>

> 遍历数组，循环出的是value (不可用于对象)

```
let arr = ['a','b','c'];
for (let i in arr) {
    console.log(i)  // a b c
}
```

## <span id="jump_forEach">forEach</span>

> `array.forEach(function(currentValue, index, arr))`

## <span id="jump_map">map</span>

> `array.forEach(function(currentValue, index, arr))`

```
let arr = [1, 2, 3];
let newArr = arr.map( (item) => {
    return item * 10;
});
console.log(newArr);    // [10, 20, 30]
```

## <span id="jump_filter">filter</span>

> array.filter(function(currentValue,index,arr), thisValue)

```
let arr = [{a:1, isNeed: true},{a:2, isNeed: false},{a:3, isNeed: false},{a:4, isNeed: true}];
let newArr = arr.filter( item => item.isNeed );
console.log(newArr); // [{a:1, isNeed: true},{a:4, isNeed: true}]
```

## <span id="jump_every">every</span>

> 使用指定函数检测数组中的所有元素，如果检测到一个元素不满足，则返回false且停止检测；如果所有元素满足条件则返回true

> `array.every(function(currentValue,index,arr))`

```
   let arr = [1, 2, 3];
   let isOk = arr.every( item => item < 3 );
   console.log(isOk);   // false
```

## <span id="jump_some">some</span>

> 使用指定函数检测数组中的所有元素，如果检测到一个元素满足，则返回true且停止检测；如果所有元素都不满足条件则返回false

>  `array.some(function(currentValue,index,arr))`

```
   let arr = [1, 2, 3];
   let isOk = arr.some( item => item < 3 );
   console.log(isOk); // true
```

## <span id="jump_reduce">reduce</span>

> reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

> `array.reduce(function(previousValue, currentValue, currentIndex, arr), initialValue)`

+ callback （执行数组中每个值的函数，包含四个参数）
    - previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    - currentValue （数组中当前被处理的元素）
    - index （当前元素在数组中的索引）
    - array （调用 reduce 的数组）
+ initialValue （作为第一次调用 callback 的第一个参数。）

```
// 简单应用
var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) { return sumSoFar + item; };

// do the job
var total = items.reduce(reducer, 0);

console.log(total); // 1130
```

```
// 简单应用
var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) {
  sumSoFar.sum = sumSoFar.sum + item;
  return sumSoFar;
};

// do the job
var total = items.reduce(reducer, {sum: 0});

console.log(total); // {sum:1130}
```

```
var reducers = {
  totalInEuros : function(state, item) {
    return state.euros += item.price * 0.897424392;
  },
  totalInYen : function(state, item) {
    return state.yens += item.price * 113.852;
  }
};

var manageReducers = function(reducers) {
  return function(state, item) {
    return Object.keys(reducers).reduce(
      function(nextState, key) {
        reducers[key](state, item);
        return state;
      },
      {}
    );
  }
};

var bigTotalPriceReducer = manageReducers(reducers);
var initialState = {euros:0, yens: 0};
var items = [{price: 10}, {price: 120}, {price: 1000}];
var totals = items.reduce(bigTotalPriceReducer, initialState);
console.log(totals);    // {euros: 1014.08956296, yens: 128652.76}
```

# 参考

+ [w3school](http://www.w3school.com.cn/js/js_loop_for.asp)
+ 高程3 P55-58
+ [segmentfault - JS数组reduce()方法详解及高级技巧](https://segmentfault.com/a/1190000010731933)