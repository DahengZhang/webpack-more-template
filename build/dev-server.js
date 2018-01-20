const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxy = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.config.js')

const app = express()
const compiler = webpack(webpackConfig)
const port = 8080
const apiProxy = proxy({
  target: 'http://localhost:3000',
  pathRewrite: {
    '/api': ''
  },
})

app.use(webpackDevMiddleware(compiler, {
  noInfo: true // 关闭日志
}))
app.use(webpackHotMiddleware(compiler))

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.use('/api', apiProxy)

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})
