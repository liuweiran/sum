# javascript的基本类型 & 引用类型

> ECMAScript包含两个不同类型的值：基本类型值和引用类型值。基本类型值指的是简单的数据段；引用类型值指由多个值构成的对象。在将一个值赋给变量时，解析器必须确定这个值是基本类型值还是引用类型值。

## 数据类型

**基本类型**

+ 基本类型值指的是简单的数据段：String、Number、Boolean、Undefined、Null
+ 这5种基本数据类型的值是按值访问的，因为可以操作保存在变量中的实际的值
+ 基本类型的变量是存放在栈区的（栈区指内存里的栈内存）
     
**引用类型**
    
+ 引用类型值指的是可能由多个值构成的对象：Object、Array、Function
+ 引用类型的值是保存在内存中的对象，按引用访问
+ Javascript不允许直接访问内存中的位置，在操作时，操作的是对象的引用
+ 引用类型的存储需要内存的栈区和堆区共同完成。栈区内存保存变量标识符和指向堆内存中该对象的指针，也可以说是该对象在堆内存的地址

## 声明变量时的内存分配

**基本类型**

存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。这是因为这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – 栈中。这样存储便于迅速查寻变量的值。

**引用类型**

存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存地址。这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。

## 访问机制

在javascript中是不允许直接访问保存在堆内存中的对象的，所以在访问一个对象时，首先得到的是这个对象在堆内存中的地址，然后再按照这个地址去获得这个对象中的值，这就是传说中的按引用访问。而基本类型的值则是可以直接访问到的。

## 动态属性

**基本类型**

> 不能为基本类型的值添加属性和方法，尽管这样做不会导致任何错误。

```
var name = "Peter";
name.age = 10;
console.log(name.age);      // undefined
```

**引用类型**

> 可以为引用类型的值添加属性和方法，也可以改变和删除其属性和方法。

```
var person = new Object();
person.name = "Peter";
console.log(person.name);   // Peter
```

## 复制变量值

**基本类型**

> 从一个变量向另一个变量复制基本类型值，会在变量对象上创建一个新值，它们拥有相同的value，但此后两个变量所参与的任何操作不会相互影响。

```
var a = 1;
var b = a;
b = 2;
console.log(a);     // 1
console.log(b);     // 2

var c = true;
var d = c;
d = false;
console.log(c);     // true
console.log(d);     // false
```

**引用类型**

> 从一个变量向另一个变量复制引用类型值，同样也会复制一份储存在变量对象中的值到为新变量分配的空间中。不同的是，复制的这个值实际是一个指针，这个保存在栈区的指针指向存储在堆区的一个对象。复制操作结束后，两个变量实际上指向同一个对象，所以两个变量引用的也是同一个对象。改变其中一个变量，另一个也会随之受到影响。

```
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Peter";
console.log(obj2.name);     // Peter
```

```
var arr1 = [1, 2, 3];
var arr2 = arr1;
arr2.push(4);
console.log(arr1);  // [1, 2, 3, 4]
console.log(arr2);  // [1, 2, 3, 4]
```

## 传递参数

> ECMAScript中所有函数的参数都是按值来传递的。但是涉及到基本类型与引用类型的值时仍然有区别，是因为内存分配时的差别。其实，传递参数，就是把实参复制给形参的过程。

**基本类型**

只是把变量里的值传递给参数，之后参数和这个变量互不影响。

```
function fn(x){
	x += 10;
	return x;
}
var a = 1;
var result = fn(a);

console.log(a);         // 1
console.log(result);    // 11
```

**引用类型**

对象变量的值是这个对象在堆内存中的内存地址，因此它传递的值也就是这个内存地址，这也就是为什么函数内部对这个参数的修改会体现在外部的原因，因为它们都指向同一个对象。

说得再通白些，变量把它里面的值（指向内存地址的值）传递（复制）给了参数，让这个参数也指向原对象。因此如果在函数内部给这个参数赋值另一个对象时，这个参数就会更改它的值为新对象的内存地址，并指向新的对象，但此时原来的变量仍然指向原来的对象，这时候他们是相互独立的；但如果这个参数是改变对象内部的属性的话，这个改变会体现在外部，因为他们共同指向的这个对象被修改了。

```
var obj1 = {
    value:'111'
};

var obj2 = {
    value:'222'
};

function changeStuff(obj){
    obj.value = '333';
    obj = obj2;
    return obj.value;
}

var foo = changeStuff(obj1);

console.log(foo);  // '222' 参数obj指向了新的对象obj2
console.log(obj1.value);  //'333'

/* obj1仍然指向原来的对象,之所以value改变了,
 * 是因为changeStuff里的第一条语句，这个时候obj是指向obj1的
 * 再啰嗦一句，如果是按引用传递的话，这个时候obj1.value应该是等于'222'的
 */
```

```
function setName(obj){
	obj.name = "Peter";
	obj = new Object();
	obj.name = "John";
	return obj;
}

var person = new Object();
var anotherPerson = setName(person);
console.log(person.name);           // Peter
console.log(anotherPerson.name);    // John

/* person被传递给setName()之后，此时，person和obj拥有同样的值，所以，它们指向的是同一个对象
 * 当在函数内部为obj添加name属性之后，person所指向的对象被修改，因为obj和person指向同一个对象
 * 当执行到 obj = new Object() 时，obj被修改为指向一个新的对象
 * 接着，这个新的对象被添加了一个name属性，而person所指向的对象并不受此影响，所以 person.name = "Peter"
 * 最后，函数中新建的这个对象作为函数的值被返回，新定义的变量anotherPerson指向这个对象，所以 anotherPerson.name = "John"
 */
```

# 参考

+ 高程3 P68-71
+ [知乎 - javascript传递参数如果是object的话，是按值传递还是按引用传递？](https://www.zhihu.com/question/27114726/answer/35481766)