# 获取字符串长度

```
var txt = 'abc这里有17个字符';

//方法一
String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
             len += 2;
         } else {
             len ++;
         }
     }
    return len;
};
console.log(txt.gblen());   //17


//方法二
function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 双字节加2
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            len++;
        }
        else {
            len+=2;
        }
    }
    return len;
}
console.log(strlen(txt));   //17


//方法三
var jmz = {};
jmz.GetLength = function(str) {
    //获得字符串实际长度，中文2，英文1
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};
console.log(jmz.GetLength(txt));    //17


//方法四
function gLen(str){
    var l = str.length;
    var blen = 0;
    for (i=0; i<l; i++) {
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            blen ++;
        }
        blen ++;
    }
    return blen;
}
console.log(gLen(txt));     //17


//方法五 把双字节的替换成两个单字节的然后再获得长度
getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
};
console.log(getBLen(txt));      //17
```
