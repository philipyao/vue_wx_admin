const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)

// 支持加载多个db json文件
const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach(function (file) {
  _.extend(base, require(path.resolve(mockDir, file)))
})
const router = jsonServer.router(base)
server.post('/api/login', (req, res)=>{
    let db = router.db
    let data = db.get('login_info').value()
    res.jsonp(data)
})
server.post('/api/wechat/fans/list', (req, res) => {
    let db = router.db
    let data = db.get('fans_list').value()
    res.jsonp(data)
})
server.use(jsonServer.bodyParser)
var tagid = 11001
server.post('/api/wechat/fans/addtag', (req, res) => {
    tagid++
    console.log(req.body.name)
    console.log(tagid)
    let data = {
        tag: {
            name: req.body.name,
            id: tagid,
            count: 0,
        }
    }
    res.jsonp(data)
})
server.use(router)

//post -> get
server.use((req, res, next)=>{
    req.Method = "GET"
    next()
})


server.listen(3000, "10.1.164.45", () => {
  console.log('JSON Server is running')
})
