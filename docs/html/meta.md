# meta标签


+ 防止手机中网页放大和缩小 禁止缩放

```
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport" />
```
    
+ 设置Web应用是否以全屏模式运行（content的默认值是no）

```
<meta name="apple-mobile-web-app-capable" content="yes" />
``` 

+ 启动或禁用自动识别页面中的电话号码（content的默认值是yes）

```
<meta name="format-detection" content="telephone=no" />
``` 

+ 设置顶部状态栏背景色

>除非你先使用apple-mobile-web-app-capable指定全屏模式，否则这个meta标签不会起任何作用。
如果content设置为default，则状态栏正常显示。如果设置为blank，则状态栏会有一个黑色的背景。如果设置为blank-translucent，则状态栏显示为黑色半透明。如果设置为default或blank，则页面显示在状态栏的下方，即状态栏占据上方部分，页面占据下方部分，二者没有遮挡对方或被遮挡。如果设置为blank-translucent，则页面会充满屏幕，其中页面顶部会被状态栏遮盖住（会覆盖页面20px高度，而iphone4和itouch4的Retina屏幕为40px）。默认值是default。

```
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

+ 设置缓存

>手机页面通常在第一次加载后会进行缓存，然后每次刷新会使用缓存而不是去重新向服务器发送请求。如果不希望使用缓存可以设置no-cache。

```
<meta http-equiv="Cache-Control" content="no-cache" />
```