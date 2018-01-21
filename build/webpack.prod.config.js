const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.common.config.js')

module.exports = merge(common, {
  entry: {
    client: ['babel-polyfill', './src/client.js'],
    admin: ['babel-polyfill', './src/admin.js'],
    vendor: ['axios', 'babel-polyfill']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                minimize: true // css压缩
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                minimize: true // css压缩
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(), // 移除上下文中的未引用代码
    new ExtractTextPlugin({ // 提取CSS
      filename: 'css/[name].bundle.[hash:6].css',
      allChunks: false // 取消打包异步加载的模块
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      chunks: ['client', 'admin']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      children: true,
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
})
