/*
 * 以一个文本高亮插件作为案例
 */

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