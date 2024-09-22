const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv')
// const resolve = require('path').resolve;
dotenv.config();
module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
    //   // `filename` provides a template for naming your bundles (remember to use `[name]`)
    //   filename: 'bundle.js',
    //   // `chunkFilename` provides a template for naming code-split bundles (optional)
    //   chunkFilename: '[name].bundle.js',
    //   assetModuleFilename: 'images/[hash][ext][query]',
    //   // `path` is the folder where Webpack will place your bundles
    //   path: resolve(__dirname, '/dist'),
    //   // `publicPath` is where Webpack will load your bundles from (optional)
    //   publicPath: resolve(__dirname, '/dist')
      publicPath: '/',
      path: '/public',
    },
    devtool: 'inline-source-map',
    // devtool: 'source-map',
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true,
        compress: true,
        open: true,
        liveReload: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
          // inject: true,
          // filename: 'index.html',
          // chunks: ['common', 'app'],
          // path: resolve(__dirname, 'dist'),
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env)
        })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              // "postcss-loader",
            ],
          },
          {
            test: /\.(svg|png|jpe?g|gif)$/,
            type: 'asset/resource',
            generator: {
              filename: 'images/[hash][ext][query]',
            }
          },
        ],
    },
};