# javascript中的值覆盖（定义的优先级）

##### 构造函数中定义的属性和行为的优先级比原型中定义的属性和行为优先级高。

> 如果构造函数和原型定义了同名的属性或行为，构造函数中的属性或行为会覆盖原型中的同名的属性或行为。

```
function Test(){
	this.name = 'John';
	this.age = 20
}
Test.prototype = {
	age: 30
}
var a = new Test;
console.log(a.age);     // 20
```