# javascript的object操作

## Object.assign()

> `Object.assign(target, ...sources)`

## Object.is()

> 判断两个值是否是相同的值 `Object.is(value1, value2)`

`Object.is()`的行为基本与 `===` 一致，除了以下不同：

```
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## Object.keys()

> 返回给定对象的自身可枚举属性组成的数组

```
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']
```

## Object.values()

> 返回给定对象的自身可枚举属性值组成的数组

```
var arr = ['a', 'b', 'c'];
console.log(Object.values(arr)); // console: ['a', 'b', 'c']

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // console: ['a', 'b', 'c']
```

## Object.entries()

> 返回给定对象的自身可枚举属性键值对数组组成的数组

```
var arr = ['a', 'b', 'c'];
console.log(Object.entries(arr)); // console: [['0', 'a'], ['1', 'b'], ['2', 'c']]

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(obj)); // console: [['0', 'a'], ['1', 'b'], ['2', 'c']]
```

## delete

> 从某个对象上移除指定属性

+ `delete object.property `
+ `delete object['property']`