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

  async createInfoMajors(info){
    const Model = createModel(process.env.INFOMAJORS, Schema.infoMajors)
    const result = await Model.find({ Majors: info.majors })
    if (!result.length && info.majors !== process.env.MCMAJORS) {
      try {
        await Model.create({Majors: info.majors})
      } catch(err){
        throw err
      }
    }
  }

  receiveData(data, collInfo) {
    try {
      const collName = collInfo.schoolYear.toLowerCase() + "_" + collInfo.majors.toLowerCase()
      const Model = createModel(collName, Schema.subjectSchema)
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