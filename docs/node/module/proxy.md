# http-proxy-middleware 跨域代理模块

## Install

```
$ npm install --save-dev http-proxy-middleware  //作为项目依赖安装
```

## Core Concept

```
var proxy = require('http-proxy-middleware');
//proxy([context,] config)
`context` 匹配对应请求的的URL地址, 匹配的请求将被代理到目标主机
`options.target` 目标主机地址(protocol + host)

var apiProxy = proxy({'/api', {target: 'http://www.example.ory'}});
// `apiProxy` 可作为一个服务器中间件
```

## Example

```
var express = require('express');
var proxy = require('http-proxy-middleware');

var context = '/object/api';//context 可以是一个数组['/object/api','/object2/api',...]
var options = {
    target: 'http://www.example.org',//目标服务器地址
    changeOrigin: true,             //虚拟主机网站需要
};

var app = express();
var apiProxy =  proxy(context, options);
app.use(apiProxy);


app.listen(3000);

// http://localhost:3000/object/api -> http://www.example.org
```