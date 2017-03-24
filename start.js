const express = require('express'),
      app = express(),
      ejs = require('ejs'),
      fs = require('fs'),
      path = require('path');

const default_port = 8801;

//结束浏览器对favicon.ico的请求
app.use('favicon.ico', function (req, res) {
    res.end();
});

//app.use([path], function(req,res))
//response.end([data], [encoding]) data是end()执行完毕后要输出的字符
//Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。
//req.params 获取路由的parameters 例如得到{'0': '01.html'}

//path.resolve([from ...], to) 将参数 to 位置的字符解析到一个绝对路径里。
//ejs.render(str, data, options); 第一个参数是模板的字符串,第二个参数是数据


app.use(/\/src\/(.+\.html)$/, function (req, res) {     //子表达式可以获取供以后使用---加括号的匹配内容会在req.params中取到
    const filename = path.resolve(__dirname, 'src/htm', req.params[0]),
          content = fs.readFileSync(filename, 'utf8');
    res.end(ejs.render(content, {}, {filename}));       //ejs.render 第二个参数应该是传一些配置参数，第三个参数是传入模板路径，解决子模板引用时候的路径问题
});

//express.static(root, [options])
//通过 Express 内置的 express.static 可以方便地托管静态文件
app.use('/src', express.static('./src/', { redirect:false }));      //{redirect:false} 防止没有后缀名又没以斜杠结尾的时候自动追加斜杠的问题

//如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现
//通过'/'来访问 './dist/'
app.use('/', express.static('./dist/', { redirect:false }));

app.use('*', require('./index'));

//process模块 不必使用require命令加载。它是一个EventEmitter对象的实例。  process.argv 当前进程的命令行参数数组
const index = process.argv.indexOf('--port'),
      port = index > -1 ? (process.argv[index + 1] || default_port) : default_port;

app.listen(port, function () {
    console.log('Server start at http://localhost:%s', port);
});