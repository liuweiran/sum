# CSS reset for Mobile

```
html,body{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; -webkit-user-select:none; -webkit-overflow-scrolling:touch; overflow-scrolling:touch;}
body,div,ul,li,ol,h1,h2,h3,h4,h5,h6,input,textarea,select,p,dl,dt,dd,a,img,button,form,table,th,tr,td,tbody,article,aside,details,figcaption,figure,footer,header,hgroup, menu,nav,section{margin:0; padding:0;-webkit-tap-highlight-color:transparent; border-width:thin;}
table{border-collapse:collapse;	border-spacing:0;}
em,i{font-style:normal;}
strong{font-weight:normal;}
a{-webkit-touch-callout:none; text-decoration:none;}
a:hover{text-decoration:none;}
ul,ol{list-style:none;}
h1,h2,h3,h4,h5,h6{font-size:100%; font-weight:normal;}
fieldset,img{border:none;}
img{max-width:100%; height: auto; width:auto\9; -ms-interpolation-mode:bicubic;}
input,textarea,select, button{font-family:inherit; font-size:inherit; font-weight:inherit; outline:0; border:none; -webkit-appearance:none; background:none;}
input:focus::-webkit-input-placeholder,textarea:focus::-webkit-input-placeholder{opacity:0;}
:focus{outline:0; -webkit-tap-highlight-color:transparent;}
```


```
/* 禁用iPhone中Safari的字号自动调整 */
{
    -webkit-text-size-adjust: 100%; 
    -ms-text-size-adjust: 100%;
}

/*禁止用户选择*/
{
    -webkit-user-select: one;
}

/* 去除iPhone中默认的input样式 */
input{ 
    -webkit-appearance: none;
}
 
/* 取消链接高亮  */
{
    -webkit-tap-highlight-color: transparent;
}

/* 去掉获取焦点时placeholder的颜色 */
input:focus::-webkit-input-placeholder,
textarea:focus::-webkit-input-placeholder{
    opacity: 0;
}

/* 禁用系统默认菜单 */
a{
    -webkit-touch-callout: none; 
    text-decoration: none;
}

/* 图片自适应 */
img{
    max-width: 100%;
    height: auto;
    width:auto\9; /* ie8 */
    -ms-interpolation-mode:bicubic;/*为了照顾ie图片缩放失真*/
}

上下拉动滚动条时卡顿、慢
body{
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}

/* Retina屏的1px边框 */
{
    border-width: thin;
}
```