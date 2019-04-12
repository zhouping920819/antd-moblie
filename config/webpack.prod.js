const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'eval-source-map',
  entry: ['webpack-hot-middleware/client', path.resolve('src/index.js')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle-[name].js',
    chunkFilename: `bundle-[name]-chunk.js`,
    publicPath: '/build/'
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
      },
      { test: /\.(jpg|png)$/, loader: 'url-loader?limit=8192' }
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
      filename: path.resolve(__dirname, '../dist/index.html'),
      minify: {
        // 去掉注释
        removeComments: true,
        // 去掉空格
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      __DEBUG__: false,
      __DEV__: false,
      'process.env.NODE_ENV': JSON.stringify('env')
    })
  ],
  resolveLoader: {
    modules: ['node_modules']
  },
  performance: {
    hints: false
  },
  //压缩js
  optimization: {
    // 分包
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          },
          output: {
            // 最紧凑的输出
            beautify: true,
            // 删除所有的注释
            comments: true
          }
        }
      })
    ]
  }
}
