const nunjucks = require('nunjucks')
const express = require("express")
const server = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/routes')

server.use(routes)
server.use(express.static("public"))
server.set("view engine", "njk")
nunjucks.configure('views',{
  express:server,
  noCache: true,
  autoescape: false
})



server.listen(PORT, () => {
  console.log('server running on port: ',PORT)
})