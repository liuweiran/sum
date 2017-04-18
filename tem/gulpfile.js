'use strict';

const gulp = require('gulp'),
      less = require('gulp-less');

let SRC = {
    less: 'src/less/*.less',
    css: 'src/css'
};

gulp.task('BuildLess', function () {
    //1. 找到less文件
    return gulp.src([SRC.less])
    //2. 编译为css
        .pipe(less())
    //3. 另存文件
        .pipe(gulp.dest(SRC.css));
});

gulp.task('WatchLess', function () {
    //监听文件修改
    gulp.watch(SRC.less, ['BuildLess']);
});

gulp.task('default', ['WatchLess']);