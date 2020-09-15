const fs = require('fs')
const data = require("../data.json")
const {age,date} = require("../utils")
const moment = require("moment")

//index tela principal
exports.index = (req, res) =>{
  res.render('instructors/index.njk',{
    instructors: data.instructors
  })
}

//show
exports.show = function(req, res) {
 //req.params
 const { id } = req.params
 
 const foundInstructor = data.instructors
  .find(function(instructor){
    return instructor.id == id
 })

 if(!foundInstructor)return res.send('Instructor not found') 

 const instructor = {
   ...foundInstructor,
   age: age(foundInstructor.birth),
   services: foundInstructor.services.split(","),
   created_at: moment(foundInstructor.created_at).format("DD/MM/yyyy")
 }

 return res.render("instructors/show",{
   instructor
 })  
}

//create
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
  const id = Number(data.instructors.length + 1)
  
  data.instructors.push({
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
    return res.redirect("/instructors")
  })

  //return res.send(req.body)
}

//edit
exports.edit = (req, res) => {
  const { id } = req.params
  
  const foundInstructor = data.instructors
  .find(function(instructor){
    return instructor.id == id
 })
 if(!foundInstructor)return res.send('Instructor not found') 
 const instructor = {
   ...foundInstructor,
  birth: moment(foundInstructor.birth).format("yyyy-MM-DD")
 }
 //return yyy-mm-dd
  return res.render('instructors/edit', {instructor})
}

exports.put = function(req, res){
  const { id } = req.body
  let index = 0
  const foundInstructor = data.instructors
  .find(function(instructor, foundIndex){
    if(id == instructor.id){
      index = foundIndex
      return true
    }
 })

 if(!foundInstructor)return res.send('Instructor not found') 
 const instructor = {
  ...foundInstructor, 
  ...req.body,
  birth: Date.parse(req.body.birth),
  id: Number(req.body.id)
 }

 data.instructors[index] = instructor

 fs.writeFile('data.json', JSON.stringify(data,null,2), function(err){
   if(err) return res.send("write error")
   return res.redirect(`/instructors/${edit}`)
 })

}

//delete
exports.delete = function(req,res){
  const {id} = req.body
  const filteredInstructors = data.instructors.filter(instructor => {
    return instructor.id != id 
  })
  data.instructors = filteredInstructors
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write file error")
  })
  return res.redirect('/instructors')
}