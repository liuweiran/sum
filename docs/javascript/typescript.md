# typescript学习笔记

## 类的继承

```
class Animal{
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distanceInMeters: number =0) {
        console.log(`${this.name} moved ${distanceInMeters}`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);    // 执行父类的构造函数，必须至少执行一次
    }
    move(distanceInMeters = 5) {    // 子类重写了move方法
        console.log("Slithering...");
        super.move(distanceInMeters);   // 执行父类的方法 等价于 父类的构造函数.prototype.method.call(this, ...)
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();     // Slithering...  Sammy the Python moved 5
tom.move(34);   // Galloping...   Tommy the Palomino moved 34
```

## 枚举

使用枚举我们可以定义一些有名字的数字常量。 枚举通过 enum关键字来定义。

```
enum Direction {
    Up,
    Down,
    Left,
    Right
}

let up = Direction.Up;
console.log(up);    // 0
```

默认枚举类型数值从0开始，也可以手动设置某个成员的值，其后的值则递增。比如将`Down`设置为3：
```
enum Direction {
    Up,
    Down = 3,
    Left,
    Right
}

let a = Direction.Up;
let b = Direction.Down;
let c = Direction.Left;
let d = Direction.Right;
console.log(a,b,c,d);    // 0 3 4 5
```