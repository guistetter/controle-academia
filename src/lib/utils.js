module.exports = {
  age(timestamp){
    const today = new Date()
    const birthDate = new Date(timestamp)
  
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth()- birthDate.getMonth()
  
    if(month < 0 || month == 0 && today.getDate() <=  birthDate.getDate()){
      age = age - 1
    }
    return age
  },
  date(timestamp){
    const date = Date(timestamp)
    
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    console.log(`${year}-${month}-${day}`)
  }
}
