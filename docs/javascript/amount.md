# 金额数字格式化 (逗号隔开保留两位小数)

```
function outputAmount(number){
    var num = number.toFixed(2).split('.');
    var len = num[0].length;
    if (len > 3) {
        var r = len % 3;
        var num1 = r > 0 ? [num[0].substring(0, r)] : [];
        var m = (len - r)/3;
        for ( var i=0; i<m; i++ ) {
            num1.push(num[0].substring(3*i+r, 3*(i+1)+r));
        }
        return num1 + '.' + num[1];
    } else {
        return number.toFixed(2);
    }
}

console.log(outputAmount(12));              // 12.00
console.log(outputAmount(12345678));        // 12,345,678.00
console.log(outputAmount(12345678.1));      // 12,345,678.10
console.log(outputAmount(12345678.12));     // 12,345,678.12
console.log(outputAmount(12345678.123));    // 12,345,678.12
console.log(outputAmount(12345678.128));    // 12,345,678.13
```