const fs = require('fs')
const data = require("../data.json")
const {age,date} = require("../utils")
const moment = require("moment")

//index tela principal
exports.index = (req, res) =>{
  res.render('members/index.njk',{
    members: data.members
  })
}

exports.show = function(req, res) {
 //req.params
 const { id } = req.params
 
 const foundMember = data.members
  .find(function(member){
    return member.id == id
 })

 if(!foundMember)return res.send('Member not found') 

 const member = {
   ...foundMember,
   age: age(foundMember.birth),
 }
 return res.render("members/show",{
   member
 })  
}

exports.create = (req,res) => {
  res.render('members/create.njk')
}

exports.post = (req, res) => {
  //validacao dos campos
 const keys = Object.keys(req.body)
  for( key of keys){
    if (req.body[key]== "")
    return res.send("Preencha todos os campos")
  }
  let {avatar_url, birth, name, services, gender} = req.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.members.length + 1)
  
  data.members.push({
    avatar_url, 
    birth, 
    created_at, 
    id, 
    name, 
    services, 
    gender
  })
  fs.writeFile("data.json", JSON.stringify(data, null, 3), function(err){  
    if(err) return res.send('Write file Error')
    return res.redirect("/members")
  })

  //return res.send(req.body)
}

exports.edit = (req, res) => {
  const { id } = req.params
  
  const foundMember = data.members
  .find(function(member){
    return member.id == id
 })
 if(!foundMember)return res.send('Member not found') 
 const member = {
   ...foundMember,
  birth: moment(foundMember.birth).format("yyyy-MM-DD")
 }
 //return yyy-mm-dd
  return res.render('members/edit', {member})
}
exports.put = function(req, res){
  const { id } = req.body
  let index = 0
  const foundMember = data.members
  .find(function(member, foundIndex){
    if(id == member.id){
      index = foundIndex
      return true
    }
 })

 if(!foundMember)return res.send('Member not found') 
 const member = {
  ...foundMember, 
  ...req.body,
  birth: Date.parse(req.body.birth),
  id: Number(req.body.id)
 }

 data.members[index] = member

 fs.writeFile('data.json', JSON.stringify(data,null,2), function(err){
   if(err) return res.send("write error")
   return res.redirect(`/members/${edit}`)
 })

}

exports.delete = function(req,res){
  const {id} = req.body
  const filteredMembers = data.members.filter(member => {
    return member.id != id 
  })
  data.members = filteredMembers
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write file error")
  })
  return res.redirect('/members')
}