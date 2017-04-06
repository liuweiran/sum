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

<br>

## <span id="jump_va">变量（Variables）</span>

+ [变量的定义（Definition）](#jump_va_de)
+ [变量的作用域（Scope）](#jump_va_sc)
+ [变量插值（Interpolation）](#jump_va_in)

<br>

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

<br>

### <span id="jump_ex_co">扩展概念（Concept）</span>

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

<br>

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
+ [模式匹配（Pattern-matching）](#jump_mi_pat)
+ [作为函数使用的Mixins（Mixins as Functions）](#jump_mi_fu)
+ [传递规则集给Mixins（Passing Rulesets to Mixins）](#jump_mi_pas)
+ [条件混合（Mixin Guards）](#jump_mi_ga)
+ [循环结构（Loops）](#jump_mi_lo)
+ [合并属性（Merge）](#jump_mi_me)
+ [!important关键字（!important）](#jump_mi_im)
+ [命名空间方法（Namespace）](#jump_mi_na)

<br>

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

>定义样式选择器中圆括号()内可传入参数，叫做Parametric Mixins（混合参数），没有参数时可以省略括号。混合参数不限制数量，参数之间用英文逗号“,”或者分号“;”进行分隔，但是不可在一个mixin中同时使用逗号和分号来分隔。推荐使用分号进行分隔，一则更符合语法习惯，二则有少量css属性值（比如`font-family: Helvetica Neue, Microsoft YaHei;`）是用逗号分隔的，如此会产生歧义。

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

<br>

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

<br>

+ `@rest` 代表除去其位置之前的所有参数

    LESS源码：

    <pre>
    //此处 @rest 代表除去 @a 和 @b 的所有参数，@rest后面的"..."可以省略
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

### <span id="jump_mi_pat">模式匹配（Pattern-matching）</span>

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

### <span id="jump_mi_ga">条件混合（Mixin Guards）</span>

>与匹配值或者匹配参数数量的情况不同，Guards 被用来匹配表达式 (expressions)。为了尽可能地符合 CSS 的语言结构，LESS 选择使用 guard混合(guarded mixins)(类似于 @media 的工作方式)执行条件判断，而不是加入 if/else 声明。

+ 通过LESS自带的函数判断

    LESS源码：

    <pre>
    .mixin (@a) when (lightness(@a) >= 50%) {
      background-color: black;
    }
    .mixin (@a) when (lightness(@a) < 50%) {
      background-color: white;
    }
    .mixin (@a) {
      color: @a;
    }

    .class1 { .mixin(#ddd) }
    .class2 { .mixin(#555) }
    </pre>

    编译后的CSS：

    <pre>
    .class1 {
      background-color: black;
      color: #ddd;
    }
    .class2 {
      background-color: white;
      color: #555;
    }
    </pre>

<br>

+ 运算符判断

    guards中可用的比较运算符的完整列表为： `>`, `>=`, `=`, `=<`, `<`。此外，关键字`true`是让两个mixins等价的唯一真值。

    LESS源码：

    <pre>
    .test1 (@a) when (@a){
      display: block;
    }
    .test2 (@a) when (@a=true){
      color: #fff;
    }
    .test3 (@a) when (@a>10){
      font-size: @a;
    }
    @t: true;
    @size: 16px;
    .box{
      .test1(@t);
      .test2(@t);
      .test3(@size);
    }
    </pre>

    编译后的CSS：

    <pre>
    .box {
      display: block;
      color: #fff;
      font-size: 16px;
    }
    </pre>

<br>

+ 多个条件

    多个Guards如果通过逗号`,`分隔，则其中任意一个结果为 true都匹配成功，这个相当于脚本中"或"的意思；如果通过`and`分隔，则需要结果都为 true才匹配成功，相当于脚本中"且"。(PS: 参数可以是多个，也可以没有。)

    LESS源码：

    <pre>
    .test1 (@a; @b) when (@a), (@b < 0){
      color: red;
    }
    .test2 (@a; @b) when (@a=false), (@b > 0){
      z-index: @b;
    }
    .test3 (@a; @b) when (@a) , (@b > 10){
      margin: @b;
    }
    .test4 (@a; @b) when (@a) and (@b > 10){
      padding: @b;
    }
    .test5() when (@t){
      background: pink;
    }


    @t: true;
    @m: 0;
    .box{
      .test1(@t; @m);
      .test2(@t; @m);
      .test3(@t; @m);
      .test4(@t; @m);
      .test5();
    }
    </pre>

    编译后的CSS：

    <pre>
    .box {
      color: red;
      margin: 0;
      background: pink;
    }
    </pre>

<br>

+ guard中的`not`

    使用`not`关键字来否定条件。

    LESS源码：

    <pre>
    .test(@a) when not (@a<0) {
      background: blue;
    }

    .box{
      .test(10)
    }
    </pre>

    编译后的CSS：

    <pre>
    .box {
      background: blue;
    }
    </pre>

<br>

+ 类型检查函数

    如果需要基于值的类型来匹配mixins，可以使用`is`函数。
    
    有以下一些基本的类型检查函数：
    
    + `iscolor`
    + `isnumber`
    + `isstring`
    + `iskeyword`
    + `isurl`
    
    如果需要检查一个值除了数字是否是一个特定的单位，可以使用下列方法：
    
    + `ispixel`
    + `ispercentage`
    + `isem`
    + `isunit`

    LESS源码：

    <pre>
    .test(@a) when (isnumber(@a)){
      margin: @a;
    }

    .box{
      .test(15px);
    }
    </pre>

    编译后的CSS：

    <pre>
    .box {
      margin: 15px;
    }
    </pre>

<br>

+ <span id="jump_fnDedault">`default`函数</span>

    + `default`函数使用效果类似与`else`语句，当它的同名mixin不匹配时匹配。

        LESS源码：

        <pre>
        .test (@a) when (@a>0) {
          background: pink;
        }
        .test (@a) when (default()) {   //第一个mixin不匹配是则匹配它
          font-size: 12px;
        }

        .box1{
          .test(1);
        }
        .box2{
          .test(0);
        }
        </pre>

        编译后的CSS：

        <pre>
        .box1 {
          background: pink;
        }
        .box2 {
          font-size: 12px;
        }
        </pre>

    <br>

    + `default`函数可以与`not`关键字一起使用，例如`.mixin() when not(default()) {}`，当有至少一个除自身外的`mixin`满足条件时被匹配。

        LESS源码：

        <pre>
        .test(@a) when (ispixel(@a)) {
          width: @a;
        }
        .test(@a) when not(default()) {
          padding: @a/5;
        }

        .box1 {
          .test(100px); //两个mixins都被匹配
        }
        .box2 {
          .test(100%); //两个mixins都没有被匹配
        }
        </pre>

        编译后的CSS：

        <pre>
        .box1 {
          width: 100px;
          padding: 20px;
        }
        </pre>

    <br>

    + `default`函数可以与其他条件同时存在。

        LESS源码：

        <pre>
        .test(pink){
          background: pink;
        }
        .test(blue){
          background: blue;
        }
        .test(@a) when (iscolor(@a)) and (default()){
          color: @a;
        }

        .box1{
          .test(grey);
        }
        </pre>

        编译后的CSS：

        <pre>
        .box1 {
          color: grey;
        }
        </pre>


<br>

+ CSS Guards

    条件约束也可适用于CSS选择器。

    LESS源码：

    <pre>
    @a: true;
    @b: 1;

    .box1 when (@a){
      background: blue;
    }

    .box2 when (@b = 1) {
      background: pink;
    }
    .box3 when (@b < 0) {
      background: pink;
    }
    </pre>

    编译后的CSS：

    <pre>
    .box1 {
      background: blue;
    }
    .box2 {
      background: pink;
    }
    </pre>

<br>

### <span id="jump_mi_lo">循环结构（Loops）</span>

混合可以调用它自身。当一个混合递归调用自己，再结合Guard表达式和模式匹配这两个特性，就可以写出循环结构。

LESS源码：

<pre>
.score(@n, @i: 1) when (@i =< @n) {
  .score_@{i} {
    :nth-child(-n+@{i}){
      color: gold;
    }
  }
  .score(@n, (@i+1));
}

.score(5);
</pre>

编译后的CSS：

<pre>
.score_1 :nth-child(-n + 1) {
  color: gold;
}
.score_2 :nth-child(-n + 2) {
  color: gold;
}
.score_3 :nth-child(-n + 3) {
  color: gold;
}
.score_4 :nth-child(-n + 4) {
  color: gold;
}
.score_5 :nth-child(-n + 5) {
  color: gold;
}
</pre>

<br>

### <span id="jump_mi_me">合并属性（Merge）</span>

将多个属性值以逗号或者空格分割集合到一起。

+ 逗号分割

    LESS源码：

    <pre>
    .test(){
      font-family+: Helvetica Neue;
    }

    .box{
      .test;
      font-family+: Microsoft YaHei;
    }
    </pre>

    编译后的CSS：

    <pre>
    .box {
      font-family: Helvetica Neue, Microsoft YaHei;
    }
    </pre>

<br>

+ 空格分割

    LESS源码：

    <pre>
    .test(){
      transform+_: scale(2);
    }

    .box{
      .test;
      transform+_: rotate(15deg);
    }
    </pre>

    编译后的CSS：

    <pre>
    .box {
      transform: scale(2) rotate(15deg);
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

+ [杂项函数（Misc Functions）](#jump_fu_mi)
+ [字符串函数（String Functions）](#jump_fu_st)
+ [列表函数（List Functions）](#jump_fu_li)
+ [数学函数（Math Functions）](#jump_fu_ma)
+ [类型函数（Type Functions）](#jump_fu_ty)
+ [颜色定义函数（Color Definition Functions）](#jump_fu_co)
+ [颜色通道函数（Color Channel Functions）](#jump_fu_ch)
+ [颜色操作函数（Color Operation Functions）](#jump_fu_op)
+ [颜色混合函数（Color Blending Functions）](#jump_fu_bl)

<br>

### <span id="jump_fu_mi">杂项函数（Misc Functions）</span>

+ color
    
    解析颜色，将代表颜色的字符串转换为颜色值。
    
    语法：`color(string)`
    
    案例：

    `color(red)` 返回 `#ff0000`；

    `color("#fff")` 返回 `#fff`

<br>

+ convert

    将数字从一种单位转换到另一种单位。第一个参数为带单位的数值，第二个参数为单位。如果两个参数的单位是兼容的，则数字的单位被转换。如果两个参数的单位不兼容，则原样返回第一个参数。
    
    兼容的单位是：
    
    + 长度： `m`, `cm`, `mm`, `in`, `pt` , `pc`
    + 时间： `s` , `ms`
    + 角度： `rad`, `deg`, `grad` , `turn`
    
    语法：`convert(number, unit)`
    
    案例：`convert(1s, ms)` 返回 `1000ms`
    
<br>
                                  
+ data-uri
    
    将资源内联进样式表，如果开启了 ieCompat 选项并且资源太大，或者此函数的运行环境为浏览器，则会回退到直接使用 url() 。如果没有指定 MIME，则 node 将使用 mime 包来决定正确的 mime 类型。
    
    语法：`data-uri(mimetype, url)`
    
    参数：
        
    + `mimetype` ：(可选) MIME 字符串
    + `url` ：需要内嵌的文件的 URL
    
<br>

+ default
    
    使用于`Minxin Guards`中，当其他mixin不匹配时返回`true`，否则返回`false`。案例见 Minxin Guards 中的 [**default函数**](#jump_fnDedault)。

<br>

+ unit

    移除或者改变属性值的单位。

    语法：`unit(dimension, unit)`
    
    参数：
    
    + `dimension`：数字，带或不带单位
    + `unit`：(可选)将要替换成的单位，如果省略则移除原单位

    案例：
    
    `unit(1s, ms)` 返回 `1ms`
    
    `unit(5, px)` 返回 `5px`
    
    `unit(5em)` 返回 `5`

<br>

### <span id="jump_fu_st">字符串函数（String Functions）</span>

+ escape 转义函数

    对字符串中的特殊字符做 URL-encoding 编码。

    + 不转义编码的字符: `,`, `/`, `?`, `@`, `&`, `+`, `'`, `~`, `!` and `$`.

    + 最常见的转义编码字符: `\<space\>`, `#`, `^`, `(`, `)`, `{`, `}`, `|`, `:`, `>`, `<`, `;`, `]`, `[` and `=`.

    语法：`escape(string)` 返回不带引号的字符串

    案例：`escape('a=1')` 返回 `a%3D1`

    **PS：如果参数不是字符串的话，函数行为是不可预知的。目前传入颜色值的话会返回 `undefined` ，其它的值会原样返回。写代码时不应该依赖这个特性，而且这个特性在未来有可能改变。**

<br>

+ e 预判函数

    用于对 CSS 的转义，已经由 `~"value"` 语法代替。

    它接受一个字符串作为参数，并原样返回内容，不含引号。它可用于输出一些不合法的 CSS 语法，或者是使用 LESS 不能识别的属性。

    语法：`e(string)` 返回不带引号的转义字符串

    案例：`filter: e("ms:alwaysHasItsOwnSyntax.For.Stuff()");` 
    
    输出 `filter: ms:alwaysHasItsOwnSyntax.For.Stuff();`

    **PS：该函数也接受 ~"" 转义值和数字做参数，其他类型参数会返回一个错误。**

<br>

+ % 百分号格式化参数

    语法：`%(string, arguments ...)` 
    
    参数：
    
    + `string`：有占位符的格式化字符串
    + `arguments`：用于替换占位符的值
    
    第一个参数是一个包含占位符的字符串。占位符以百分号`%`开头，后面跟着字母 `s`、`S`、`d`、`D`、`a` 或 `A`。后续的参数用于替换这些占位符。如果你需要输出百分号，可以多用一个百分号来转义 `%%`。

    使用大写的占位符可以将特殊字符按照 `UTF-8` 编码进行转义。 此函数将会对所有的特殊字符进行转义，除了 `()'~!` 。空格会被转义为 `%20` 。小写的占位符将原样输出特殊字符，不进行转义。

    占位符说明：

    + `d`, `D`, `a`, `A` - 以被任意类型的参数替换 (颜色、数字、转义后的字符串、表达式等)。如果将它们和字符串一起使用，则整个字符串都会被使用，包括引号。然而，引号将会按原样放在字符串中，不会用 "/" 或类似的方式转义。

    + `s`, `S` - 可以被除了颜色的之外的任何类型参数替换。如果你将它们和字符串一起使用，则只有字符串的值会被使用，引号会被忽略。

    案例：`format-a-d: %("repetitions: %a file: %d", 1 + 2, "directory/file.less");` 
    
    输出： `format-a-d: "repetitions: 3 file: "directory/file.less"";`

<br>

+ replace 替换

    用一个字符串替换一段文本。

    语法：`replace(string, pattern, replacement, flags)` 
    
    参数：
    
    + `string`：用于搜索、替换操作的字符串
    + `pattern`：用于搜索匹配的字符串或正则表达式
    + `replacement`：用于替换匹配项的字符串
    + `flags`：(可选) 正则表达式匹配标识（全匹配还是...）

    案例：
    
    `replace("Hello, Mars?", "Mars\?", "Earth!");` 
    
    `replace("One + one = 4", "one", "2", "gi");`
    
    输出： 
    
    `"Hello, Earth!";` 
     
     `"2 + 2 = 4";`

<br>

### <span id="jump_fu_li">列表函数（List Functions）</span>

+ length 长度

    返回列表中元素的个数。

    语法：`length(list)` 【`list`：由逗号或空格分隔的元素列表。】

    案例：`length(1px solid #0080ff);` 返回 `3`

<br>

+ extract 提取

    返回列表中指定索引的值。

    语法：`extract(list, index)`

    案例：`extract(8px dotted red, 2);` 返回 `dotted`

<br>

### <span id="jump_fu_ma">数学函数（Math Functions）</span>

+ ceil 向上取整

    语法：`ceil(number)`

    案例：`ceil(1.1)` 返回 `2`

<br>

+ floor 向下取整

    语法：`floor(number)`

    案例：`floor(1.7)` 返回 `1`

<br>

+ percentage 将浮点数转换为百分比字符串

    语法：`percentage(number)`

    案例：`percentage(0.5)` 返回 `50%`

<br>

+ round 四舍五入取整

    语法：`round(number)`

    案例：`round(1.2)` 返回 `1`； `round(1.7)` 返回 `2`

<br>

+ sqrt 计算一个数的平方根，并原样保持单位

    语法：`sqrt(number)`

    案例：`sqrt(25px)` 返回 `5px`

<br>

+ abs 计算数字的绝对值，原样保持单位

    语法：`abs(number)`

    案例：`abs(-25px)` 返回 `25px`

<br>

+ sin 正弦函数

    处理时会将没有单位的数字认为是弧度值。

    语法：`sin(number)`

    案例：`sin(1deg)` 返回 `0.01745241`

<br>

+ asin 反正弦函数

    返回以弧度为单位的角度，区间在 `-π/2` 到 `π/2` 之间。

    语法：`asin(number)` 【`number`：区间在 `[-1, 1]` 之间的浮点数。】

<br>

+ cos 余弦函数

    处理时会将没有单位的数字认为是弧度值。

<br>

+ acos 反余弦函数

    返回以弧度为单位的角度，区间在 `0` 到 `π` 之间。

    语法：`acos(number)` 【`number`：区间在 `[-1, 1]` 之间的浮点数。】

<br>

+ tan 正切函数

    处理时会将没有单位的数字认为是弧度值。

<br>

+ atan 反正切函数

    返回以弧度为单位的角度，区间在 `-π/2` 到 `π/2` 之间。

<br>

+ pi

    返回圆周率 π (pi)。

    案例：`pi()` 返回 `3.14159265`

<br>

+ pow 乘方运算

    语法：`pow(A, B)` 返回`A`的`B`次方，返回值与A有相同单位，B的单位被忽略。

    案例：`pow(2px, 3)` 返回 `8px`

<br>

+ mod 取余运算

    语法：`mod(A, B)` 返回A对B取余的结果。返回值与A有相同单位，B的单位被忽略。这个函数也可以处理负数和浮点数。

    案例：`mod(9px, 4)` 返回 `1`

<br>

+ min 最小值运算

    返回所有传入参数中的最小值

    语法：`min(value1, value2, ..., valueN)`

    案例：`min(9px, 10px, 15px, 99px, 1px)` 返回 `1px`

<br>

+ max 最大值运算

    返回所有传入参数中的最大值

    语法：`max(value1, value2, ..., valueN)`

    案例：`max(9px, 10px, 15px, 99px, 1px)` 返回 `99px`

<br>

### <span id="jump_fu_ty">类型函数（Type Functions）</span>

+ isnumber

    如果待验证的值为数字则返回 `true` ，否则返回 `false`。

    语法：`isnumber(value)`

    案例：

        isnumber(#ff0);     // false
        isnumber(blue);     // false
        isnumber("string"); // false
        isnumber(1234);     // true
        isnumber(56px);     // true
        isnumber(7.8%);     // true
        isnumber(keyword);  // false
        isnumber(url(...)); // false

<br>

+ isstring

    如果待验证的值为字符串则返回 `true` ，否则返回 `false`。

    语法：`isstring(value)`

    案例：

        isstring(#ff0);     // false
        isstring(blue);     // false
        isstring("string"); // true
        isstring(1234);     // false
        isstring(56px);     // false
        isstring(7.8%);     // false
        isstring(keyword);  // false
        isstring(url(...)); // false

<br>

+ iscolor

    如果待验证的值为颜色则返回 `true` ，否则返回 `false`。

    语法：`iscolor(value)`

    案例：

        iscolor(#ff0);     // true
        iscolor(blue);     // true
        iscolor("string"); // false
        iscolor(1234);     // false
        iscolor(56px);     // false
        iscolor(7.8%);     // false
        iscolor(keyword);  // false
        iscolor(url(...)); // false

<br>

+ iskeyword

    如果待验证的值为关键字则返回 `true` ，否则返回 `false`。

    语法：`iskeyword(value)`

    案例：

        iskeyword(#ff0);     // false
        iskeyword(blue);     // false
        iskeyword("string"); // false
        iskeyword(1234);     // false
        iskeyword(56px);     // false
        iskeyword(7.8%);     // false
        iskeyword(keyword);  // true
        iskeyword(not);  // true
        iskeyword(url(...)); // false

<br>

+ isurl

    如果待验证的值为 url 则返回 `true` ，否则返回 `false`。

    语法：`isurl(value)`

    案例：

        isurl(#ff0);     // false
        isurl(blue);     // false
        isurl("string"); // false
        isurl(1234);     // false
        isurl(56px);     // false
        isurl(7.8%);     // false
        isurl(keyword);  // false
        isurl(url(...)); // true

<br>

+ ispixel

    如果待验证的值为 像素长度单位的数字 则返回 `true` ，否则返回 `false`。

    语法：`ispixel(value)`

    案例：

        ispixel(#ff0);     // false
        ispixel(blue);     // false
        ispixel("string"); // false
        ispixel(1234);     // false
        ispixel(56px);     // true
        ispixel(7.8%);     // false
        ispixel(keyword);  // false
        ispixel(url(...)); // false

<br>

+ isem

    如果待验证的值为 em长度单位的数字 则返回 `true` ，否则返回 `false`。

    语法：`isem(value)`

    案例：

        isem(#ff0);     // false
        isem(blue);     // false
        isem("string"); // false
        isem(1234);     // false
        isem(56px);     // false
        isem(7.8em);    // true
        isem(keyword);  // false
        isem(url(...)); // false

<br>

+ ispercentage

    如果待验证的值为 百分比 则返回 `true` ，否则返回 `false`。

    语法：`ispercentage(value)`

    案例：

        ispercentage(#ff0);     // false
        ispercentage(blue);     // false
        ispercentage("string"); // false
        ispercentage(1234);     // false
        ispercentage(56px);     // false
        ispercentage(7.8%);     // true
        ispercentage(keyword);  // false
        ispercentage(url(...)); // false

<br>

+ isunit

    如果待验证的值为 指定单位的数字 则返回 `true` ，否则返回 `false`。

    语法：`isunit(value, unit)`  `unit` 可带引号

    案例：

        isunit(11px, px);  // true
        isunit(2.2%, px);  // false
        isunit(33px, rem); // false
        isunit(4rem, rem); // true
        isunit(56px, "%"); // false
        isunit(7.8%, '%'); // true
        isunit(1234, em);  // false
        isunit(#ff0, pt);  // false
        isunit("mm", mm);  // false

<br>

### <span id="jump_fu_co">颜色定义函数（Color Definition Functions）</span>

+ rgb
    
    通过十进制红色、绿色、蓝色三种值 (RGB) 创建不透明的颜色对象。
    
    参数：
    
    + `red` : 0-255 的整数或 0-100% 的百分比数。
    + `green` : 0-255 的整数或 0-100% 的百分比数。
    + `blue` : 0-255 的整数或 0-100% 的百分比数。
    
    返回值： `color`
    
    案例： `rgb(90, 129, 32)`
    
    输出： `#5a8120`
    
<br>

+ rgba
    
    通过十进制红色、绿色、蓝色，以及 alpha 四种值 (RGBA) 创建带alpha透明的颜色对象。
    
    参数：
    
    + `red` : 0-255 的整数或 0-100% 的百分比数。
    + `green` : 0-255 的整数或 0-100% 的百分比数。
    + `blue` : 0-255 的整数或 0-100% 的百分比数。
    + `alpha` : 0-1 的整数或 0-100% 的百分比数。
    
    返回值： `color`
    
    案例： `rgba(90, 129, 32, 0.5)`
    
    输出： `rgba(90, 129, 32, 0.5)`
    
<br>

+ argb
    
    创建格式为 `#AARRGGBB` 的十六进制颜色值 (**注意不是 `#RRGGBBAA`！**)。
    
    这种格式被用于 IE 、.NET 和 Android 的开发中。
    
    参数： `color`, 颜色对象。
    
    返回值： `string`
    
    案例： `argb(rgba(90, 23, 148, 0.5))`
    
    输出： `#805a1794`
          
<br>

+ hsl
    
    通过色相 (hue)，饱和度 (saturation)，亮度 (lightness) 三种值 (HSL) 创建不透明的颜色对象。
    
    参数：
    
    + `hue` : 0-360 的整数，用于表示度数。
    + `saturation` : 0-100% 的百分比数或 0-1 的整数。
    + `lightness` : 0-100% 的百分比数或 0-1 的整数。
    
    返回值： `color`
    
    案例： `hsl(90, 100%, 50%)`
    
    输出： `#80ff00`
    
    可以基于一种颜色的通道来创建另一种颜色，例如： `@new: hsl(hue(@old), 45%, 90%);`
    
    `@new` 将拥有 `@old` 的 色相值(hue)，以及它自身的饱和度与亮度。
             
<br>

+ hsla
    
    通过色相 (hue)，饱和度 (saturation)，亮度 (lightness)，以及 alpha 四种值 (HSLA) 创建透明的颜色对象。
    
    参数：
    
    + `hue` : 0-360 的整数，用于表示度数。
    + `saturation` : 0-100% 的百分比数或 0-1 的整数。
    + `lightness` : 0-100% 的百分比数或 0-1 的整数。
    + `alpha` : 0-100% 的百分比数或 0-1 的整数。
    
    返回值： `color`
    
    案例： `hsl(90, 100%, 50%, 0.5)`
    
    输出： `rgba(128, 255, 0, 0.5)`
    
<br>

+ hsv

    通过色相 (hue)、饱和度 (saturation)、色调 (value) 三种值 (HSV) 创建不透明的颜色对象。
    
    参数：
    
    + `hue` : 0-360 的整数，用于表示度数。
    + `saturation` : 0-100% 的百分比数或 0-1 的整数。
    + `value` : 0-100% 的百分比数或 0-1 的整数。
    
    返回值： `color`
    
    案例： `hsv(90, 100%, 50%)`
    
    输出： `#408000`
    
<br>

+ hsva

    通过色相 (hue)，饱和度 (saturation)，色调 (value)，以及 alpha 四种值 (HSVA) 创建透明的颜色对象。
    
    参数：
    
    + `hue` : 0-360 的整数，用于表示度数。
    + `saturation` : 0-100% 的百分比数或 0-1 的整数。
    + `value` : 0-100% 的百分比数或 0-1 的整数。
    + `alpha` : 0-100% 的百分比数或 0-1 的整数。
    
    返回值： `color`
    
    案例： `hsva(90, 100%, 50%, 0.5)`
    
    输出： `rgba(64, 128, 0, 0.5)`
    
<br>

### <span id="jump_fu_ch">颜色通道函数（Color Channel Functions）</span>

+ hue
    
    从颜色对象的 HSL 颜色空间中提取色色调值。
    
    参数： `color` - 颜色对象。
    
    返回值： `整数（integer）`  `0-360`
    
    案例： `hue(hsl(90, 100%, 50%))`
    
    输出： `90`
    
<br>

+ saturation
    
    从颜色对象的 HSL 色彩空间中提取饱和度值。
    
    参数： `color` - 颜色对象。
    
    返回值： `百分比（percentage）`  `0-100`
    
    案例： `saturation(hsl(90, 100%, 50%))`
    
    输出： `100%`
    
<br>

+ lightness
    
    从颜色对象的 HSL 色彩空间中提取亮度值。
    
    参数： `color` - 颜色对象。
    
    返回值： `百分比（percentage）`  `0-100`
    
    案例： `lightness(hsl(90, 100%, 50%))`
    
    输出： `50%`
    
<br>

+ hsvhue
    
    在颜色对象的 HSV 色彩空间中提取色相值。
    
    参数： `color` - 颜色对象。
    
    返回值： `整数（integer）`  `0-360`
    
    案例： `hsvhue(hsv(90, 100%, 50%))`
    
    输出： `90`
    
<br>

+ hsvsaturation
    
    在颜色对象的 HSV 色彩空间提取饱和度值。
    
    参数： `color` - 颜色对象。
    
    返回值： `百分比（percentage）`  `0-100`
    
    案例： `hsvsaturation(hsv(90, 100%, 50%))`
    
    输出： `100%`
    
<br>

+ hsvvalue
    
    在颜色对象的 HSV 色彩空间提取色调值。
    
    参数： `color` - 颜色对象。
    
    返回值： `整数（integer）`  `0-360`
    
    案例： `hsvhue(hsv(90, 100%, 50%))`
    
    输出： `90`
    
<br>

+ red
    
    从颜色对象中提取红色通道值。
    
    参数： `color` - 颜色对象。
    
    返回值： `整数（integer）`  `0-255`
    
    案例： `red(rgb(10, 20, 30))`
    
    输出： `10`
    
<br>

+ green
    
    从颜色对象中提取绿色通道值。
    
    参数： `color` - 颜色对象。
    
    返回值： `整数（integer）`  `0-255`
    
    案例： `green(rgb(10, 20, 30))`
    
    输出： `20`
    
<br>

+ blue
    
    从颜色对象中提取蓝色通道值。
    
    参数： `color` - 颜色对象。
    
    返回值： `整数（integer）`  `0-255`
    
    案例： `blue(rgb(10, 20, 30))`
    
    输出： `30`
    
<br>

+ alpha
    
    从颜色对象中提取 alpha 通道值。
    
    参数： `color` - 颜色对象。
    
    返回值： `浮点数（float）`  `0-1`
    
    案例： `alpha(rgba(10, 20, 30, 0.5))`
    
    输出： `0.5`
    
<br>

+ luma
    
    计算颜色对象的 luma (perceptual brightness) 值（亮度的百分比表示法）。
    
    参数： `color` - 颜色对象。
    
    返回值： `百分比（percentage）` `0-100%`
    
    案例： `luma(rgb(100, 200, 30))`
    
    输出： `44%`
    
<br>

### <span id="jump_fu_op">颜色操作函数（Color Operation Functions）</span>
    
>颜色值运算有几点注意事项：
>         
> + 参数必须单位/格式相同；
> + 百分比将作为绝对值处理，比如 10% 增加 10%，结果是 20% 而不是 11%；
> + 参数值只能在限定的范围内；
> + 返回值时，除了十六进制的颜色值 (hex versions) 外将对其他格式做简化处理。

<br>

+ saturate
    
    增加一定数值的颜色饱和度。
    
    参数：
    
    + `color` : 颜色对象
    + `amount` : 百分比 0-100%
    
    返回值： `color`
    
    例如： `saturate(hsl(90, 80%, 50%), 20%)`
    
    输出： `#80ff00 // hsl(90, 100%, 50%)`

<br>

+ desaturate
    
    降低一定数值的颜色饱和度。
    
    参数：
    
    + `color` : 颜色对象
    + `amount` : 百分比 0-100%
    
    返回值： `color`
    
    例如： `saturate(hsl(90, 80%, 50%), 20%)`
    
    输出： `#80cc33 // hsl(90, 60%, 50%)`

<br>

+ lighten
    
    增加一定数值的颜色亮度。
    
    参数：
    
    + `color` : 颜色对象
    + `amount` : 百分比 0-100%
    
    返回值： `color`
    
    例如： `lighten(hsl(90, 80%, 50%), 20%)`
    
    输出： `#b3f075 // hsl(90, 80%, 70%)`

<br>

+ darken
    
    降低一定数值的颜色亮度。
    
    参数：
    
    + `color` : 颜色对象
    + `amount` : 百分比 0-100%
    
    返回值： `color`
    
    例如： `darken(hsl(90, 80%, 50%), 20%)`
    
    输出： `#4d8a0f // hsl(90, 80%, 30%)`

<br>

+ fadein
    
    降低颜色的透明度，令其更不透明。对不透明的颜色无效。
    
    参数：
    
    + `color` : 颜色对象
    + `amount` : 百分比 0-100%
    
    返回值： `color`
    
    例如： `fadein(hsla(90, 90%, 50%, 0.5), 10%)`
    
    输出： `rgba(128, 242, 13, 0.6) // hsla(90, 90%, 50%, 0.6)`

<br>

+ fadeout
    
    增加颜色的透明度，令其更透明。对不透明的颜色无效。
    
    参数：
    
    + `color` : 颜色对象
    + `amount` : 百分比 0-100%
    
    返回值： `color`
    
    例如： `fadeout(hsla(90, 90%, 50%, 0.5), 10%)`
    
    输出： `rgba(128, 242, 13, 0.4) // hsla(90, 90%, 50%, 0.6)`

<br>

+ fade
    
    给颜色（包括不透明的颜色）设定一定数值的透明度。
    
    参数：
    
    + `color` : 颜色对象
    + `amount` : 百分比 0-100%
    
    返回值： `color`
    
    例如： `fade(hsl(90, 90%, 50%), 10%)`
    
    输出： `rgba(128, 242, 13, 0.1) //hsla(90, 90%, 50%, 0.1)`

<br>

+ spin
    
    任意方向旋转颜色的色相角度 (hue angle)。
    
    旋转范围 0-360，超过一周后将从起点开始继续旋转（+-控制方向），比如旋转360度与720度是相同的结果。需要注意的是，颜色值会通过RGB格式转换，这个过程不能保留灰色的色相值（灰色没有饱和度，色相值也就没有意义了），因此要确定使用函数的方法能够保留颜色的色相值，例如不要这样使用函数：
    
    `@c: saturate(spin(#aaaaaa, 10), 10%);`
    
    而应该用这种方法代替：
    
    `@c: spin(saturate(#aaaaaa, 10%), 10);`
    
    因为颜色值永远输出为 RGB 格式，因此 spin() 函数对灰色无效。
    
    参数：
    
    + `color` : 颜色对象
    + `angle` : 任意数字表示角度 （+ 或 – 表示方向）
    
    返回值： `color`
    
    例如：
    
    <pre>
    spin(hsl(10, 90%, 50%), 30)
    spin(hsl(10, 90%, 50%), -30)
    </pre>
    
    输出：
    
    <pre>
    #f2a60d // hsl(40, 90%, 50%)
    #f20d59 // hsl(340, 90%, 50%)
    </pre>

<br>

+ mix
    
    根据比例混合两种颜色，包括计算不透明度。
    
    参数：
        
    + `color1` : 颜色对象
    + `color2` : 颜色对象
    + `weight` : (可选) 平衡两种颜色的百分比, 默认 50%

    返回值： `color`
    
    例如：
    
    <pre>
    mix(#ff0000, #0000ff, 50%)
    mix(rgba(100,0,0,1.0), rgba(0,100,0,0.5), 50%)
    </pre>
    
    输出：
    
    <pre>
    #800080
    rgba(75, 25, 0, 0.75)
    </pre>

<br>

+ greyscale
    
    完全移除颜色的饱和度，与 desaturate(@color, 100%) 函数效果相同。
    
    因为颜色的饱和度不受色相值影响，所以输出的颜色会稍显暗淡 (dull or muddy)；如果使用 `luma` 值可能会有更好的结果，因为它提取的是百分比亮度，而不是线性亮度。比如 `greyscale('#0000ff')` 与 `greyscale('#00ff00')` 会得出相同的结果，尽管对人眼来说，它们的亮度是不一样的。
    
    参数：`color` : 颜色对象
    
    返回值： `color`
    
    例如： `greyscale(hsl(90, 90%, 50%))`
    
    输出： `#808080 // hsl(90, 0%, 50%)`

<br>

+ contrast
    
    选择两种颜色相比较，得出哪种颜色的对比度最大就倾向于对比度最大的颜色。
    
    这个函数对比 @background 的 luma 值与 @threshold 参数的大小，如果大于输出 @darkcolor, 小于则输出 @lightcolor，便于选择相对于背景更容易阅读的颜色，同时提高了使用颜色的灵活性，与 Compass 的 contrast() 函数 工作方式相同。根据 WCAG 2.0 应该对比颜色的 luma 值，而不是亮度值 (lightness)。
    
    `light` 和 `dark` 两个参数可以调换顺序。因为 `contrast()` 函数会自动计算它们的luma值和自动分配 `light` 和 `dark`，这样你就不用通过颠倒两个参数的顺序才能选到最小对比度颜色(the least contrasting color)。
    
    参数：
    
    + `color`: 需要对比的颜色对象 (A color object to compare against.)
    + `dark`: 可选项 – 指定的黑色（默认 black）
    + `light`: 可选项 – 指定的白色（默认 white）
    + `threshold`: 可选项 – 百分比 0-100% 界定深色过渡到浅色的转变位置（默认 43%），这个数值决定了输出结果偏向于哪一方，比如判断 50% 的灰色背景应该显示白色还是黑色的文字。一般来说，如果本色方案偏浅，则应该设低一点，否则设高一点。
    
    返回值： `color`
    
    例如：
    
    <pre>
    contrast(#aaaaaa)
    contrast(#222222, #101010)
    contrast(#222222, #101010, #dddddd)
    contrast(hsl(90, 100%, 50%), #000000, #ffffff, 40%);
    contrast(hsl(90, 100%, 50%), #000000, #ffffff, 60%);
    </pre>
    
    输出：
    
    <pre>
    #000000 // 黑色
    #ffffff // 白色
    #dddddd
    #000000 // 黑色
    #ffffff // 白色
    </pre>

<br>

### <span id="jump_fu_bl">颜色混合函数（Color Blending Functions）</span>

这些操作和图片编辑器（例如 Photoshop、Fireworks 或 GIMP）中的混合模式很类似（虽然不是完全一致），因此，你可以通过这些函数让 CSS 中的颜色与图片中的颜色相匹配。

语法：`fn(color1, color2)`

+ multiply
    
    分别将两种颜色的红绿蓝 (RGB) 三种值做乘法运算，然后再除以 255，输出结果是更深的颜色。（译注：对应Photoshop中的“变暗/正片叠底”。）

<br>
    
+ screen
    
    与 `multiply` 函数效果相反，输出结果是更亮的颜色。（译注：对应Photoshop中的“变亮/滤色”。）

<br>
    
+ overlay
    
    结合 `multiply` 与 `screen` 两个函数的效果，令浅的颜色变得更浅，深的颜色变得更深。（译注：对应 Photoshop 中的“叠加”。）注意：输出结果由第一个颜色参数决定。

    参数：
         
     + `color1` : 基准颜色对象。也就是用以确定最终结果是浅些还是深些的参考色。
     + `color2` : 颜色对象。

<br>
   
+ softlight
    
    与 `overlay` 函数效果相似，只是当纯黑色或纯白色作为参数时输出结果不会是纯黑色或纯白色。（译注：对应Photoshop中的“柔光”。）
 
    参数：
         
     + `color1` : 混合色（光源）。
     + `color2` : 被混合的颜色。

<br>
   
+ hardlight
    
    与 `overlay` 函数效果相似，不过由第二个颜色参数决定输出颜色的亮度或黑度，而不是第一个颜色参数决定。（译注：对应Photoshop中的“强光/亮光/线性光/点光”。）
 
    参数：
        
    + `color1` : 混合色（光源）。
    + `color2` : 基准色对象。它决定最终结果是亮些还是暗些。

<br>

+ difference
    
    从第一个颜色值中减去第二个（分别计算 RGB 三种颜色通道），输出结果是更深的颜色。如果结果为负值则被反转。如果减去的颜色是黑色则不做改变；减去白色将得到颜色反转。（译注：对应Photoshop中的“差值/排除”。）
    
    参数：
        
    + `color1` : 被减的颜色对象。
    + `color2` : 减去的颜色对象。   

<br>
    
+ exclusion
    
    效果与 `difference` 函数效果相似，只是输出结果对比度更小 (lower contrast)。（译注：对应Photoshop中的“差值/排除”。）
    
    参数：
        
    + `color1` : 被减的颜色对象。
    + `color2` : 减去的颜色对象。

<br>

+ average
    
    分别对 RGB 的三种颜色值取平均值，然后输出结果。

<br>
    
+ negation
    
    与 `difference` 函数效果相反。
    
    输出结果是更亮的颜色。注意：效果 相反 不代表做加法运算。
    
    参数：
    
    + `color1` : 被减的颜色对象。
    + `color2` : 减去的颜色对象。
    
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

语法：`@import (keyword) "filename";` 

多个关键字是允许的，使用逗号`,`分隔关键字：`@import (keyword1, keyword2) "filename";`

+ `reference`：使用Less文件但不输出
+ `inline`：在输出中包含源文件但不加工它
+ `less`：将文件作为LESS文件对象，无论是什么文件扩展名
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

**新版本的less应该是支持css hack的（本人只简略测试了截至目前最新版version 2.7.2和部分hack）。--2017.04**

<br>

#### less

>使用`@import (less)`会将导入的文件作为Less文件对象，不管文件扩展名是什么。--发布于 v1.4.0

导入的文件中的样式会直接输出到编译后的CSS中。

<br>

#### css

>使用`@import (css)`会将导入的文件作为普通的CSS文件对象，也不会管扩展名是什么。--发布于 v1.4.0

这意味着import语句会保留在编译后的CSS中。比如 `@import（css) 'a.less'`会被编译成 `@import 'a.less'`。

<br>

#### once

>`@import`语句的默认行为。这意味着文件只会被导入一次，而随后导入的同名文件的语句都会被忽略。--发布于 v1.4.0

<br>

#### multiple

>使用`@import (multiple)`允许导入多个同名文件。这与只能导入一次的行为是对立的。--发布于 v1.4.0

如此，编译后的css样式会重复。

比如有一个`a.less`文件，文件内容如下：

<pre>
.a{
  background: pink;
}
.b{
  background: blue;
}
</pre>

在`b.less`中引入`a.less`：

<pre>
@import (multiple) 'a.less';
@import (multiple) 'a.less';
</pre>

编译后的css内容为：

<pre>
.a {
  background: pink;
}
.b {
  background: blue;
}
.a {
  background: pink;
}
.b {
  background: blue;
}
</pre>

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