const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let production = process.env.NODE_ENV === 'production';

let config = {
    // it is looking for these files and if it does not find .ts files it will look for .js file
    // multiple bundles - each entry will have output filename
    entry: {
        index1: './src/index',
        home1: './src/home'
    },
    output: {
        filename: '[name].js', // it will take the name of the entry point i.e. index. home and put it in the file.js
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // ts loader - take typescript and change it to javascript
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
            // babel loader - take modern es6 js file and change it to es5
            //
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        // plugin to produce index.html file. template option is using our own index.html and injects all the bundle files in produced html file
        new HtmlWebpackPlugin({ template: "./index.html" })
    ],
    resolve: {
        extensions: ['.ts', '.js']   // search for .ts file, if not search for .js file. We tell webpack that we work with ts files, not only with js files.
    },
    // devtool: 'hidden-source-map',
    devtool: "inline-source-map",
    mode: 'development',
    devServer: {
        static: "./dist"
    }
}

if(production) {
    config.mode = 'production';
    config.devtool = 'inline-source-map'
}

module.exports = config;