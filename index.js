const fs = require('fs-arm'),
      path = require('path'),
      ejs = require('ejs');

module.exports = function (req, res) {
    let data = {
        files: []
    };

    let root, html, title;
    root = path.resolve(__dirname, 'src/htm');
    if (fs.existsSync(root)) {
        fs.readdirsSync(root).files.forEach(function(file) {
                html = fs.readFileSync(file, 'utf8');
                title = html.match(/<title>([^<]+?)<\/title>/);
                title = title ? title[1] : '';

                file = path.relative(root, file);
                data.files.push({
                    flag: '&hearts;',
                    href: resolve('/src/' + file),
                    path: resolve('src/' + file),
                    title: title
                })
            });
    }

    // &hearts; 是html代码 表示心形特殊字符  &diams; 表示方块
    //match() 返回存放结果的数组
    /*
    例如：'gagga<title>标题</title>'.match(/<title>([^<]+?)<\/title>/)
    得到： ["<title>题目</title>", "题目", index: 5, input: "gagga<title>题目</title>"]
    */

    root = path.resolve(__dirname, 'dist');
    if (fs.existsSync(root)) {
        fs.readdirsSync(root).files.forEach(function(file) {
                if (!/\.html$/.test(file)) return;

                html = fs.readFileSync(file, 'utf8');
                title = html.match(/<title>([^<]+?)<\/title>/);
                title = title ? title[1] : '';

                file = path.relative(root, file);
                data.files.push({
                    flag: '&diams;',
                    href: resolve('/' + file),
                    path: resolve(file),
                    title: title
                })
            });
    }

    const filename = path.resolve(__dirname, './index.html'),
          content = fs.readFileSync(filename, 'utf8');
    res.end(ejs.render(content, data, {filename}));
};

function resolve(p) {
    return p.replace(/\/|\\/g, '/');
}