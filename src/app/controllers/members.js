const moment = require("moment")
const {age,date} = require("../../lib/utils")
const Member = require("../models/member")
module.exports = {
  index(req,res){
    //pagina home
    let { filter, page, limit } = req.query
    page = page || 1
    limit = limit || 2 
    let offset = limit * (page - 1)
    const params = {
      filter, 
      page, 
      limit, 
      offset,
      callback(members){
        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page
        }
        return res.render("members/index",{members, pagination, filter})
      }
    }
    Member.paginate(params)
  },
  create(req,res){
    Member.instructorsSelectOptions(function(options){
      res.render('members/create.njk',{instructorOptions: options})
    })
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
    member.birth = moment(member.birth).format("DD-MM-yyyy")
    return res.render("members/show",{member})
    })
  },
  edit(req,res){
    Member.find(req.params.id, function(member){
      if(!member)return res.send('member not found!')
      member.birth = moment(member.birth).format("yyyy-MM-DD")

      Member.instructorsSelectOptions(function(options){
        res.render('members/edit.njk',{member, instructorOptions: options})
      })
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
