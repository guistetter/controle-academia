const fs = require('fs')
const data = require("../data.json")
exports.post = (req, res) => {
  //validacao dos campos
 const keys = Object.keys(req.body)
  for( key of keys){
    if (req.body[key]== "")
    return res.send("Preencha todos os campos")
  }

  data.instructors.push(req.body)
  fs.writeFile("data.json", JSON.stringify(data, null, 3), function(err){  
    if(err) return res.send('Write file Error')
    return res.redirect("/instructors")
  })

  //return res.send(req.body)
}