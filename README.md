#sum项目说明

## 启动服务

```
$ node start --port [端口号]
```
如果省略端口号，则使用默认端口。

## 访问静态文件

访问原始文件: `http://localhost:port/src`

访问构建后的文件: `http://localhost:port`

## 项目结构说明
htm文件夹
-存放平时总结的案例

node文件夹
-存放node模块的使用方法
-文件名已node模块名命名






## 项目结构说明

`assets`目录下用于存在第三方的资源文件以及图片等, 项目中自己写的css文件放入src目录下的css文件夹, js文件放入src目录下的js文件夹, 构建工具将自动对这两个目录中的文件进行处理

引用资源文件时, 统一基于`assets`目录, 在构建时将自动统一放到`assets`目录下

## 构建任务

运行默认任务, 将依次完成所有任务

```bash
$ gulp
```

构建指定任务: 当只修改指定文件时使用

```bash
$gulp [task]
```

任务列表: `BuildHtml`, `BuildCss`, `BuildJs`, `CopyAssets`, `BuildLess`, `WatchLess`

## 使用ejs模板引擎

对于html文件, 可以使用[ejs](https://github.com/mde/ejs)模板引擎提供的方法

> 注意: 子模板文件都保存在`subs`目录中, 这样构建的时候将忽略掉子模板文件