/*
 * 以一个可以修改div背景颜色的插件作为案例
 * */

;(function(global) {
// 分号开头，用于防止代码压缩合并时与其他代码混在一起造成语法错误
// (function(){})();立即执行函数，闭包，避免污染全局变量

    "use strict";   // 严格模式，规范代码，提高浏览器运行效率

    var test3 = function(el) {  // 定义一个类
        console.log('来自于js测试插件test3');
        this.el = typeof el === "string" ? document.querySelector(el) : el;
    };

    test3.prototype = {     // 覆写原型链，给继承者提供方法
        setBg: function(bg) {
            this.el.style.background = bg;
        }
    };

    if (typeof module !== 'undefined' && module.exports) module.exports = test3;    // 兼容CommonJs规范
    if (typeof define === 'function') define(function() { return test3; });     // 兼容AMD/CMD规范
    global.test3 = test3;   // 注册全局变量，兼容直接使用script标签引入该插件

/*
* this，在浏览器环境指window，在nodejs环境指global
* 使用this而不直接用window/global是为了兼容浏览器端和服务端
* 将this传进函数体，使全局变量变为局部变量，可缩短函数访问全局变量的时间
* */
})(this);