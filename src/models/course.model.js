const {Schema, model} = require("mongoose")
const { courseCollection } = require("../constance")

const courseSchema = new Schema({
  Semester: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = model(courseCollection, courseSchema)