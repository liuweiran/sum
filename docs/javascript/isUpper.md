# 判断一个字母的大小写

方法一：
```
function isUpper1(letter){
    return /[A-Z]/.test(letter);
}
console.log(isUpper1('A'));     //true
console.log(isUpper1('a'));     //false
```

方法二：
```
function isUpper2(letter){
    return letter === letter.toUpperCase();
}
console.log(isUpper2('A'));     // true
console.log(isUpper2('a'));     // false
```

方法三：
```
function isUpper3(letter){
    if (letter.charCodeAt(0) < 90) {
        return true;
    } else if (letter.charCodeAt(0) > 96) {
        return false;
    }
}
console.log(isUpper3('A'));     // true
console.log(isUpper3('a'));     // false
```

方法四：
```
function isUpper4(letter){
    if (letter >= 'A' && letter <= 'Z') {
        return true;
    } else if (letter >= 'a' && letter <= 'z') {
        return false;
    }
}
console.log(isUpper4('A'));     // true
console.log(isUpper4('a'));     // false
```

# 更改字符串的大小写

方法一：
```
function changeCase(str){
    var newStr = '';
    for (var i=0; i<str.length; i++) {
        /[A-Z]/.test(str[i]) ? newStr += str[i].toLowerCase() : newStr += str[i].toUpperCase();
    }
    return newStr;
}

var foo = 'aBcDeFg';
console.log(changeCase(foo));   // AbCdEfG
```

方法二：
```
function changeCare(str){
    var arr = str.split('').map(function(i){
        return i === i.toUpperCase() ? i.toLowerCase() : i.toUpperCase();
    });
    return arr.join().replace(/,/g ,'');
}

var foo = 'aBcDeF';
console.log(changeCare(foo));   // AbCdEf
```