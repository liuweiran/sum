# 控制台输出

## 显示信息的命令

    console.log('普通信息');
    console.info('提示性信息');
    console.error('错误信息');
    console.warn('警告信息');
    console.debug('调试信息');
    
## 占位符

格式化字符串类型：

| ----- | ----- |
| %s | 字符串 |
| %d, %i | 整数 |
| %f | 浮点数 |
| %o | 对象 |

    console.log("%d年%d月%d日",2011,3,26);
    
## 信息分组

```
console.groupe('第1组信息');
console.log('第1组第1条信息');
console.log('第1组第2条信息');
console.groupEnd();

console.groupe('第2组信息');
console.log('第2组第1条信息');
console.log('第2组第2条信息');
console.groupEnd();
```

## 查看对象的信息

> console.dir()可以显示一个对象所有的属性和方法。

```
var David = {
    age: 18,
    sex: male
};

console.dir(info);
```

## 显示某个节点的内容

> console.dirxml()用来显示网页的某个节点（node）所包含的html/xml代码。

```
<div id="box">
    <h2>案例</h2>
    <p>...</p>
</div>

var box = document.getElementById('info');
console.dirxml(info);
```

## 判断变量是否是真

> console.assert()用来判断一个表达式或变量是否为真。如果结果为否，则在控制台输出一条相应信息，并且抛出一个异常。

```
var foo = 1;
console.assert(foo);  // 1是真 控制台无输出
console.assert(foo-1);  // 0是假 控制台输出 'Assertion failed: console.assert'
```

## 追踪函数的调用轨迹

> console.trace()用来追踪函数的调用轨迹。

```
functin add(a, b){
    console.trace();
    return a+b;
}

var x = add3(1,1);
function add3(a,b){return add2(a,b);}
function add2(a,b){return add1(a,b);}
function add1(a,b){return add(a,b);}
```

## 计时功能

> console.time()和console.timeEnd()，用来显示代码的运行时间。

```
console.time("控制台计时器一");
for(var i=0;i<1000;i++){
　　for(var j=0;j<1000;j++){}
}
console.timeEnd("控制台计时器一");
```

## 统计功能

> console.count 用来统计代码被执行的次数

```
function foo(){
    // ...
    console.count('foo被执行的次数');
}
foo();
foo();
```
