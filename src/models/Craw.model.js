const createModel = require('../services/createModel.service')
const Schema = require("./Schema.model")

class CrawModel {
  async createInfoCourse(info) {
    const Model = createModel("course", Schema.infoCourse)
    const result = await Model.find({ School: info.school })
    if (result.length) {
      const subResult = await Model.find({ Semester: info.schoolYear })
      if(!subResult.length){
        try {
          await Model.updateOne({School: info.school}, {$push: {Semester: info.schoolYear}})
        } catch(err){
          throw err
        }
      }
    } else {
      try {
        await Model.create({School: info.school, Semester: [info.schoolYear]})
      } catch(err){
        throw err
      }
    }
  }

  async receiveData(data, collInfo) {
    const name = `${collInfo.school.toLowerCase()}_${collInfo.schoolYear.toLowerCase()}_${collInfo.code.toLowerCase()}`
    try {
      const Model = createModel(collInfo.school.toLowerCase(), Schema.subjectSchema)
      const isExists = await Model.exists({ Name: name })
      if (isExists) {
        const docs = await Model.find({ Name: name })
        if (docs) {
          await Model.updateOne({ Name: name }, { Subject: docs[0].Subject.concat(data) })
        }
      } else {
        const row = new Model()
        row.Name = name
        row.Subject = data
        row.save((err) => {
          console.log(err)
        })
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

module.exports = new CrawModel()