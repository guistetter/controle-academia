const express = require('express')
const routes = express.Router()
const instructors = require("../routes/instructors")

routes.get('/', function(req, res) {
  return res.redirect('/instructors')
})

routes.get('/instructors',(req, res) =>{
  res.render('instructors/index.njk')
});

routes.get('/instructors/create',(req,res) => {
  res.render('instructors/create.njk')
})

routes.post("/instructors",instructors.post)

routes.get('/members', function(req, res){
  return res.send('members')
})

module.exports = routes