var gulp = require('gulp');
var tsc = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var Config = require('./gulpfile.config');
var config = new Config();
var clean = require('gulp-clean');
var del = require('del');
var webpack = require("webpack-stream");

gulp.task('clean', function () {
    return del([
        'src/lib/ng2-player/index.d.ts',
        'src/lib/ng2-jwplayer/jw-player.component.d.ts',
        'src/lib/ng2-player/jw-player.component.js',
        'src/lib/ng2-player/index.js'
    ]);
});

gulp.task('compile', function () {
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
    gulp.watch([config.allFiles], ['compile', 'webpack']);
});


gulp.task('default', function () {
    gulp.watch([config.allFiles], ['compile', 'webpack','watch']);
});


