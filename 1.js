const fs = require('fs'),
      path = require('path');

let data = {
    dirs: []
};

let root = path.resolve(__dirname, 'demos');

if(fs.existsSync(root)){
    fs.readdir(root, function(err, dirs){
        dirs.forEach(function (dir){
            let o = {};
            o.flag = '&clubs;';
            o.name = dir;
            o.files = [];

            fs.readdir(path.join(root, dir), function(err, files){
                files.forEach(function(file){
                    let html, title, path;
                    const path1 = path.join(root, dir, file),
                          path2 = path.join(root, dir, file, 'index.html');

                    fs.stat(path1, function(err, stats){

                        if( stats.isDirectory() ){
                            fs.readFile(path2, function(err, res){
                                html = res.toString();
                                path = path2;
                                console.log(res)
                            })
                        }else{
                            fs.readFile(path1, function(err, res){
                                html = res.toString();
                                path = path1;
                            })
                        }

                        title = file
                        //title = html.match(/<title>([^<]+?)<\/title>/);
                        //title = title ? title[1] : '';

                        o.files.push({
                            flag: '&bull;',
                            title: title,
                            path: path
                        });
                        console.log(o)
                    });

                });
            });
            data.dirs.push(o);
        });

        //console.log(data)
    });
}