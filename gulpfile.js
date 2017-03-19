'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var changed = require('gulp-changed');
var prefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var ejs = require('gulp-ejs');
var minify = {
    html: require('gulp-htmlmin'),
    css: require('gulp-clean-css'),
    js: require('gulp-uglify')
};

var SRC = {
    html: 'src/htm/**/*.html',
    html_exclude: '!src/subs/*.html',
    less: 'src/less/**/*.less',
    less_exclude: 'src/less/include/*.less',
    css: 'src/css/**/*.css',
    js: 'src/js/**/*.js',
    assets: 'src/assets/**/*',
    img: 'src/img/**/*',
};

var DEST = {
    html: 'dist',
    less: 'src/css',
    css: 'dist/assets/css',
    js: 'dist/assets/js',
    assets: 'dist/assets',
    img: 'dist/assets/img',
};

var fs = require('fs-extra');
var path = require('path');
var crc32 = require('buffer-crc32');

gulp.task('CleanAll', function () {
    var target = path.resolve(__dirname, DEST.html);
    fs.removeSync(target);
});

gulp.task('BuildHtml', function () {
    return gulp.src([SRC.html, SRC.html_exclude])
        .pipe(ejs())
        .pipe(appendVersion())
        // .pipe(minify.html({collapseWhitespace: true}))
        .pipe(gulp.dest(DEST.html));
});

gulp.task('BuildLess', function () {
    return gulp.src([SRC.less, SRC.less_exclude])
        .pipe(less())
        .pipe(gulp.dest(DEST.less));
});

gulp.task('WatchLess', function () {
    gulp.watch(SRC.less, ['BuildLess']);
});

gulp.task('BuildCss', ['BuildLess'], function () {
    return gulp.src(SRC.css)
        .pipe(prefixer({
            browsers: [
                'last 20 versions'
            ]
        }))
        // .pipe(minify.css({compatibility: 'ie8'}))
        .pipe(gulp.dest(DEST.css));
});

gulp.task('BuildJs', function () {
    return gulp.src(SRC.js)
    // .pipe(minify.js())
        .pipe(gulp.dest(DEST.js));
});

gulp.task('CopyAssets', function () {
    return gulp.src(SRC.assets)
        .pipe(gulp.dest(DEST.assets));
});

gulp.task('CopyImg', function () {
    return gulp.src(SRC.img)
        .pipe(gulp.dest(DEST.img));
});

gulp.task('default', ['CleanAll', 'BuildCss', 'BuildJs', 'CopyAssets', 'BuildHtml', 'CopyImg']);

var code_cache = {};
function appendVersion() {
    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            callback(null, file);
        } else if (file.isStream()) {
            callback(new gutil.PluginError('gulp-append-version', 'Streaming not supported'));
        } else {
            var content = file.contents.toString(encoding);

            content = content.replace(/"assets\/((css|js)\/(.+\.(css|js)))/g, function ($0, $1, $2, $3) {
                if (code_cache[$3]) return $0 + '?v=' + code_cache[$3];

                var source = path.resolve(__dirname, 'src', $1);
                if (fs.existsSync(source)) {
                    var code = crc32(fs.readFileSync(source));
                    code = code.toString('hex').toLowerCase();

                    code_cache[$3] = code;

                    return $0 + '?v=' + code_cache[$3];
                }

                return $0;
            });

            file.contents = new Buffer(content);

            callback(null, file);
        }
    });
}