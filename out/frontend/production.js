const os = require('os')
function getIPAdress() {
  let localIPAddress = "";
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        localIPAddress = alias.address;
      }
    }
  }
  return localIPAddress;
}
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const proxy = require('http-proxy-middleware')
const app = express()
const prefix = '/'
const proxyUrl = `http://${getIPAdress()}:3000`
const port = 8002
app.use(cors()) // cors
app.use(express.static('./frontend/public')) // 开启静态资源访问
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
  console.log(`server on http://${getIPAdress()}:${port}`)
})