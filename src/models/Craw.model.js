const createModel = require('../services/createModel.service')
const Schema = require("./Schema.model")

class CrawModel {
  async createInfoCourse(info) {
    const Model = createModel(process.env.INFOCOURSE, Schema.infoCourse)
    const result = await Model.find({ Semester: info.schoolYear })
    if (!result.length) {
      try {
        await Model.create({Semester: info.schoolYear})
      } catch(err){
        throw err
      }
    }
  }

  receiveData(data, collInfo) {
    try {
      const Model = createModel(collInfo.schoolYear.toLowerCase(), Schema.subjectSchema)
      Model.insertMany(data, function(e) {
        console.log("Error insert: ", e);
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

module.exports = new CrawModel()