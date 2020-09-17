const db = require("../../config/db")
const moment = require("moment")
const { Instructor } = require("../controllers/instructors")

module.exports = {
  all(callback){
    db.query(`select * from instructors order by name asc`, function(err, results){
      if(err) throw `database error!, ${err}`
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
      if(err) throw "database error!"
      callback(results.rows[0])
    })
  },
  find(id, callback){
    db.query(`select * from instructors where id = $1`,[id], 
    function(err, results){
      if(err) throw "database error!"
      callback(results.rows[0])
    })
  },
  update(data, callback){
    const query = `
    update instructors set 
      avatar_url=($1),
      name=($2),
      birth=($3),
      gender=($4),
      services=($5)
    where id = $6
    `
    const values = [
      data.avatar_url,
      data.name,
      moment(data.birth).format("yyyy-MM-DD"),
      data.gender, 
      data.services,
      data.id
    ]
    db.query(query, values, function(err, results){
      if(err) throw "database error!"
      callback()
    })
  },
  delete(id, callback){
    db.query(`delete from instructors where id = $1`,[id], 
    function(err, results){
      if(err) throw `Database Error! ${err}`
      return callback()
    })
  }
}