var gulp = require('gulp');
var tsc = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var Config = require('./gulpfile.config');
var config = new Config();
var clean = require('gulp-clean');
var del = require('del');
var webpack = require("webpack-stream");

gulp.task('clean', function () {
    var tsGeneratedFiles = [
        'src/lib/ng2-jwplayer/index.d.ts',
        'src/lib/ng2-jwplayer/jw-player.component.d.ts',
        'src/lib/ng2-jwplayer/jw-player.module.d.ts',
        'src/lib/ng2-jwplayer/jw-player.module.js',
        'src/lib/ng2-jwplayer/jw-player.component.js',
        'src/lib/ng2-jwplayer/index.js'
    ];
   
    return gulp.src(tsGeneratedFiles, { read: false })
        .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
    var sourceTsFiles = [
        './src/lib/ng2-jwplayer/jw-player.component.ts',
        './src/lib/ng2-jwplayer/index.ts',
        './src/lib/ng2-jwplayer/jw-player.module.ts',
        config.libraryTypeScriptDefinitions
    ];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(inlineNg2Template({ base: '/src/lib/ng2-jwplayer/' }))
        .pipe(tsc(config.tsConfig));

    tsResult.dts.pipe(gulp.dest('./src/lib/ng2-jwplayer'));
    return tsResult.js
                    .pipe(gulp.dest('./src/lib/ng2-jwplayer'));
});


gulp.task("webpack", ["compile"], function () {
    return gulp.src(['./src/demo-app/vendor.ts', './src/demo-app/polyfills.ts', './src/demo-app/main.ts'])
    .pipe(webpack(config.webpackConfig))
    .pipe(gulp.dest('src/demo-app/'));
});

gulp.task('watch', ['webpack'],function () {
    gulp.watch(
        [
            './src/lib/ng2-jwplayer/jw-player.component.ts',
            './src/lib/ng2-jwplayer/jw-player.component.html',
            './src/lib/ng2-jwplayer/jw-player.component.css',
            './src/lib/ng2-jwplayer/index.ts',
            './src/lib/ng2-jwplayer/jw-player.module.ts'
        ],
        ['compile', 'webpack']);
});


gulp.task('default',['compile', 'webpack', 'watch']);


