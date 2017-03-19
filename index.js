const fs = require('fs-arm'),
      path = require('path'),
      ejs = require('ejs');

module.exports = function (req, res) {
    var data = {
        files: []
    };

    var root, html, title;
    root = path.resolve(__dirname, 'src/htm');
    if (fs.existsSync(root)) {
        fs.readdirsSync(root)
            .files
            .forEach(function(file) {
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

    root = path.resolve(__dirname, 'dist');
    if (fs.existsSync(root)) {
        fs.readdirsSync(root)
            .files
            .forEach(function(file) {
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

    var filename = path.resolve(__dirname, './index.html');
    var content = fs.readFileSync(filename, 'utf8');
    res.end(ejs.render(content, data, {filename}));
};

function resolve(p) {
    return p.replace(/\/|\\/g, '/');
}