const mongoose = require("mongoose")
const config = require("../configs")

class Connection {
  static connection = null
  static connect() {
    const uri = config.DB.URLDB
    Connection.connection = mongoose.connect(uri).catch((error) => {
      console.log("Connect failed")
    })
    console.log("Connect to DB success")
  }
  static getInstance(){
    if(mongoose.connection.readyState === 0){
      Connection.connection = Connection.connect()
    }
    return Connection.connection
  }
}

module.exports = Connection