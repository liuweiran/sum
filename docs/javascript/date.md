# javascript中的Date对象方法

| 方法 | 描述 |
| ----- | ----- |
| <a href="#jump_concat">Date()</a> | 返回当日的日期和时间 |
| getDate() | 从 Date 对象返回一个月中的某一天 (1 ~ 31) |
| getDay() | 从 Date 对象返回一周中的某一天 (0 ~ 6) |
| getMonth() | 从 Date 对象返回月份 (0 ~ 11) |
| getFullYear() | 从 Date 对象以四位数字返回年份 |
| getHours() | 返回 Date 对象的小时 (0 ~ 23) |
| getMinutes() | 返回 Date 对象的分钟 (0 ~ 59) |
| getSeconds() | 返回 Date 对象的秒数 (0 ~ 59) |
| getMilliseconds() | 返回 Date 对象的毫秒(0 ~ 999) |
| getTime() | 返回 1970 年 1 月 1 日至今的毫秒数 |
| <a href="#jump_concat">parse()</a> | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数 |
| setDate() | 设置 Date 对象中月的某一天 (1 ~ 31) |
| setMonth() | 设置 Date 对象中月份 (0 ~ 11) |
| setFullYear() | 设置 Date 对象中的年份（四位数字） |
| setHours() | 设置 Date 对象中的小时 (0 ~ 23) |
| setMinutes() | 设置 Date 对象中的分钟 (0 ~ 59) |
| setSeconds() | 设置 Date 对象中的秒钟 (0 ~ 59) |
| setMilliseconds() | 设置 Date 对象中的毫秒 (0 ~ 999) |
| setTime() | 以毫秒设置 Date 对象 |

## <a name="jump_date">Date()</a>

```
Date() //"Wed Mar 28 2018 17:50:30 GMT+0800 (中国标准时间)"
```

## <a name="jump_parse">parse()</a>

> `Date.parse(datestring)`  datestring 表示日期和时间的字符串。

> PS: `Date.parse()`不同于`dateObject.getTime()`，会把毫秒改成`000`显示

```
Date.parse(new Date());
Date.parse("Jul 8, 2005") //1120752000000
Date.parse('2018-03-29')  //1522281600000
console.log(Date.parse(new Date()),new Date().getTime()) //1522285621000 1522285621714
```

# date相关操作

## 获取当前时间戳

```
//方法一
Date.parse(new Date());

//方法二
new Date().valueOf();

//方法三
new Date().getTime();

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

## 判断当前时间是否在某个时间段内 参数格式hh:mm
```
function (beginTime, endTime) {
  let strb = beginTime.split(":");
  let stre = endTime.split(":");

  let b = new Date();
  let e = new Date();
  let n = new Date();

  b.setHours(strb[0]);
  b.setMinutes(strb[1]);
  e.setHours(stre[0]);
  e.setMinutes(stre[1]);

  if ( n.getTime() >= b.getTime() && n.getTime() <= e.getTime() ) {
    return true;
  } else {
    return false;
  }
}
```

# 参考

+ [w3school](http://www.w3school.com.cn/jsref/jsref_obj_date.asp)