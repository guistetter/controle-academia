const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const express = require("express")
const server = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/routes')

server.use(methodOverride('_method'))
server.use(express.urlencoded({extended:true}))
server.use(routes)


server.use(express.static("public"))
server.set("view engine", "njk")
nunjucks.configure('src/app/views',{
  express:server,
  noCache: true,
  autoescape: false
})


server.listen(PORT, () => {
  console.log('server running on port: ',PORT)
})