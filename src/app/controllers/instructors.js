const moment = require("moment")
const {age,date} = require("../../lib/utils")
const db = require("../../config/db")
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
    const query = `
      insert into instructors (
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) values ($1, $2, $3, $4, $5, $6)
      returning id
    `
    const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.services,
      moment(req.body.birth).format("yyyy-MM-DD"),
      moment(Date.now()).format("yyyy-MM-DD")
    ] 
    db.query(query, values, function(err, results){
      if(err){ 
        console.log(err)
        return res.send('Database Error!')
      }else{
        console.log('sem erro de banco')
      }
      return res.redirect(`instructors/${results.rows[0].id}`)
    })
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
