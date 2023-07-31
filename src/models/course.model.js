const {Schema, model} = require("mongoose")

const collectionName = "course"
const courseSchema = new Schema({
  Semester: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = model(collectionName, courseSchema)