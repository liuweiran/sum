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



