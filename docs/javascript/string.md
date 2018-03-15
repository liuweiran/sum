# javascript的string操作

+ <a href="#jump_split">字符串分割&提取</a>
    - split
    - trim
    - slice
    - substring
    - substr
    - charAt
+ <a href="#jump_concat">字符串连接</a>
    - concat
+ <a href="#jump_index">字符串检索</a>
    - indexOf
    - lastIndexOf
    - search
+ <a href="#jump_match">字符串匹配</a>
    - match
    - replace

## <a name="jump_split">字符串分割&提取</span>

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
console.log(str.split('',3)) // ["H", "o", "w"]
```

### trim

> 去掉字符串的前后空白

```
let str = ' abc def  ';
str.trim();  // "abc def"
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

```
let str = 'abcdef';
console.log(str.substr(1)) // "bcdef"
console.log(str.substr(2,2)) // "cd"
console.log(str.substr(-2,2)) // "ef"
```

### charAt

> 提取指定位置的字符：字符串中第一个字符的下标是 0。如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。

> `stringObject.charAt(index)`

```
let str = 'abcdef';
console.log(str.charAt(1)) // "b"
console.log(str.charAt(-2)) // ""
```

## <a name="jump_concat">字符串连接</a>

### concat

> 用于连接两个或多个字符串。(PS: 使用 " + " 运算符来进行字符串的连接运算通常会更简便一些。)

> `stringObject.concat(stringX,stringX,...,stringX)`

## <a name="jump_index">字符串检索</a>

### indexOf

> 返回某个指定的字符串值在字符串中首次出现的位置，如果没有则返回 -1。

> `stringObject.indexOf(searchvalue,fromindex)`

+ searchvalue 必需。规定需检索的字符串值。
+ fromindex 可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。

```
let str = 'abcdeabcde';
console.log(str.indexOf('b'));      // 1
console.log(str.indexOf('bc'));     // 1
console.log(str.indexOf('bc',4));   // 6
```

### lastIndexOf

> 返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。

> `stringObject.lastIndexOf(searchvalue,fromindex)`

+ searchvalue 必需。规定需检索的字符串值。
+ fromindex 可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的最后一个字符处开始检索。`注意：该参数从后往前取`

```
let str = 'abcdeabcde';
console.log(str.lastIndexOf('b'));      // 6
console.log(str.lastIndexOf('bc'));     // 6
console.log(str.lastIndexOf('bc',4));   // 1
```

## search

> 返回检索与正则表达式匹配的字符所在位置，没有匹配到则返回 -1。search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex 属性，并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。

> `stringObject.search(regexp)` search方法也接受字符串作为参数，但不推荐如此使用，使用字符串作为参数时，`indexOf`方法性能更高。

```
let str = 'abcdeABCDE';
str.search(/A/);    // 5
str.search(/A/i);   // 0
str.search('a');    // 0
```


## <a name="jump_match">字符串匹配</a>

### match

> 在字符串内检索指定的值，返回一个类数组或者全局匹配的正则表达式匹配到的结果组成的数组，没有匹配到则返回null.

> `stringObject.match(searchvalue/regexp)`

```
let str = 'abcdeabcde';
console.log(str.match('a')); // ["a", index: 0, input: "abcdeabcde"]
console.log(str.match(/b/)); // ["b", index: 1, input: "abcdeabcde"]
console.log(str.match(/b/g));// ["b", "b"]
console.log(str.match('f')); //  null
```

如果正则表达式包含子表达式，则返回结果也会包含子表达式匹配到的结果在其中；不过，若正则具有 `g` 标志，则仅返回最终匹配结果的组成的数组。

```
let str = '1988-11-13 1989-11-13';
str.match(/(19|20)\d{2}/);   // ["1988", "19", index: 0, input: "1988-11-13 1989-11-13"]
str.match(/(19|20)\d{2}/g);  // ["1988", "1989"]
```

### replace

> replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

> `stringObject.replace(regexp/substr,replacement)`

```
let str = 'abcdeabcde';
str.replace('a', 1);   // "1bcdeabcde"
str.replace(/a/,1);    // "1bcdeabcde"
str.replace(/a/g,1);   // "1bcde1bcde"
```

replace() 方法的参数 replacement 可以是函数而不是字符串，该函数的参数的匹配到的结果信息，如果全局匹配包含多个结果，则循环该函数。

`stringObject.replace(regexp/substr, function(word, word1, ..., wordN, index, input){})`

该函数的参数：
+ word 匹配的字符
+ word1 ~ wordN 子表达式匹配的字符，可以有0个或多个这样的参数
+ index 匹配的字符索引值
+ input  stringObject本身

# 参考

+ [脚本之家 - js字符串操作总结(必看篇)](http://www.jb51.net/article/97915.htm)
+ [W3Schools - JavaScript String 对象](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)


