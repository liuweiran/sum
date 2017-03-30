<br>

# LESS简介

LESS是一门动态样式语言，属于CSS预处理语言的一种。LESS语法基于CSS（完全兼容CSS语法），且对其进行了扩充，为CSS赋予了动态语言的特性，它增加了诸如嵌套、变量、混合、运算、函数等功能以及父选择符`&`，让CSS更易编写和维护。

<br>

# LESS语法

+ [嵌套规则（Nested rules）](#jump_nr)
+ [父选择符&（Parent Selectors）](#jump_ps)
+ [变量（Variables）](#jump_va)
+ [扩展（Extend）](#jump_ex)
+ [混合（Mixins）](#jump_mi)
+ [运算（Operations）](#jump_op)
+ [函数（Functions）](#jump_fu)
+ [注释（Comments）](#jump_co)


<br>

## <span id="jump_nr">嵌套规则（Nested rules）</span>

>LESS中可使用选择器的嵌套来实现继承，类似HTML结构。

LESS源码：

<pre>
.box{
  background: #f5f5f5;
  h1{
    color: blue;
  }
  p{
    color: green;
    a{
      text-decoration: none;
      color: red;
    }
  }
}
</pre>

编译后的CSS：

<pre>
.box {
  background: #f5f5f5;
}
.box h1 {
  color: blue;
}
.box p {
  color: green;
}
.box p a {
  text-decoration: none;
  color: red;
}
</pre>

<br>

## <span id="jump_ps">父选择符&（Parent Selectors）</span>

>符号`&`表示当前选择器的父选择器。

LESS源码：

<pre>
//以下代码中的&代表选择器a
a{
  text-decoration: none;
  color: red;
  &:hover{
    text-decoration: underline;
  }
  &>span{
    color: blue;
  }
}
</pre>

编译后的CSS：

<pre>
a {
  text-decoration: none;
  color: red;
}
a:hover {
  text-decoration: underline;
}
a > span {
  color: blue;
}
</pre>

<br>

>&可用于生成重复的类名。

LESS源码：

<pre>
.btn{
  width: 60px;
  height: 24px;
  &-red{
    background: red;
  }
  &-grey{
    background: grey;
  }
}
</pre>

编译后的CSS：

<pre>
.btn {
  width: 60px;
  height: 24px;
}
.btn-red {
  background: red;
}
.btn-grey {
  background: grey;
}
</pre>

<br>

>&可以在一个选择器中多次出现。

LESS源码：

<pre>
.test{
  & + &{
    color: red;
  }
  & &{
    color: green;
  }
  &, &ing{
    color: orange;
  }
}
</pre>

编译后的CSS：

<pre>
.test + .test {
  color: red;
}
.test .test {
  color: green;
}
.test,
.testing {
  color: orange;
}
</pre>

<br>

>&如果放到当前选择器后面，则会改变选择器的顺序。可以利用此点给父选择器前置插入一个选择器。

LESS源码：

<pre>
.box{
  h2{
    background: #f5f5f5;
    .wrap &{
      background: none;
    }
  }
}
</pre>

编译后的CSS：

<pre>
.box h2 {
  background: #f5f5f5;
}
.wrap .box h2 {
  background: none;
}
</pre>

<br>

## <span id="jump_va">变量（Variables）</span>

### 变量的定义

>变量允许我们单独定义一些通用的样式，在需要的时候进行调用。

LESS源码：

<pre>
@grey: #f5f5f5;
.box{
  background: @grey;
  border: 1px solid @grey;
}
</pre>

编译后的CSS：

<pre>
.box {
  background: #f5f5f5;
  border: 1px solid #f5f5f5;
}
</pre>

<br>

>可以使用变量定义变量。

LESS源码：

<pre>
@a: red;
@b: @a;
div{
  color: @b;
}
</pre>

编译后的CSS：

<pre>
div {
  color: red;
}
</pre>

<br>

>变量是延迟加载的，在使用前不一定要预先声明。（混合也是）

LESS源码：

<pre>
.box{
  color: @a;
}
@a: @b;
@b: red;
</pre>

编译后的CSS：

<pre>
.box {
  color: red;
}
</pre>

<br>

### 变量的作用域

>LESS中的变量有其作用域，即全局变量和局部变量的概念。查找变量的顺序是从局部往父级进行查找，在局部定义中找不到则查找父级定义，直至全局。

LESS源码：

<pre>
@grey: #eee;
.box1{
  @grey: #f5f5f5;
  p{
    background: @grey;  //此处取的是最近定义的局部变量@grey: #f5f5f5;
  }
}
.box2{
  background: @grey;  //此处取的是最上面定义的全局变量@grey: #eee;
}
</pre>

编译后的CSS：

<pre>
.box1 p {
  background: #f5f5f5;
}
.box2 {
  background: #eee;
}
</pre>

<br>

### 变量插值

>Less的变量除了用于表示CSS属性值，还可用于选择器名称、属性名称、URL等。

LESS源码：

<pre>
@selector: box;
@image: "../images";
.@{selector} {
  color: red;
  background: #f5f5f5 url("@{image}/bg.jpg");
}
</pre>

编译后的CSS：

<pre>
.box {
  color: red;
  background: #f5f5f5 url("../images/bg.jpg");
}
</pre>

<br>

## <span id="jump_ex">扩展（Extend）</span>

### 扩展概念

>extend是一个LESS伪类，它会把它所在的选择器扩展到它所引用的选择器上，使之拥有引用选择器的全部属性。（扩展的是选择器，而不是CSS。）

LESS源码：

<pre>
.test{
  background: pink;
}
.box:extend(.test){}
</pre>

编译后的CSS：

<pre>
.test,
.box {
  background: pink;
}
</pre>

<br>

### 扩展语法

>扩展可以包含多个要扩展的选择器，选择器之间使用逗号分隔：

<pre>
.box:extend(.test1, .test2){}
</pre>

<br>

>允许有多个扩展：

<pre>
.box:extend(.test1):extend(.test2){}   //这种写法与把多个选择器写在一个扩展里面的效果一样
</pre>

<br>

>扩展可以附加给选择器，也可以放入规则集中。以下两种写法效果一样：

<pre>
.box:extend(.test){}
.box{&:extend(.test);}
</pre>

<br>

>选择器和扩展之间允许有空格:

<pre>
.box a:hover :extend(.test){};
</pre>

<br>

>扩展如果写在选择器之后，则必须在最后：

<pre>
.box1:hover:extend(.test).box2{}   //错误
.box1.box2:hover:extend(.test){}   //正确
</pre>

<br>

### extend的精确匹配

>Extend默认为精确匹配。它不管选择器是否等价，只有相同的形式才会匹配。唯一的例外是属性选择器中的引号，有无引号、单双引号都会当作是相同的形式而进行匹配。

<br>

>规则集中选择器的位置影响匹配。

LESS源码：

<pre>
.a.class,
.class.a,
.class>.a {
  color: blue;
}
.test:extend(.class) {} // 不会匹配上面的任何选择器的值
</pre>

<br>

>`*.class`和`.class`是等价的，但不会被匹配。<br>伪类顺序影响匹配，如`a:hover:visited`和`a:visited:hover`是等价的，但extend会区别对待它们。

LESS源码：

<pre>
a:hover:visited{
  color: red;
}
.test:extend(a:visited:hover){}    //a:hover:visited不会被匹配
</pre>

<br>

>nth表达式即使是等价的，也不会被匹配。

LESS源码：

<pre>
:nth-child(1n+3) {
  color: blue;
}
.box:extend(:nth-child(n+3)) {}  //1n+3与n+3是等价的，但不会被匹配
</pre>

<br>

>属性选择器中的引号，不论是单引号、双引号或者省去引号，都会被extend认为是相同的形式而进行匹配。

LESS源码：

<pre>
[title=identifier] {
  color: blue;
}
[title='identifier'] {
  color: blue;
}
[title="identifier"] {
  color: blue;
}

.noQuote:extend([title=identifier]) {}
.singleQuote:extend([title='identifier']) {}
.doubleQuote:extend([title="identifier"]) {}
</pre>

编译后的CSS：

<pre>
[title=identifier],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}

[title='identifier'],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}

[title="identifier"],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}
</pre>

<br>

### "all"关键字

>如果在extend参数后面指定all关键字，则为模糊匹配，将匹配所有相关选择器。

LESS源码：

<pre>
.a.box{
  color: blue;
}
.b.box{
  background: #f5f5f5;
}
.box.a{
  font-weight: bold;
}
.c .box{
  font-style: italic;
}
.box{
  font-size: 14px;
}
.box1:extend(.box all){}    //将扩展所有包含“.box”的选择器，并且扩展包含这些选择器上所有其他条件（例如父选择器、同级选择器）
.box2:extend(.box){}    //仅扩展“.box”选择器，并不会扩展“.a.box”等选择器
</pre>

编译后的CSS：

<pre>
.a.box,
.a.box1 {
  color: blue;
}
.b.box,
.b.box1 {
  background: #f5f5f5;
}
.box.a,
.box1.a {
  font-weight: bold;
}
.c .box,
.c .box1 {
  font-style: italic;
}
.box,
.box1,
.box2 {
  font-size: 14px;
}
</pre>

<br>

### 选择器插值

>extend不能匹配变量选择器。如果选择器包含变量，extend会忽略它。但是extend可以附加给插值选择器。

LESS源码：

<pre>
@variable: .bucket;
@{variable} { // 插值选择器
  color: blue;
}
.some-class:extend(.bucket) {} // 找不到匹配
</pre>

<pre>
.bucket {
  color: blue;
}
.some-class:extend(@{variable}) {} // 插值选择器什么也不匹配
@variable: .bucket;
</pre>

>然而, :extend 附加给插值选择器是能够工作的。

LESS源码：

<pre>
.bucket {
  color: blue;
}
@{variable}:extend(.bucket) {}
@variable: .selector;
</pre>

编译后的CSS：

<pre>
.bucket, .selector {
  color: blue;
}
</pre>

### 作用域/@media内的extend

>编写在media声明内的extend只匹配同一media声明内的选择器。

LESS源码：

<pre>
@media print {
  .screenClass:extend(.selector) {} // media内的extend
  .selector { // 这个会匹配到-因为在同一的media内
    color: black;
  }
}
.selector { // 定义样式表中的规则 - extend会忽略它
  color: red;
}
@media screen {
  .selector {  // 另一个media声明内的规则 - extend也会忽略它
    color: blue;
  }
}
</pre>

编译后的CSS：

<pre>
@media print {
  .selector,
  .screenClass {
    color: black;
  }
}
.selector {
  color: red;
}
@media screen {
  .selector {
    color: blue;
  }
}
</pre>

<br>

>编写在media声明内的extend不会匹配嵌套声明内的选择器：

LESS源码：

<pre>
@media screen {
  .screenClass:extend(.selector) {} // media内的extend
  @media (min-width: 1023px) {
    .selector {  // 嵌套media内的规则 - extend会忽略它
      color: blue;
    }
  }
}
</pre>

编译后的CSS：

<pre>
@media screen and (min-width: 1023px) {
  .selector { /* 其他嵌套media内的规则被忽略 */
    color: blue;
  }
}
</pre>

<br>

>顶级extend匹配一切，包括media嵌套内的选择器：

LESS源码：

<pre>
@media screen {
  .selector {  /* media嵌套内的规则 - 顶级extend正常工作 */
    color: blue;
  }
  @media (min-width: 1023px) {
    .selector {  /* media嵌套内的规则 - 顶级extend正常工作 */
      color: blue;
    }
  }
}

.topLevel:extend(.selector) {} /* 顶级extend匹配一切 */
</pre>

编译后的CSS：

<pre>
@media screen {
  .selector,
  .topLevel {
    /* media嵌套内的规则 - 顶级extend正常工作 */
    color: blue;
  }
}
@media screen and (min-width: 1023px) {
  .selector,
  .topLevel {
    /* media嵌套内的规则 - 顶级extend正常工作 */
    color: blue;
  }
}
/* 顶级extend匹配一切 */
</pre>

<br>

## <span id="jump_mi">混合（Mixins）</span>

### 混合概念

>混合是将一系列属性从一个选择器引入（“混合”）到另外一个选择器。

LESS源码：

<pre>
//定义样式选择器
.test() {
  font-size: 16px;
  color: red;
}

//使用已定义的样式选择器
.box p{
  .test;
}
</pre>

编译后的CSS：

<pre>
.box p {
  font-size: 16px;
  color: red;
}
</pre>

<br>

>以class或id的形式定义样式选择器均可。

LESS源码：

<pre>
#test() {
  font-size: 16px;
  color: red;
}
.box p{
  #test;
}
</pre>

编译后的CSS：

<pre>
.box p {
  font-size: 16px;
  color: red;
}
</pre>

<br>

### 混合参数

>定义样式选择器中圆括号()内可传入参数，叫做Parametric Mixins（混合参数），没有参数时可以省略括号。混合参数不限制数量，参数之间用英文逗号“,”或者分号“;”进行分隔。推荐使用分号进行分隔。

LESS源码：

<pre>
.test(@color; @space) {
  color: @color;
  border: 1px solid @color;
  margin-top: @space;
  padding-top: @space;
}
.box{
  h2{
    .test(#ccc; 15px);
  }
  p{
    .test(blue; 20px);
  }
}
</pre>

编译后的CSS：

<pre>
.box h2 {
  color: #ccc;
  border: 1px solid #ccc;
  margin-top: 15px;
  padding-top: 15px;
}
.box p {
  color: blue;
  border: 1px solid blue;
  margin-top: 20px;
  padding-top: 20px;
}
</pre>

<br>

>加括号的混合集不会输出到样式中。

LESS源码：

<pre>
#test() {
  font-size: 16px;
  color: red;
}
.test {
  font-size: 16px;
  color: red;
}
</pre>

编译后的CSS：

<pre>
.test {
  font-size: 16px;
  color: red;
}
</pre>

<br>

>Minxins的参数可以设定默认值。

LESS源码：

<pre>
.test(@color: #000; @space: 10px) {
  color: @color;
  border: 1px solid @color;
  margin-top: @space;
  padding-top: @space;
}
.box{
  h2{
    .test;
  }
  p{
    .test(blue, 20px);
  }
}
</pre>

编译后的CSS：

<pre>
.box h2 {
  color: #000;
  border: 1px solid #000;
  margin-top: 10px;
  padding-top: 10px;
}
.box p {
  color: blue;
  border: 1px solid blue;
  margin-top: 20px;
  padding-top: 20px;
}
</pre>

<br>

>使用同样的名字和同样数量的参数定义多个样式选择器是合法的。在被调用时，LESS会应用所有可以运用的混合。比如调用时只传了一个参数，那么所有只要求一个参数的混合都会被调用。

LESS源码：

<pre>
.test(@color) {
  color: @color;
}
.test(@color; @margin: 5px) {
  border: 1px solid @color;
  margin: @margin;
}
.test(@color; @padding; @margin: 5px) {
  border: 1px solid @color;
  padding: @padding;
  margin: @margin;
}
.box{
  .test(blue)
}
</pre>

编译后的CSS：

<pre>
//这是调用的第一个和第二个.test混合的结果，第三个因为需要两个参数，所以没被调用。
.box {
  color: blue;
  border: 1px solid blue;
  margin: 5px;
}
</pre>

<br>

>引用Minxins时，并不一定要以参数的位置来提供参数值，也可以通过参数名称来提供。

LESS源码：

<pre>

.test(@color: red; @padding: 5px; @margin: 10px) {
  color: @color;
  padding: @padding;
  margin: @margin;
}
.box{
  .test(@margin: 5px; @color: blue; @padding: 4px);
}
</pre>

编译后的CSS：

<pre>
.box {
  color: blue;
  padding: 4px;
  margin: 5px;
}
</pre>

<br>

### @arguments变量

>Mixins中有一个参数：@arguments，该参数表示所有参数。

LESS源码：

<pre>
.test1(@width: 1px; @style :solid; @color: #000) {
  border: @arguments;
}
.test2(@top: 1px; @right: 2px; @bottom: 3px; @left: 4px) {
  padding: @arguments;
}
.box{
  .test1(2px; dashed; pink);
  .test2(4px; 5px; 6px; 7px);
}
</pre>

编译后的CSS：

<pre>
.box {
  border: 2px dashed pink;
  padding: 4px 5px 6px 7px;
}
</pre>

<br>

### !important关键字

>使用!important关键字混合调用，将所有混合的属性标记为!important。

LESS源码：

<pre>
.test() {
  font-size: 16px;
  color: red;
}
.box{
  .test !important;
}
</pre>

编译后的CSS：

<pre>
.box {
  font-size: 16px !important;
  color: red !important;
}
</pre>

<br>

### 命名空间方法

>团队协作开发时，为避免选择器的重名问题，可采用命名空间的方法。

LESS源码：

<pre>
.namespace{
  .test(@color:red) {
    color: @color;
    border: 1px solid @color;
  }
}
.box{
  .namespace>.test;     //也可直接写成`.namespace.test`
}
</pre>

编译后的CSS：

<pre>
.box {
  color: red;
  border: 1px solid red;
}
</pre>

<br>

## <span id="jump_op">运算（Operations）</span>

>LESS可对任何数值型的value（数字、颜色、变量等）进行加减乘除四则运算。

LESS源码：

<pre>
@grey: #333333;
@grey2: @grey*2;
@height: 10%;
@width: 100px + 300;    //LESS会使用出现的单位，比如此处，最终输出400px
.box{
  color: @grey2;
  background: @grey + #111;
  height: 100%/2 + @height;
  width: @width;
}
/*
3位数的十六进制颜色是6位数的的简写，每个数代表两个相同的数，例如#111是#111111的简写、#abc是#aabbcc的简写。
简写的3位数运算是会自动转变成6位数来进行运算，比如上例的#333333+#111其实是#333333+#111111=#444444。
*/
</pre>

编译后的CSS：

<pre>
.box {
  color: #666666;
  background: #444444;
  height: 60%;
  width: 400px;
}
</pre>

<br>

## <span id="jump_fu">函数（Functions）</span>

>LESS提供了许多用于转换颜色、处理字符串和进行算术运算的函数。


<br>

>LESS有一组专门针对color操作的函数：

<pre>
lighten(@color, 10%); // return a color which is 10% *lighter* than @color 色相值
darken(@color, 10%); // return a color which is 10% *darker* than @color 
saturate(@color, 10%); // return a color 10% *more* saturated than @color  饱和度
desaturate(@color, 10%);// return a color 10% *less* saturated than @color 
fadein(@color, 10%); // return a color 10% *less* transparent than @color  透明度
fadeout(@color, 10%); // return a color 10% *more* transparent than @color 
spin(@color, 10); // return a color with a 10 degree larger in hue than @color  亮度
spin(@color, -10); // return a color with a 10 degree smaller hue than @color
</pre>

<br>

>使用这些函数类似Javascript中使用函数。


<br>

## <span id="jump_co">注释（Comments）</span>

>LESS的注释同css/js中的注释，有单行注释（//单行注释）和多行注释（/\*多行注释*/），但是LESS中的单行注释编译后不会出现在CSS中。

LESS源码：

<pre>
//这里是单行注释
.box{
  font-size: 14px;
  color: #000;
}
/*这里是多行注释*/
/*
这里是多行注释
*/
</pre>

编译后的CSS：

<pre>
.box {
  font-size: 14px;
  color: #000;
}
/*这里是多行注释*/
/*
这里是多行注释
*/
</pre>

<br>

# 参考资料

less中文文档  http://less.bootcss.com/features/

Less.js  http://www.lesscss.net/features/

<br>
<br>