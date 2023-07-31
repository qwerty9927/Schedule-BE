const {Schema, model} = require('mongoose')

const collectionName = "account"
const accountSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nameUser: {
    type: String
  },
  accessKey: {
    type: String
  },
  refreshKey: {
    type: String
  },
  permission: {
    type: String,
    enum: ["NOT_ACCESS", "ROOT_ACCESS"],
    default: "NOT_ACCESS"
  }
})

module.exports = model(collectionName, accountSchema)
