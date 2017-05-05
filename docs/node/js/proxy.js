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