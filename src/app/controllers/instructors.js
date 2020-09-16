const {age,date} = require("../../lib/utils")
const moment = require("moment")
module.exports = {
  index(req,res){
    res.render('instructors/index.njk')
  },
  create(req,res){
    res.render('instructors/create.njk')
  },
  post(req,res){
  //validacao dos campos
  const keys = Object.keys(req.body)

  for( key of keys){
    if (req.body[key]== ""){
      return res.send("Preencha todos os campos")
    }
  }

  let {avatar_url, birth, name, services, gender} = req.body
  return 
  },

  show(req,res){
   return
  },
  edit(req,res){
    return
  },
  put(req,res){
    //validacao dos campos
  const keys = Object.keys(req.body)

  for( key of keys){
    if (req.body[key]== ""){
      return res.send("Preencha todos os campos")
    }
  }

  let {avatar_url, birth, name, services, gender} = req.body
  return 
  },
  delete(req,res){
    return
  },
}
