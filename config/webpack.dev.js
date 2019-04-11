const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: ['webpack-hot-middleware/client', path.resolve('src/index.js')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    chunkFilename: `bundle-[name]-chunk.js`
  },
  resolve: {
    alias: {
      configs$: path.resolve(__dirname, '../config/config.js'),
      utils$: path.resolve(__dirname, '../src/utils/index.js'),
      commons$: path.resolve(__dirname, '../src/pages/commons/index.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        enforce: 'pre',
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: 'index.html',
      filename: path.resolve(__dirname, '../dist/index.html')
    }),
    new webpack.DefinePlugin({
      __DEBUG__: true,
      __DEV__: true,
      'process.env.NODE_ENV': JSON.stringify('env')
    })
  ],
  resolveLoader: {
    modules: ['node_modules']
  }
}
