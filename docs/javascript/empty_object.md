# 判断一个对象是否为空对象

```
//为空对象时返回true
function isEmptyObject(obj) {
    for (var key in obj)
        return !1;
    return !0;
}

var a = {}, b = {k: 'kk'};
console.log(isEmptyObject(a));  //true
console.log(isEmptyObject(b));  //false
```
