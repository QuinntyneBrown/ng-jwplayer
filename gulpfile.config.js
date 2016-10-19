'use strict';
var GulpConfig = (function () {

    function GulpConfig() {
        this.tsOutputPath = './lib';
        this.allCss = ['./src/**/*.css', './demo-app/**/*.scss'];
        this.allHtml = ['./src/**/*.html', './demo-app/**/*.html'];
        this.allTypeScript = [
            './src/**/*.ts!(*.d.ts)',
            './demo-app/**/*.ts!(*.d.ts)'];
        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*index.d.ts';
        this.allFiles = [this.allCss, this.allTypeScript, this.allHtml];
        this.tsConfig = {
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "target": "es5",
            "module": "commonjs",
            "moduleResolution": "node",
            "removeComments": true,
            "sourceMap": true,
            "outDir": "../lib",
            "declaration": true
        };
        this.webpackConfig = {
            entry: {
                'polyfills': './src/demo-app/polyfills.ts',
                'vendor': './src/demo-app/vendor.ts',
                'app': './src/demo-app/main.ts'
            },
            output: {
                filename: '[name].js',
                chunkFilename: '[id].chunk.js'
            },
            resolve: {
                extensions: ['', '.js', '.ts']
            },
            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loader: 'ts',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.html$/,
                        loader: 'html'
                    },
                    {
                        test: /\.css$/,
                        loaders: ["css"]
                    },
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        loaders: ['raw-loader', 'sass-loader']
                    }
                ]
            },
            resolve: {
                extensions: ['', '.webpack.js', '.web,js', '.ts', '.js']
            }
        };
    }
    return GulpConfig;
})();
module.exports = GulpConfig;