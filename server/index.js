const http = require('http')
const { Mysql } = require('./Mysql')
const mysql = new Mysql({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root123',
  database: 'information_schema',
  convertToTimestamp: true,
})
http
  .createServer(async (req, res) => {
    if (req.method !== 'POST') {
      res.statusCode = 403
      res.end('403')
      return
    }
    const reqBody = []
    for await (const chuck of req) {
      reqBody.push(chuck)
    }
    const obj = JSON.parse(String(Buffer.concat(reqBody)))
    if (obj.db && mysql.dbName !== obj.db) {
      console.log('切换数据库', mysql.dbName, '->', obj.db)
      mysql.selectDb(obj.db)
    }
    obj.callback = (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end(String(err))
        return
      }
      setTimeout(() => {
        res.end(JSON.stringify(data))
      }, 0)
    }
    mysql.queryRaw(obj)
  })
  .listen(54321, '127.0.0.1')
