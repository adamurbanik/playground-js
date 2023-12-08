const path = require('path');


let production = process.env.NODE_ENV === 'production';

let config = {
    entry: ['./src/index', './src/home'],   // it is looking for these files and if it does not find .ts files it will look for .js file
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
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