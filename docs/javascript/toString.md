# javascript的toLocaleString()、toString()和valueOf()方法

+ toLocaleString(): 返回对象的空字符串表示，该字符串与执行环境的地区对应。经常会返回与 toString()和valueOf()方法相同的值，但也并不总是如此。
+ toString(): 返回对象的字符串表示。
+ valueOf(): 返回对象的字符串、数值或布尔值表示。通常与 toString() 方法的返回值相同。

> javascript中Array、Boolean、Date、Number等对象都具有toLocaleString()、toString()和valueOf()方法。

## Array

```
var array = new Array('zhao', 'qian', 'sun', 'li');
console.log(array.toLocaleString());    // zhao,qian,sun,li
console.log(array.toString());          // zhao,qian,sun,li
console.log(array.valueOf());           // Array(4) ["zhao", "qian", "sun", "li"]

console.log(typeof array.toLocaleString());    // string
console.log(typeof array.toString());          // string
console.log(typeof array.valueOf());           // object
```

+ toLocaleString()：把数组转换为本地数组，并返回结果。
+ toString()：把数组转换为字符串，并返回结果，每一项以逗号分割。
+ valueOf()：返回数组本身。

## Boolean

```
var boolean = new Boolean();
console.log(boolean.toLocaleString());  // false
console.log(boolean.toString());        // false
console.log(boolean.valueOf());         // false

console.log(typeof boolean.toLocaleString());  // string
console.log(typeof boolean.toString());        // string
console.log(typeof boolean.valueOf());         // boolean
```

+ toLocaleString()：根据原始布尔值返回字符串 "true" 或 "false"。默认为 "false"。
+ toString()：根据原始布尔值返回字符串 "true" 或 "false"。默认为 "false"。
+ valueOf()：返回 Boolean 对象的原始值。

## Date

```
var date = new Date();
console.log(date.toLocaleString()); // 2017-6-13 22:30:04
console.log(date.toString());       // Tue Jun 13 2017 22:30:04 GMT+0800 (CST)
console.log(date.valueOf());        // 1497364204384

console.log(typeof date.toLocaleString()); // string
console.log(typeof date.toString());       // string
console.log(typeof date.valueOf());        // number
```

+ toLocaleString()：可根据本地时间把 Date 对象转换为字符串，并返回结果，返回的字符串根据本地规则格式化。
+ toString()：把 Date 对象转换为字符串，并返回结果。使用本地时间表示。
+ valueOf()：返回 Date 对象的原始值，以毫秒表示。

## Number

```
var num = new Number(2017);
console.log(num.toLocaleString());  // 2,017
console.log(num.toString());        // 2017
console.log(num.valueOf());         // 2017

console.log(typeof num.toLocaleString());  // string
console.log(typeof num.toString());        // string
console.log(typeof num.valueOf());         // number
```

+ toLocalString()：把数字转换为字符串，使用本地数字格式顺序。
+ toString()：把数字转换为字符串，使用指定的基数。
+ valueOf()：返回一个 Number 对象的基本数字值。

# 参考

+ [Javascript toString()、toLocaleString()、valueOf()三个方法的区别](http://www.cnblogs.com/niulina/p/5699031.html)
+ 高程3 P35,P89-90
