const db = require("../../config/db")
const moment = require("moment")

module.exports = {
  all(callback){
    db.query(`select * from members`, function(err, results){
      if(err) throw `database error!, ${err}`
      callback(results.rows)
    })
  },
  create(data, callback){
    const query = `
      insert into members (
        name,
        avatar_url,
        gender,
        email,
        birth,
        blood,
        weight,
        height
      ) values ($1, $2, $3, $4, $5, $6, $7,$8)
      returning id
    `
    const values = [
      data.name,
      data.avatar_url,
      data.gender,
      data.email,
      moment(data.birth).format("yyyy-MM-DD"),
      data.blood,
      data.weight,
      data.height
    ] 
    db.query(query, values, function(err, results){
      if(err) throw `database error!, ${err}`
      callback(results.rows[0])
    })
  },
  find(id, callback){
    db.query(`select * from members where id = $1`,[id], 
    function(err, results){
      if(err) throw "database error!"
      callback(results.rows[0])
    })
  },
  update(data, callback){
    const query = `
    update members set 
      avatar_url=($1),
      name=($2),
      birth=($3),
      gender=($4),
      email=($5),
      blood=($6),
      weight=($7),
      height=($8)
    where id = $9
    `
    const values = [
      data.avatar_url,
      data.name,
      moment(data.birth).format("yyyy-MM-DD"),
      data.gender, 
      data.email,
      data.blood,
      data.weight,
      data.height,
      data.id
    ]
    db.query(query, values, function(err, results){
      if(err) throw "database error!"
      callback()
    })
  },
  delete(id, callback){
    db.query(`delete from members where id = $1`,[id], 
    function(err, results){
      if(err) throw `Database Error! ${err}`
      return callback()
    })
  }
}