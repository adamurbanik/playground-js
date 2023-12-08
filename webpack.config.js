const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require('copy-webpack-plugin')

let production = process.env.NODE_ENV === "production";

let config = {
  // multiple bundles - each entry will have output filename
  entry: ["./src/index", "./src/home"],
  // entry: {
  //   index1: "./src/index",    // these files index1 and home1 will be produced
  //   home1: "./src/home",
  // },
  output: {
    filename: "main.js", // it will take the name of the entry point i.e. index, home and put it in the main.js
    // filename: '[name].js',  // it will take the name of the entry point i.e. index1, home1 and put it in the '[name].js'
    path: path.resolve(__dirname, "dist"), // place the files in this folder
    clean: true, // remove all the existing files in the ouptut folder
  },
  module: {
    rules: [
      // ts loader - take typescript and change it to javascript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, // anything below 50kb do images inline, anything over do not do it
          }
        },
        generator: {
          filename: "images/[hash][name][ext]"
          // hash can be used for caching
        }
      },
      // loader that looks for images files and copies them to destination filename
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     // filename: "images/[name][ext]"
      //     filename: "images/[hash][name][ext]"
      //     // hash can be used for caching
      //   }
      // },
      // loader that adds inline data of images into html file i.e. src="data:image/png;base64,iVBORw0K....
      // it helps with performance
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/inline',
      // },

      // {
      //   test: /\.txt$/,
      //   type: "asset/source"
      // },
      // {
      //     test: /\.css$/,
      //     exclude: /node_modules/,
      //     use: ['style-loader', 'css-loader']
      //     // array of loaders works backwards. The last in the array starts first.
      //     // output of the css-loader goes to style-loader in the piping format.
      //     // style-loader puts the css content into index.html file
      // },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          // {
          //   loader: "postcss-loader", // loader that adds prefixes to css - https://postcss.org/
          //   options: {
          //     postcssOptions: {
          //       plugins: [["postcss-preset-env", {}]],
          //     },
          //   },
          // },
          "sass-loader",
        ],
        // array of loaders works backwards. The last in the array starts first.
        // output of the css-loader goes to style-loader in the piping format.
        // css-loader process css
        // style-loader puts the css content into bundled js file - main.js

        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        // MiniCssExtractPlugin puts the css into separate file
      },

      // babel loader - take modern es6 js file and change it to es5
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    // plugin to produce index.html file. template option is using our own index.html file.
    // This plugin also injects all the bundle files in produced html file

    // new MiniCssExtractPlugin({ filename: "bundle.css" }),
    // MiniCssExtractPlugin puts the css into separate file

    // new CopyPlugin({ patterns: [{ from: './src/images', to: 'images' }]})
    // copy every assets from folder to folder
  ],
  resolve: {
    extensions: [".ts", ".js"], // search for .ts file, if not search for .js file. We tell webpack that we work with ts files, not only with js files.
  },
  // devtool: 'hidden-source-map',
  devtool: "inline-source-map", // source-maps
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*", "index.html"], // files to watch for live reload
    static: "./dist", // development server is looking at this folder to get the content from
    // liveReload: false, -  by default it is true
  },
};

if (production) {
  config.mode = "production";
  config.devtool = "inline-source-map";
}

module.exports = config;
