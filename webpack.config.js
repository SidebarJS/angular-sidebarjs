const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'angular-sidebarjs': './src/angular-sidebarjs.js',
    'angular-sidebarjs.min': './src/angular-sidebarjs.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '~core': path.resolve(__dirname, 'node_modules/sidebarjs/dist/'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {loader: 'ng-annotate-loader?single_quotes'},
        {loader: 'babel-loader'},
      ],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{loader: 'css-loader', options: {url: false}}],
      }),
    },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {verbose: false}),
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new UglifyJsPlugin({include: /\.min\.js$/}),
    new OptimizeCssAssetsPlugin({assetNameRegExp: /\.min\.css$/}),
  ],
};
