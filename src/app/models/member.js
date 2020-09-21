const db = require("../../config/db")
const moment = require("moment")

module.exports = {
  all(callback){
    db.query(`select * from members order by name asc`, function(err, results){
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
        height,
        instructor_id
      ) values ($1, $2, $3, $4, $5, $6, $7,$8, $9)
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
      data.height,
      data.instructor
    ] 
    db.query(query, values, function(err, results){
      if(err) throw `database error!, ${err}`
      callback(results.rows[0])
    })
  },
  find(id, callback){
    db.query(`
    select members.*, instructors.name as instructor_name 
    from members 
    left join instructors on (members.instructor_id = instructors.id)
    where members.id = $1`,[id], 
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
      height=($8),
      instructor_id=($9)
    where id = $10
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
      data.instructor,
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
  },
  instructorsSelectOptions(callback){
    db.query(`select name, id from instructors`, function(err,results){
      if(err) throw 'Database error aqui model'
      callback(results.rows)
    })
  },
  paginate(params){
    const {filter, limit, offset, callback} = params

    let query = "",
    filterQuery = "",
    totalQuery = `(
      select count(*) from members
     ) as total
    `
    if ( filter ){

      filterQuery = `
      where members.name ilike '%${filter}%' 
      or members.email ilike '%${filter}%'
      `
      totalQuery = `(
        select count(*) from members
        ${filterQuery}
      ) as total`
    }
    
    query = `
    select members.*, ${totalQuery}
    from members
    ${filterQuery}
    limit $1 offset $2
    `

    db.query(query, [limit, offset], function(err, results){
      if(err) throw 'Database Error!'
      callback(results.rows)
    })
  }
}