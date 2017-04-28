const fs = require('fs'),
      path = require('path');

//module.exports = function(){
    let dirs = [];
    let root = path.resolve(__dirname, 'demos');

    if(fs.existsSync(root)){
        fs.readdirSync(root).forEach( dir => {

            let o = {};
            o.flag = '&clubs;';
            o.name = dir;
            o.files = [];

            let title, src;

            fs.readdirSync(path.join(root, dir)).forEach( file => {
                src = path.join(root, dir, file);

                if(fs.statSync(src).isDirectory()){
                    src = path.join(src, 'index.html');
                }
                title = fs.readFileSync(src, 'utf8').match(/<title>([^<]+?)<\/title>/);
                title = title ? title[1] : '';
                src = path.relative(__dirname , src);

                o.files.push({
                    flag: '&bull;',
                    title: title,
                    src: src
                });
            });

            dirs.push(o);
        });
    }

    let html = '', htmlIn;

    dirs.forEach( i => {

        htmlIn = '';
        i.files.forEach( v => {
            htmlIn += '\n'+'  <dd>'+ v.flag +' <a href="'+ v.src +'">'+ v.src +' - '+ v.title +'</a></dd>';
        });

        html += '\n'+'<dl>'+'\n'+'  <dt>'+ i.flag +' <b>'+ i.name +'</b></dt>'+ htmlIn +''+'\n'+'</dl>';
    });
    html = '<body>'+ html +'\n'+'</body>';
    html = fs.readFileSync(__dirname + '/temp.html', 'utf8').replace(/<body><\/body>/, html);

    fs.writeFileSync(__dirname + '/index.html', html);
    console.log('**Demos list saved in index.html.**');
//};