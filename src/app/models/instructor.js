const db = require("../../config/db")
const moment = require("moment")

module.exports = {
  all(callback){
    db.query(`select * from instructors`, function(err, results){
      if(err) return res.send("database error")
      callback(results.rows)
    })
  },
  create(data, callback){
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
      data.name,
      data.avatar_url,
      data.gender,
      data.services,
      moment(data.birth).format("yyyy-MM-DD"),
      moment(Date.now()).format("yyyy-MM-DD")
    ] 
    db.query(query, values, function(err, results){
      if(err){ 
        console.log(err)
        return res.send('Database Error!')
      }else{
        console.log('sem erro de banco')
      }
      callback(results.rows[0])
    })
  }
}