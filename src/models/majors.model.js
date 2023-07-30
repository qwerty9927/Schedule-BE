const {Schema, model} = require("mongoose")

const majorsSchema = new Schema({
  Majors: {
    type: String,
    required: true,
    unique: true
  }
})

const majorsContructor = (name) => {
  return model(name, majorsSchema)
}

module.exports = majorsContructor