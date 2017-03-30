# LESS简介

LESS是一门动态样式语言，属于CSS预处理语言的一种。LESS语法基于CSS（完全兼容CSS语法），且对其进行了扩充，为CSS赋予了动态语言的特性，它增加了诸如嵌套、变量、混合、运算、函数等功能以及父选择符`&`，让CSS更易编写和维护。

# LESS语法

+ [嵌套规则（Nested rules）](#jump_nr)
+ [父选择符&（Parent Selectors）](#jump_ps)
+ [变量（Variables）](#jump_va)
+ [扩展（Extend）](#jump_ex)
+ [混合（Mixins）](#jump_mi)
+ [运算（Operations）](#jump_op)
+ [函数（Functions）](#jump_fu)
+ [注释（Comments）](#jump_co)

## <span id="jump_nr">嵌套规则（Nested rules）</span>

>LESS中可使用选择器的嵌套来实现继承，类似HTML结构。

LESS源码：

```
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
```