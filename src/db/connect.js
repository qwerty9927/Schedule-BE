const mongoose = require("mongoose")
const config = require("../configs")

class Connection {
  static connect() {
    const uri = config.DB.URLDB
    mongoose.connect(uri, (error) => {
      if(error){
        console.log(error)
        console.log("Connect failed")
      } else {
        console.log("Connect to DB success")
      }
    })
  }

}

module.exports = Connection