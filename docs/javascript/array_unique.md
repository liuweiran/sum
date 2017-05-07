# 数组去重

```
var arr = ['aa','bb','ff','aa','gg','cc'];

Array.prototype.unique1 = function(){
    var n = [];	//一个新的临时数组
    for( var i=0; i<this.length; i++){
        if( n.indexOf(this[i]) == -1 ){	//如果当前数组的第i不存在n中，则push到数组n
            n.push(this[i]);
        }
    }
    return n;
};
console.log(arr.unique1());     //["aa", "bb", "ff", "gg", "cc"]


Array.prototype.unique2 = function(){
    var n = {}, r = []; //n为hash表 r为临时数组
    for( var i=0; i<this.length; i++ ){
        if( !n[this[i]] ){	//如果hash表中没有当前项
            n[this[i]] = true;	//存入hash表
            r.push(this[i]);	//把当前数组的当前项push到临时数组里面
        }
    }
    return r;
};
console.log(arr.unique2());   //["aa", "bb", "ff", "gg", "cc"]


Array.prototype.unique3 = function(){
    var n = [];
    for( var i=0; i<this.length; i++ ){
        //如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组
        if( this.indexOf(this[i])==i ) n.push(this[i]);	
    }
    return n;
};
console.log(arr.unique3());		//["aa", "bb", "ff", "gg", "cc"]


Array.prototype.unique4 = function(){
    this.sort();	//对数组的元素进行排序
    var r = [];
    for( var i=0; i<this.length; i++ ){
        if( this[i] != r[r.length-1] ) r.push(this[i]);	//比较相邻的两个值,不同则存入r
    }
    return r;
};
console.log(arr.unique4()); 	//["aa", "bb", "cc", "ff", "gg"]

//jq方法
console.log($.unique(arr));		//["cc", "gg", "ff", "bb", "aa"]
```
