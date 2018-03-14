# javascript的字符串操作

+ 字符串分割&提取 split/slice/substring/substr

## 字符串分割&提取

### split

> 把一个字符串分割成字符串数组。

> `stringObject.split(separator,howmany)`

+ separator 必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
+ howmany 可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。

```
let str = "How are you";
console.log(str.split(""))  // ["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u"]
console.log(str.split(" ")) // ["How", "are", "you"]
console.log(str.split(/\s+/)) // ["How", "are", "you"]
```

### slice

> 提取字符串的某个部分，并以新的字符串返回被提取的部分。

> `stringObject.slice(start,end)`

+ start 必需。要抽取的片断的起始下标。如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。
+ end 可选。紧接着要抽取的片段的结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。

```
let str = 'abcdef';
console.log(str.slice(1)) // "bcdef"
console.log(str.slice(1,3)) // "bc"
console.log(str.slice(-1)) // "f"
console.log(str.slice(-1,1)) // ""
console.log(str.slice(1, -2)) // "bcd"
```

### substring

> 同`slice方法`，但不接受为负的参数。

### substr

> 从指定下标开始，抽取指定长度的字符。

> `stringObject.substr(start,length)`

+ start 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
+ length 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。


# 参考

+ [脚本之家 - js字符串操作总结(必看篇)](http://www.jb51.net/article/97915.htm)
+ [W3Schools - JavaScript String 对象](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)


