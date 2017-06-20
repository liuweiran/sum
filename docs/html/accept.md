# 解决accept属性反应滞慢

```
<input type="file" accept="image/*" />
```

这段代码在Chrome和Safari等Webkit浏览器下会出现响应滞慢的问题，可能要等几秒才能弹出文件选择对话框。
于是几经尝试后，发现是 accept=”image/*” 属性的问题，删掉它或者将 * 通配符修改为指定的MIME类型，就可以解决Webkit浏览器下的对话框显示滞慢的问题。

解决办法如下：
```
<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" />
```
