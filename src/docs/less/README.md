<br>

# LESS简介

LESS是一门动态样式语言，属于CSS预处理语言的一种。LESS支持绝大部分CSS语法，且对其进行了扩充，为CSS赋予了动态语言的特性，它增加了诸如嵌套、变量、混合、运算、函数等功能以及父选择符`&`，让CSS更易编写和维护。

<br>

# LESS语法

+ [嵌套规则（Nested rules）](#jump_nr)
+ [父选择符&（Parent Selectors）](#jump_ps)
+ [变量（Variables）](#jump_va)
+ [扩展（Extend）](#jump_ex)
+ [混合（Mixins）](#jump_mi)
+ [运算（Operations）](#jump_op)
+ [函数（Functions）](#jump_fu)
+ [导入样式（Import Directives）](#jump_im)
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

>`&`可用于生成重复的类名。

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

>`&`可以在一个选择器中多次出现。

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

>`&`如果放到当前选择器后面，则会改变选择器的顺序。可以利用此点给父选择器前置插入一个选择器。

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

>`&`的组合使用可以用于生成所有可能的选择器排列。

LESS源码：

<pre>
p, a, div {
  border-top: 2px dotted #366;
  & + & {
    border-top: 0;
  }
}
</pre>

编译后的CSS：

<pre>
p,
a,
div {
  border-top: 2px dotted #366;
}
p + p,
p + a,
p + div,
a + p,
a + a,
a + div,
div + p,
div + a,
div + div {
  border-top: 0;
}
</pre>

## <span id="jump_va">变量（Variables）</span>

+ [变量的定义（Definition）](#jump_va_de)
+ [变量的作用域（Scope）](#jump_va_sc)
+ [变量插值（Interpolation）](#jump_va_in)

### <span id="jump_va_de">变量的定义（Definition）</span>

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

### <span id="jump_va_sc">变量的作用域（Scope）</span>

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

### <span id="jump_va_in">变量插值（Interpolation）</span>

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

+ [扩展概念（Concept）](#jump_ex_co)
+ [扩展语法（Grammar）](#jump_ex_gr)
+ [extend的精确匹配（Exact matching）](#jump_ex_ex)
+ ["all"关键字（"all"）](#jump_ex_al)
+ [选择器插值（Interpolation）](#jump_ex_in)
+ [作用域/@media内的extend（Scope）](#jump_ex_sc)

### <span id="jump_ex_co">扩展概念扩展概念（Concept）</span>

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

### <span id="jump_ex_gr">扩展语法（Grammar）</span>

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

### <span id="jump_ex_ex">extend的精确匹配（Exact matching）</span>

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

>需要注意的是，在一个规则集中，如果存在多个并列选择器，extend是可以匹配到的，而且不会去重。

LESS源码：

<pre>
.a,
.b {
  font-size: 15px;
}

.c:extend(.a, .b) {
  color: blue;
}
//.c会分别匹配一次.a和.b，所以最后编译出来的结果会有两个.c
</pre>

编译后的CSS：

<pre>
.a,
.b,
.c,
.c {
  font-size: 15px;
}
.c {
  color: blue;
}
</pre>

### <span id="jump_ex_al">"all"关键字（"all"）</span>

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

### <span id="jump_ex_in">选择器插值（Interpolation）</span>

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

<br>

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

<br>

### <span id="jump_ex_sc">作用域/@media内的extend（Scope）</span>

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

+ [混合概念（Concept）](#jump_mi_co)
+ [混合参数（Params）](#jump_mi_pa)
+ [@arguments变量（@arguments）](#jump_mi_ar)
+ [高级参数和@rest变量（Advanced arguments and @rest）](#jump_mi_ad)
+ [模式匹配（Pattern-matching）](#jump_mi_pa)
+ [作为函数使用的Mixins（Mixins as Functions）](#jump_mi_fu)
+ [传递规则集给Mixins（Passing Rulesets to Mixins）](#jump_mi_pas)
+ [!important关键字（!important）](#jump_mi_im)
+ [命名空间方法（Namespace）](#jump_mi_na)

### <span id="jump_mi_co">混合概念（Concept）</span>

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

### <span id="jump_mi_pa">混合参数（Params）</span>

>定义样式选择器中圆括号()内可传入参数，叫做Parametric Mixins（混合参数），没有参数时可以省略括号。混合参数不限制数量，参数之间用英文逗号“,”或者分号“;”进行分隔。推荐使用分号进行分隔，更符合语法习惯。

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

### <span id="jump_mi_ar">@arguments变量（@arguments）</span>

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

### <span id="jump_mi_ad">高级参数和@rest变量（Advanced arguments and @rest）</span>

>如果需要在 mixin 中不限制参数的数量，可以在变量名后添加`...`，表示这里可以使用 N 个参数。

+ 接受 0-N 个参数

LESS源码：

<pre>
.test(...){
  padding: @arguments;
}
.box1{
  .test(20px);
}
.box2{
  .test(10px 20px);
}
.box3{
  .test(10px 20px 30px);
}
</pre>

编译后的CSS：

<pre>
.box1 {
  padding: 20px;
}
.box2 {
  padding: 10px 20px;
}
.box3 {
  padding: 10px 20px 30px;
}
</pre>

+ 接受 1-N 个参数

LESS源码：

<pre>
.test(@top; ...){
  padding: @arguments;
}

.box1{
  .test(5px);
}
.box2{
  .test(10px 20px);
}
</pre>

编译后的CSS：

<pre>
.box1 {
  padding: 5px;
}
.box2 {
  padding: 10px 20px;
}
</pre>

+ `@rest`代表除去其位置之前的所有参数

LESS源码：

<pre>
//此处 @rest 代表除去 @a 和 @b 的所有参数，@rest后面的`...`可以省略
.test(@a; @b; @rest...){
  font-size: @a;
  color: @b;
  padding: @rest;
}
.box{
  .test(15px; red; 20px 30px);
}
</pre>

编译后的CSS：

<pre>
.box {
  font-size: 15px;
  color: red;
  padding: 20px 30px;
}
</pre>

<br>

### <span id="jump_mi_pa">模式匹配（Pattern-matching）</span>

>基于传递给mixin的参数来控制它的行为。

+ 依据`@sitch`值进行匹配

LESS源码：

<pre>
.test(dark; @color; @size){
  color: darken(@color, 10%);
  font-size: @size;
  background: pink;
}
.test(light; @color; @size){
  color: lighten(@color, 10%);
  font-size: @size;
  background: blue;
}

@switch: light; //将匹配第二个mixin
.box{
  .test(@switch; #333; 15px)
}
</pre>

编译后的CSS：

<pre>
.box {
  color: #4d4d4d;
  font-size: 15px;
  background: blue;
}
</pre>

<br>

+ 直接使用非变量形式的值进行匹配

LESS源码：

<pre>
.test(dark; @color; @size){
  color: darken(@color, 10%);
  font-size: @size;
  background: pink;
}
.test(light; @color; @size){
  color: lighten(@color, 10%);
  font-size: @size;
  background: blue;
}

.box{
  .test(dark; #333; 15px)
}
</pre>

编译后的CSS：

<pre>
.box {
    color: #1a1a1a;
    font-size: 15px;
    background: pink;
}
</pre>

<br>

+ 依据参数数量进行匹配

LESS源码：

<pre>
.test(@a){
  color: @a;
}
.test(@a; @b){
  color: lighten(@a, @b);
}

.box1{
  .test(#000);  //一个参数，匹配第一个mixin
}
.box2{
  .test(#000; 10%); //两个参数，匹配第二个mixin
}
</pre>

编译后的CSS：

<pre>
.box1 {
  color: #000;
}
.box2 {
  color: #1a1a1a;
}
</pre>

<br>

### <span id="jump_mi_fu">作为函数使用的Mixin（Mixins as Functions）</span>

>定义在mixin中的变量都是可见的，其可以作用于调用它的作用域中。

LESS源码：

<pre>
.test(){
  @w: 1000px;
  @h: 500px
}

.box{
  .test;
  width: @w;
  height: @h;
}
</pre>

编译后的CSS：

<pre>
.box {
  width: 1000px;
  height: 500px;
}
</pre>

<br>

>定义在mixin中的变量可以充当它的返回值，基于此，可以创建一个类似函数的mixin。

LESS源码：

<pre>
.average(@x, @y){
  @average: ((@x + @y) / 2);
}

.box{
  .average(20px, 50px); // 调用mixin
  padding: @average;    // 使用mixin的返回的值
}
</pre>

编译后的CSS：

<pre>
.box {
  padding: 35px;
}
</pre>

<br>

### <span id="jump_mi_pas">传递规则集给Mixins（Passing Rulesets to Mixins）</span>

>如果需要把某个媒体查询或者某些类抽离出来，可以把规则集传递给mixin, mixin会包装这些规则集。

LESS源码：

<pre>
.test(@rules){
  @media screen and (min-width: 1200px) { @rules(); }
  .a { @rules(); }
  .b & { @rules(); }
}

.box{
  background: grey;
  .test({
    background: pink;
  })
}
</pre>

编译后的CSS：

<pre>
.box {
  background: grey;
}
@media screen and (min-width: 1200px) {
  .box {
    background: pink;
  }
}
.box .a {
  background: pink;
}
.b .box {
  background: pink;
}
</pre>

<br>

>也可以先定义规则集的内容，而后直接使用。

LESS源码：

<pre>
@myRule: {
  .a{
    @media (min-width: 1200px) {
      background: pink;
    }
  }
};

@media (max-width: 1800px) {
  @myRule();
}
.box{
  @myRule();
}
</pre>

编译后的CSS：

<pre>
@media (max-width: 1800px) and (min-width: 1200px) {
  .a {
    background: pink;
  }
}
@media (min-width: 1200px) {
  .box .a {
    background: pink;
  }
}
</pre>

<br>

### <span id="jump_mi_im">!important关键字（!important）</span>

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

### <span id="jump_mi_na">命名空间方法（Namespace）</span>

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

## <span id="jump_im">导入样式（Import Directives）</span>

### 基本规则（Basic Rules）

+ 在标准的css中，`@import`必须在所有其他规则之前，但是在less中，`@import`语句可以放在任何位置。
+ `@import`语句对不同文件扩展名的解析：
    + `.css`扩展名，作为css对象导入。
    + 其他扩展名，作为less对象导入。
    + 没有扩展名或者`.less`扩展名，作为less对象导入。
    
<br>

### 导入选项 (Import Options)

>LESS提供一系列CSS扩展以便更灵活的使用`@import`导入第三方css文件。

**语法：`@import (keyword) "filename";`**
+ `reference`：使用Less文件但不输出
+ `inline`：在输出中包含源文件但不加工它
+ `less`：将文件作为Less文件对象，无论是什么文件扩展名
+ `css`：将文件作为CSS文件对象，无论是什么文件扩展名
+ `once`：只包含文件一次（默认行为）
+ `multiple`：包含文件多次

<br>

#### reference

>使用`@import (reference)`导入外部文件，但是不添加导入的样式到编译输出中，只引用。--发布于 v1.5.0

比如有一个`a.less`文件，文件内容如下：

<pre>
@red: #ff0000;

.test1{
  background: pink;
}
.test2{
  background: blue;
}
</pre>

在`b.less`文件中，引入`a.less`:

<pre>
@import (reference) 'a';

.box{
  &:extend(.test1);
}
</pre>

`b.less`文件最后只会编译引用到的部分，编译后的css内容如下：

<pre>
.box {
  background: pink;
}
</pre>

<br>

#### inline

>使用`@import (inline)`导入外部文件，但是不加工它。--发布于 v1.5.0

当一个css文件可能不兼容less的时候使用，早期less支持绝大多数熟知的标准的css，但是不支持css hack。

**新版本的less应该是支持css hack的（本人只简略测试了version 2.7.2和部分hack）。**

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