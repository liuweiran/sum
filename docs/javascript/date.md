# date相关操作

## 获取当前时间戳

```
//方法一
Date.parse(new Date())；

//方法二
new Date().valueOf()；

//方法三
new Date().getTime()；

//方法四  适用于ie8以上
Date.now();

/*第一种：获取的时间戳是把毫秒改成000显示，
第二种~第四种是获取了当前毫秒的时间戳。*/
```

## 获取当前日期（yyyy-MM-dd HH:MM:SS）

```
function current(){
    var now = new Date(), date = [], time = [];
    date.push(now.getFullYear(), now.getMonth() + 1, now.getDate());
    time.push(now.getHours(), now.getMinutes(), now.getSeconds());

    function addZero(arr){
       return arr.map(function(i){
            return i<10 ? '0'+i : i;
        })
    }

    return addZero(date).join('-') + ' ' + addZero(time).join(':');
}

console.log(current());     // 2017-07-05 23:18:01
```

## 解决new Date(time).getTime()在移动端返回NaN

```
//方法一 自定义方法
var time = '2017-03-24 21:00:00';
function NewDate(str) {
    if (!str) {
        return 0;
    }
    arr = str.split(" ");
    d = arr[0].split("-");
    t = arr[1].split(":");
    var date = new Date();
    date.setUTCFullYear(d[0], d[1] - 1, d[2]);
    date.setUTCHours(t[0], t[1], t[2], 0);
    return date;
}
console.log(NewDate(time).getTime());   //1490389200000

//解决方法二 Date.parse()
console.log(Date.parse(time.replace(/-/g,"/")));    //1490360400000

//解决方法三 转换日期格式
console.log(new Date(time.replace(/-/g,"/")).getTime());    //1490360400000
```

## 实时显示当前时间

```
function time(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    setTimeout('startTime()',500);
    //return h+":"+m+":"+s;
    document.write( '当前时间： '+h+":"+m+":"+s );
}

function checkTime(i){
    if (i<10) {i="0" + i}
    return i
}
time();
```

## 实时显示当前时间和将来某个时间的距离

```
function countDate(v) {
    var ends = new Date(v.replace(/-/g,"/")).getTime(),
        timer = null,
        timeMap = {
            d: 86400000, //1000*60*60*24
            h: 3600000, //1000*60*60
            m: 60000, //1000*60
            s: 1000
        };

    function time() {
        var t = ends - new Date().getTime(),
            d = Math.floor(t/timeMap.d),
            h = Math.floor(t/timeMap.h%24),
            m = Math.floor(t/timeMap.m%60),
            s = Math.floor(t/timeMap.s%60);

        switch(true) {
            case d>0:
                return d+'天';
            case h>0:
                return h+'小时';
            case m>0:
                return m+'分钟';
            case s>0:
                return s+'秒';
            case d==h==m==s==0:
                clearInterval(timer);
                return '时间已过';
        }
    }

    timer = setInterval(function() {
        //return time();
        document.write( time() );
    },200);
}
countDate('2017-03-01 15:59:39');
```

## 根据日期计算星期几

```
function week(v) {
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekDay[new Date(v).getDay()];
}
console.log(week('2017-03-01 11:37:59'));     //周三
```

## 检查某个时间是否已经过期

```
//过期返回true, 未过期返回false
function isEnd(v) {
    time = new Date(v.replace(/-/g,"/")).getTime() - new Date().getTime();
    if (time<0) return !0;
    return !1;
}
console.log(isEnd('2017-04-01 11:37:59'));
```

## 获取次日凌晨的时间戳
```
function nextDay(){
    return new Date(new Date().setHours(0,0,0,0)).getTime() + 86400000;
}
```
