const mongoose = require("mongoose")
const config = require("../configs")

class Connection {
  static connection = null
  static  connect() {
    const uri = config.DB.URLDB
    console.log(uri)
    mongoose.connect(uri, (error) => {
      if(error){
        console.log("Connect failed")
      } else {
        console.log("Connect to DB success")
      }
    })
    // .catch((error) => {
    //   console.log("Connect failed")
    // })
    // console.log("Connect to DB success")
  }

}

module.exports = Connection