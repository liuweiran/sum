//使用require('path')载入path模块

//NodeJS中的Path对象，用于处理目录的对象

//格式化路径  path.normalize(p)
path.normalize('/foo/bar//baz/asdf/quux/..');
// returns
//'/foo/bar/baz/asdf'




//路径寻航 path.resolve([from ...], to)
//相当于不断的调用系统的cd命令
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
/*相当于：
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd*/




//相对路径 path.relative(from, to)
//返回某个路径下相对于另一个路径的相对位置串，相当于：path.resolve(from, path.relative(from, to)) == path.resolve(to)

path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')
// returns
//'..\\..\\impl\\bbb'

path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
// returns
//'../../impl/bbb'