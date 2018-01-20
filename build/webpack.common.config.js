const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '',
    filename: 'js/[name].bundle.[hash:6].js',
    chunkFilename: 'js/[name].chunk.[hash:6].js'
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // 动态生成 html 文件
      title: 'client',
      filename: 'client.html',
      template: './index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'common', 'client'],
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true // 删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({ // 动态生成 html 文件
      title: 'admin',
      filename: 'admin.html',
      template: './index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'common', 'admin'],
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true // 删除空白符与换行符
      }
    })
  ]
}
