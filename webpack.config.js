const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // empty dist folder
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({ // create the index.html file from template
      title: 'Peak Flow',
      hash: true, // cache busting
      metaDesc: 'Peak Flow',
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        loader: 'csv-loader', // load csv content into js bundle
        test: /\.(csv|tsv)$/i,
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // only loads stuff it finds in the index.js, will not just copy my style.css file
          'css-loader'
        ],
      },
    ]
  }
};