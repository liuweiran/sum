# fs文件操作辅助模块 #

> author: Spikef

基于fs模块，扩充文件操作功能。引用该模块之后，不需要再引用fs模块，即可包含fs模块所有的功能。

所有操作均为同步操作，所以方法名中都包含Sync后缀。

## Methods ##

### copySync(src, dest, overwrite) ###

拷贝文件或者文件夹。

> src: 必需的。要拷贝的文件或者文件夹（可使用通配符）。
> dest: 必需的。拷贝文件或者文件夹的目的地（不能使用通配符）。
> overwrite: 可选的。规定是否可覆盖已有的文件或者文件夹。默认为true。

Example:

```javascript
var fs = require('fs-extra');
fs.copySync('C:\\disk\\a\\1.txt', '2.txt');     // 复制到同目录
fs.copySync('C:\\disk\\a\\1.txt', '../1.txt');  // 复制到上一层
fs.copySync('C:\\disk\\a\\1.txt', 'C:\\disk\\b\\1.txt');
```

### moveSync(src, dest, overwrite) ###

移动文件或者文件夹。

> src: 必需的。要拷贝的文件或者文件夹（可使用通配符）。
> dest: 必需的。拷贝文件或者文件夹的目的地（不能使用通配符）。
> overwrite: 可选的。规定是否可覆盖已有的文件或者文件夹。默认为true。

### remove(path) ###

删除一个文件或者文件夹。

> path: 可以是绝对路径或者相对于当前文件的相对路径。

### emptydirSync(dir) ###

清空一个目录，如果指定目录不存在，将自动创建。

### ensureFile(file) ###

确保文件存在，如果不存在，将自动创建一个空文件。

### ensureDir(dir) ###

确保文件夹存在，如果不存在，将自动创建一个空文件夹（不管父目录是否存在）。

### mkdirsSync(dir) ###

创建文件夹，如果父目录不存在，将自动创建。

### readdirsSync(dir) ###

遍历文件夹，返回包含所有子目录和子文件的完整路径数组。

Example:

```javascript
var fs = require('fs-extra');
console.log(fs.readdirsSync('C:\\disk\\test'));
/*
prints:
{
    folders: ['C:\\disk\\test\\a', 'C:\\disk\\test\\b'],
    files: ['C:\\disk\\test\\a\\1.txt', 'C:\\disk\\test\\2.jpg']
}
*/
```

### readTreeSync(dir) ###

遍历文件夹，返回包含所有子目录和子文件的树状结构。

Example:

```javascript
var fs = require('fs-extra');
console.log(fs.readdirsSync('C:\\disk\\test'));
/*
prints:
{
    name: 'C:\\disk\\test',
    folders: [
        {
            name: 'C:\\disk\\test\\a',
            folders: [],
            files: [
                'C:\\disk\\test\\a\\1.txt'
            ]
        },
        {
            name: 'C:\\disk\\test\\b',
            folders: [],
            files: []
        }
    ],
    files: [
        'C:\\disk\\test\\2.jpg'
    ]
}
*/
```

### saveFileSync(file, data[, options] [, append]) ###

保存内容到文件。当父目录不存在时，将自动创建。

### readJsonSync(file) ###

读取文本文件中的JSON对象，编码采用utf-8。

Alias: readJSONSync

### saveJsonSync(file, json, format) ###

保存JSON对象到文本文件，编码采用utf-8。

Alias: saveJSONSync