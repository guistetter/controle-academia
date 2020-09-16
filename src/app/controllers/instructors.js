const moment = require("moment")
const {age,date} = require("../../lib/utils")
const Instructor = require("../models/instructor")
module.exports = {
  index(req,res){
    //pagina home
    Instructor.all(function(instructors){
      return res.render("instructors/index",{instructors})
    })
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

    Instructor.create(req.body, function(instructor){
      return res.redirect(`/instructors/${instructor.id}`)
    })
  },

  show(req,res){
   Instructor.find(req.params.id, function(instructor){
    if(!instructor)return res.send('instructor not found!')
    instructor.age = age(instructor.birth)
    instructor.services = instructor.services.split(",")
    instructor.created_at = moment(instructor.created_at).format("DD-MM-yyyy")
    return res.render("instructors/show",{instructor})
    })
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
