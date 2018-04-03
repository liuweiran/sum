# javascript的array操作

| 方法 | 描述 |
| ----- | ----- |
| push() | 向数组的末尾添加一个或更多元素，并返回新的长度。 |
| concat() | 连接两个或更多的数组，并返回结果。 |
| <a href="#jump_concat">join()</a> | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 |
| pop() | 删除并返回数组的最后一个元素 |
| shift() | 删除并返回数组的第一个元素 |
| unshift() | 向数组的开头添加一个或更多元素，并返回新的长度 |
| <a href="#jump_slice">slice()</a> | 从某个已有的数组返回选定的元素 |
| <a href="#jump_splice">splice()</a> | 删除元素，并向数组添加新元素。 |
| reverse() | 颠倒数组中元素的顺序。 |
| <a href="#jump_sort">sort()</a> | 对数组的元素进行排序。 |
| <a href="#jump_includes">includes()</a> | 查找一个值是否在数组 |

## <a name="jump_concat">join()</a>

> `arrayObject.join(separator)`

> separator	可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。

```
let arr = [1,2,3];
arr.join()    // "1,2,3"
arr.join('')  // "123"
arr.join('.') // "1.2.3"
```

## <a name="jump_slice">slice()</a>

> 返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

> `arrayObject.slice(start,end)`

+ start 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
+ end 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

```
let arr = ['a','b','c','d'];
arr.slice(1);   // ["b", "c", "d"]
arr.slice(1,3); // ["b", "c"]
```

## <a name="jump_splice">splice()</a>

> `arrayObject.splice(index,howmany,item1,.....,itemX)`

| 参数 | 描述 |
| ----- | ----- |
| index | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。|
| howmany | 必需。要删除的项目数量。如果设置为 0，则不会删除项目。|
| item1, ..., itemX | 可选。向数组添加的新项目。|

```
let arr = ['a','b','c','d'];
console.log(arr.splice(0,1)); //["a"]
console.log(arr) //["b", "c", "d"]
```

```
let arr = ['a','b','c','d'];
console.log(arr.splice(1,2,'11','22')) //["b", "c"]
consooe.log(arr);   //["a", "11", "22", "d"]
```

## <a name="jump_sort">sort()</a>

> `arrayObject.sort(sortby)`  `sortby`必须是函数，如果省略参数，则按照字符编码的顺序进行排序。

比较函数的参数a,b 如果函数返回值>0则，b在a前；返回值<0则，b在a后；=0则排序不变。

```
function sortNumber(a,b){
    return a - b
}

let arr = ['1','3', '6','2'];
arr.sort(sortNumber) // ["1", "2", "3", "6"]
```

## <a name="jump_includes">includes()</a>

> `arrayObject.includes(value, index)`

```
let arr = ['a','b','c','d'];
arr.includes('a');   //true
arr.includes('a',0); //true
arr.includes('a',1); //false
```

# 参考

+ [w3school](http://www.w3school.com.cn/jsref/jsref_obj_array.asp)