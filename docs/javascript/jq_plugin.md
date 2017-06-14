# jQuery插件编写

[完整的jQuery插件案例请查看js文件](./demos/javascript/plugin)

> 为了方便用户创建插件，jquery提供了jQuery.extend()和jQuery.fn.extend()方法。

## jQuery.extend()

> jQuery.extend( [deep ], target, object1 [, objectN ] )

| 参数 | 类型 | 用法 |
| ----- | ----- | ----- | 
| deep | Boolean | 如果是 true，合并成为递归（又叫做深拷贝）。不支持给这个参数传递 false |
| target | Object | 一个对象，如果附加的对象被传递给这个方法将那么它将接收新的属性，如果它是唯一的参数将扩展jQuery的命名空间。 |
| object1 | Object | 一个对象，它包含额外的属性合并到第一个参数。 |
| objectN | Object | 一个对象，它包含额外的属性合并到第一个参数。 |

### 扩展jQuery静态方法。

> 如果只有一个参数提供给$.extend()，这意味着目标参数被省略。在这种情况下，jQuery对象本身被默认为目标对象。这样，我们可以在jQuery的命名空间下添加新的功能。这对于插件开发者希望向 jQuery 中添加新函数时是很有用的。

```
$.extend({
   test: function () {
       alert('test');
   }
});

// 调用：$.test();
```

### 合并多个对象。

> 当我们提供两个或多个对象给$.extend()，对象的所有属性都添加到目标对象（target参数)。
  目标对象（第一个参数）将被修改，并且将通过$.extend()返回。然而，如果我们想保留原对象，我们可以通过传递一个空对象作为目标对象。

```
var obj1 = {color: 'red', fontSize: '14px'},
    obj2 = {color: 'blue', background: 'pink'};
    
var newObj = $.extend(obj1, obj2);  // {color: 'blue', fontSize: '14px', background: 'pink'} obj1也会被修改

var newObj = $.extend({}, obj1, obj2);  // obj1不会被修改
```

*采用递归方式合并两个对象：*

在默认情况下，通过$.extend()合并操作不是递归的;如果第一个对象的属性本身是一个对象或数组，那么它将完全用第二个对象相同的key重写一个属性。这些值不会被合并。可以通过检查下面例子中 banana 的值，就可以了解这一点。然而，如果将 true 作为该函数的第一个参数，那么会在对象上进行递归的合并。

```
var object1 = {
    apple: 0,
    banana: { weight: 52, price: 100 },
    cherry: 97
};
var object2 = {
    banana: { price: 200 },
    durian: 100
};

$.extend( object1, object2 );   // {"apple":0,"banana":{"price":200},"cherry":97,"durian":100}

$.extend( true, object1, object2 );     // {"apple":0,"banana":{"weight":52,"price":200},"cherry":97,"durian":100}
```

*合并 defaults 和 options 对象，并且不修改 defaults 对象。这是常用的插件开发模式。*

```
var defaults = {key1: 'value1', key2: 'value2'},
    options = {key2: 'value22'};
var settings = $.extend({}, defaults, options);
```

## jQuery.fn.extend()

> 通过 $.fn.extend() 向jQuery添加新的方法

```
// 查看jQuery源码可知：
jQuery.fn = jQuery.prototype = {
    init: function( selector, context ) {.....};
};
```

原来 jQuery.fn = jQuery.prototype，也就是jQuery对象的原型。那jQuery.fn.extend()方法就是扩展jQuery对象的原型方法。我 们知道扩展原型上的方法，就相当于为对象添加"成员方法"，类的"成员方法"要类的对象才能调用，所以使用 jQuery.fn.extend(object)扩展的方法， jQuery类的实例可以使用这个"成员函数"。

```
$.fn.extend({
   test: function () {
       this.css({color: 'red'})
   }
});

// 调用：$(selector).test();
```

```
$.fn.test = function (opts) {};

// 等价于
var test = {
    function (opts) {};
}
$.fn.extend(test) = $.prototype.extend(test) = $.fn.test
```

```
/*
* 以一个文本高亮插件作为案例
* */

// 闭包限定命名空间
(function ($) {
    $.fn.extend({
       test2: function (options) {
           console.log('来自于jQuery测试插件test2');

           // 检测用户传入的参数是否合法
           if (!isValid(options)) return this;  // 如果传入的参数不合法，直接return jQuery对象

           var opts = $.extend({}, defaults, options);  // 使用 jQuery.extend 覆盖插件默认参数
           return this.each(function () {  // 此处的 this 表示调用插件的jQuery对象；return jQuery对象，使之支持链式调用 (链式调用，就是可以在一个jQuery对象上调用多个方法，如$(selector).test2().hide())
               var $this = $(this);    // 当前循环的dom 的jQuery对象

               // 根据参数来设置dom的样式
               $this.css({
                   backgroundColor: opts.background,
                   color: opts.color
               });

               // 格式化高亮文本
               var html = $this.html();
               html = $.fn.test2.format(html);
               $this.html(html);
           });
       }
    });

    // 默认参数
    var defaults = {
       background: 'orange',
       color: 'red'
    };

    // 公共的格式化方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
    $.fn.test2.format = function (str) {
        return '<b>' + str + '</b>';
    };

    // 私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === 'object') ? true : false;
    }

})(jQuery);
```

# 参考

+ [jQuery API中文文档](http://www.css88.com/jqapi-1.9/jQuery.extend/)
+ [jQuery插件编写步骤详解](http://www.jb51.net/article/85798.htm)