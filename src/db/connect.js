const mongoose = require("mongoose")
const config = require("../configs")

class Connection {
  static connection = null
  static async connect() {
    const uri = config.DB.URLDB
    await mongoose.connect(uri).catch((error) => {
      console.log("Connect failed")
    })
    console.log("Connect to DB success")
  }

}

module.exports = Connection