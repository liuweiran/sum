# CSS Reset for Mobile

```
html,body{
  font-family: "Helvetica Neue", "Helvetica", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Arial", sans-serif;;
  -webkit-text-size-adjust: 100%; 
  -ms-text-size-adjust: 100%; 
  -webkit-user-select: none; 
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
body, div, ul, li, ol, dl, dt, dd, h1, h2, h3, h4, h5, h6, form, fieldset, legend, input, textarea, select, button, p, a, img, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  margin: 0;
  padding: 0; 
  box-sizing: border-box;
  line-height: normal;
  -webkit-tap-highlight-color: transparent; 
  border-width: thin;
}
table {
  border-collapse: collapse; 
  border-spacing: 0;
}
em, i {
  font-style: normal;
}
strong {
  font-weight: normal;
}
a, a:hover { 
  -webkit-touch-callout: none; 
  text-decoration: none;
}
ul, ol {
  list-style: none;
}
h1 ,h2, h3, h4, h5, h6 {
  font-size: 100%; 
  font-weight: normal;
}
fieldset, img {
  border: none;
}
img {
  max-width: 100%; 
  height: auto; 
  width:auto\9; 
  -ms-interpolation-mode: bicubic;
}
input, textarea, select, button {
  font-family: inherit; 
  font-size: inherit; 
  font-weight: inherit; 
  outline: none; 
  border: none; 
  -webkit-appearance: none; 
  background: none;
}
textarea {
  resize: none;
}
input:focus::-webkit-input-placeholder,
textarea:focus::-webkit-input-placeholder {
  opacity: 0;
}
:focus {
  outline: none; 
  -webkit-tap-highlight-color: transparent;
}
```


```
/* 禁用文本框的拖拉 */
textarea{
    resize: none;
}

/* 禁用iPhone中Safari的字号自动调整 */
{
    -webkit-text-size-adjust: 100%; 
    -ms-text-size-adjust: 100%;
}

/* 禁用用户选择功能 */
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