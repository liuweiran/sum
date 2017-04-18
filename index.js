const fs = require('fs'),
      path = require('path');

//module.exports = function (req, res) {
    let data = {
        files: []
    };

    let dir, root, html, title;
    root = path.resolve(__dirname, 'demos');
    if (fs.existsSync(root)) {
        fs.readdirSync(__dirname+'/demos', function(err, files){
            if(err)
                console.log(err)

            console.log(files)
        });


        /*fs.readdirSync(root).files.forEach(function(file) {
            console.log(file)
            fs.stat(root+'/'+file, function(err, stat){
                if(stat.isDirectory()){
                    console.log(file)

                }
            });

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


        });*/
    }
//}