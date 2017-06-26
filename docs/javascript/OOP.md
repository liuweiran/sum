# javascript的面向对象编程

## 1. 概念

> 面向对象包含： 面向对象分析、面向对象设计和面向对象编程。

+ 面向对象 Object Oriented (OO)
+ 面向对象分析 Object Oriented Analysis (OOA)
+ 面向对象设计 Object Oriented Design (OOD)
+ 面向对象编程 Object Oriented Programming (OOP)

## 2. 工厂模式

```
function createPerson(name, age){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.sayName = function(){
		console.log('My name is ' + this.name);
	}
	return o;
}

var person1 = createPerson('Peter', 20);
var person2 = createPerson('John', 18);

person1.sayName();  // My name is Peter
person2.sayName();  // My name is John
```

原始的创建对象模式是简单的创建对象实例，然后为这个对象添加属性和方法。当需要创建一些相似的对象时，这会产生大量重复的代码。

比起原始的创建对象模式，工厂模式解决了这一问题，但是却没有解决对象识别的问题，即person1和person2之间没有内在的联系，不能反映出它们是同一个原型对象的实例。

## 3. 构造函数模式

> 所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。

### 3.1 类

> Javascript中使用函数来充当类。

函数在Javascript中既可以当做普通函数使用，也可以当做类来使用，在充当类的时候，它本身又负担着构造函数的责任。

```
var a = 1;

//函数作为普通函数
function foo(){
	console.log(this.a);
}

foo();      // 1    调用函数，函数中的this表示全局window
new foo();  // undefined    普通函数也可以使用new操作符来进行调用，但是这会改变this的指向为函数

//函数作为类，按照习惯，类名首字母大写
function Test(){
	this.a = 2;
	this.log = function(){
		console.log(this.a);
	}
}
var myTest = new Test();    //使用new来实例化，类没有参数时可以省略后面的括号，直接使用new Test
myTest.log();   // 2

console.log(myTest.constructor == Test);  // true  \myTest自动含有一个constructor属性，指向它的构造函数
console.log(myTest instanceof Object);    // true  \myTest是Object的实例
console.log(myTest instanceof Test);      // true  \myTest同时也是Test的实例
```

+ 对象的constructor属性和instanceof操作符都是用来标识对象类型的，即确定原型和实例的关系。
+ 创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，这正是构造函数模式胜过工厂模式的地方。
+ 但是，每个实例都会复制一遍构造函数的属性和方法，使之占用的内存大。

### 3.2 new操作符

> 构造函数必须通过new操作符来调用才可以作为构造函数，否则，只是普通函数。

new操作符的调用实现步骤：

+ 创建一个空对象
+ 将构造函数的作用域赋给新对象（因此，this就指向了这个新对象）
+ 执行构造函数中的代码（为这个新对象添加属性）
+ 返回新对象

## 4. 原型模式

### 4.1 原型对象

> 把不变的属性和方法定义在原型对象中，其多个实例对象中的这些属性和方法都是同一个内存地址，指向prototype对象，因此可以减少内存的占用，提高运行效率。

```
function Test(year){
    this.year = year;
}
Test.prototype.a = 1;
Test.prototype.fn = function(){
    console.log(1);
};

var test1 = new Test(2010);
var test2 = new Test(2012);

console.log(test1.a == test2.a);    // true
```

+ 每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象。这个对象的所有属性和方法，都会被函数的实例继承。
+ 函数的prototype属性指向函数的原型对象，原型对象的constructor属性包含一个指向prototype属性所在函数的指针。

```
// 定义Test类的构造函数
function Test(){

}
var a = Test.prototype; // a指向Test类对应的原型
var b = a.constructor;  // b指向a对应的类的构造函数
console.log(b == Test)  // true
```

### 4.2 更简单的原型语法

> 用一个包含所有属性和方法的对象字面量来重写整个原型对象。

```
function Test(year){
    this.year = year;
}
Test.prototype = {
    a: 1,
    fn: function(){
        console.log(1);
    }

}
```

+ 每创建一个函数，就会同时创建它的prototype对象，这个对象会自动获得constructor属性。
+ 如果使用上面的语法，本质上是重写了prototype对象，此时，这个对象的constructor属性不会再指向原来的构造函数，而是变成了新对象的constructor属性（指向Object构造函数）。

```
function Test1(){

}
Test1.prototype.a = 1;

function Test2(){

}
Test2.prototype = {
	a: 1
}

console.log(Test1.prototype.constructor == Test1);   // true
console.log(Test2.prototype.constructor == Test2);   // false
console.log(Test1.prototype.constructor == Object);  // false
console.log(Test2.prototype.constructor == Object);  // true
```

```
function Test3(){

}
Test3.prototype = {
	
}

var foo = new Test3;

console.log(foo instanceof Object);      // true
console.log(foo instanceof Test3);       // true
console.log(foo.constructor == Object);  // true
console.log(foo.constructor == Test3);   // false
```

如果constructor属性很重要，可以在prototype对象中设置。

```
function Test3(){

}
Test3.prototype = {
	constructor: Test3
}

var foo = new Test3;

console.log(foo instanceof Object);      // true
console.log(foo instanceof Test3);       // true
console.log(foo.constructor == Object);  // false
console.log(foo.constructor == Test3);   // true
```

## 5. 继承

### 5.1 构造函数的继承

**在B的构造函数中调用函数A以继承A的构造函数的属性和行为，并修改this指向为B的实例化对象**

```
function A(name){
	this.name = name;
}
A.prototype = {

}

function B(name){
	A.call(this, name); 
}
B.prototype = {

}

var myB = new B('Peter');
console.log(myB.name);  // Peter
console.log(name);      // Uncaught ReferenceError: name is not defined
```

**如果调用函数A时不改变this的指向，则this指向window**

```
function A(name){
	this.name = name;
}
A.prototype = {

}

function B(name){
	A(name);
}
B.prototype = {

}

var myB = new B('Peter');
console.log(myB.name);  // undefined
console.log(name);      // Peter
```

函数B效果等同于：

```
function B(name){
    window.name = name;
}
```

### 5.2 原型链

> 利用原型让一个引用类型继承另一个引用类型的属性和方法。

构造函数、原型和实例的关系：

+ 每个构造函数都有一个原型对象
+ 原型对象都包含一个指向构造函数的指针
+ 实例都包含一个指向原型对象的内部指针
+ 实例对象都包含一个指向构造函数的指针
+ 所有函数的默认原型都是Object的实例

```
function A(){

}
A.prototype = {
	f1: function(){
		console.log(1);
	}
}

function B(){

}
B.prototype = A.prototype;
B.prototype.f2 = function(){
	console.log(2);
}
var b = new B;
b.f1();     // 1
```

通过原型链实现的继承，调用b.f1()会经历以下搜索步骤：

 1) 搜索实例
 2) 搜索B.prototype
 3) 搜索A.prototype
 
 搜索过程总是要沿着原型链一环一环直到末端才会停止。

### 5.3 原型的继承

```
function A(){

}
A.prototype = {
	f1: function(){
		console.log(1);
	}
}

function B(){

}
B.prototype = A.prototype;
B.prototype.f2 = function(){
	console.log(2);
}
var b = new B;
b.f1();     // 1
b.f2();     // 2

var a = new A;
a.f2();     // 2
```

通过 B.prototype = A.prototype; 将A的原型传给了B，但因为prototype的本质是一个hash对象，属于引用类型值，赋值时是传址的，也就是说，此时，A和B的原型是指向同一个地址，任一方做了修改，都会影响到A和B的原型。

所以，在上例中，给B原型添加方法，也会作用到A的原型。

鉴于此影响，可以使用另一种方法来实现原型的继承：

```
function A(){
    this.a = 'a';
}
A.prototype = {
	f1: function(){
		console.log(1);
	}
}

function B(){

}
B.prototype = new A();
// B.prototype.constructor = B;

/* 不能使用字面量方法来添加新的属性和方法，否则会使得上面的继承失效。
B.prototype = {
    
}
*/

B.prototype.f2 = function(){
	console.log(2);
}
var b = new B();
console.log(b.a);   // a
b.f1();             // 1
b.f2();             // 2

var a = new A;
a.f2();     // Uncaught TypeError: a.f2 is not a function
```

+ 使用`B.prototype = new A();`，使B继承了A的实例的所有方法和属性（即构造函数和原型中的），但这重写了B的prototype属性，使得prototype对象的constructor不再指向B，而是指向新的Object构造函数。

+ 如果需要，可以使用`B.prototype.constructor = B;`将其纠正，使之重新指回B。

+ 通过这种方法

# 参考

+ 编写高质量代码-Web前端开发修炼之道 P217-244
+ 高程3 P144-P169
+ [阮一峰的网络日志 - Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)