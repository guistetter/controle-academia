const moment = require("moment")
const {age,date} = require("../../lib/utils")
const Member = require("../models/member")
module.exports = {
  index(req,res){
    //pagina home
    Member.all(function(members){
      return res.render("members/index",{members})
    })
  },
  create(req,res){
    res.render('members/create.njk')
  },
  post(req,res){
    //validacao dos campos
    const keys = Object.keys(req.body)

    for( key of keys){
      if (req.body[key]== ""){
        return res.send("Preencha todos os campos")
      }
    }

    Member.create(req.body, function(member){
      return res.redirect(`/members/${member.id}`)
    })
  },

  show(req,res){
   Member.find(req.params.id, function(member){
    if(!member)return res.send('member not found!')
    member.age = age(member.birth)
    return res.render("members/show",{member})
    })
  },
  edit(req,res){
    Member.find(req.params.id, function(member){
      if(!member)return res.send('member not found!')
      member.birth = moment(member.birth).format("yyyy-MM-DD")
      return res.render("members/edit",{member})
      })
  },
  put(req,res){
    //validacao dos campos
  const keys = Object.keys(req.body)

  for( key of keys){
    if (req.body[key]== ""){
      return res.send("Preencha todos os campos")
    }
  }
  Member.update(req.body, function(){
    return res.redirect(`/members/${req.body.id}`)
  })
  },
  delete(req,res){
    Member.delete(req.body.id, function(){
      return res.redirect(`/members/`)
    })
  },
}
