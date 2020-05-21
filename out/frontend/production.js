const fs = require('fs')
const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()
const prefix = '/'
const proxyUrl = 'http://49.233.85.54:3000'
const port = 3100
// 开启静态资源访问
app.use(express.static('./frontend/public')) 
// 接口的代理1
app.use('/api/*', proxy({
    target: proxyUrl,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  })
)
// 项目
app.get(prefix, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  res.end(fs.readFileSync('./frontend/view/index.html').toString())
})
// 启动服务
app.listen(port, () => {
  console.log('server on http://49.233.85.54:3100')
})