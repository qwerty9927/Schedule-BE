const { ObjectId } = require('mongodb')
const fs = require('fs')
const Schema = require('./Schema.model')
const createModel = require('../services/createModel.service')
const createError = require('http-errors')

require('../utils/dbTool')
require('dotenv').config()
class SubjectModel {
  async getInfoCourse(school) {
    try {
      const Model = createModel(process.env.INFOCOURSE, Schema.infoCourse)
      const result = school ? (await Model.findOne({ School: school })).Semester : (await Model.find({})).map(item => item.School)
      return result
    } catch (err) {
      throw err
    }
  }

  async searchSubject(searchInfo, docInfo) {
    searchInfo.searchValue = searchInfo.searchValue.toLowerCase()
    const subName = `${docInfo.school}_${docInfo.schoolYear}`
    const Model = createModel(docInfo.school.toLowerCase(), Schema.subjectSchema)
    const result = await Model.find(
      {
        "Name": { $regex: subName, $options: 'i' },
        $or: [
          {
            "Subject.MaMH": searchInfo.searchValue
          },
          {
            "Subject.TenMH": { $regex: `^${searchInfo.searchValue}`, $options: 'i' }
          }
        ]
      })
    if(result.length){
      let newArray = []
      for(let i = 0;i < result.length;i++){
        newArray.push(...result[i].Subject)
      }
      newArray = newArray.filter(item => {
        if(item.TenMH.toLowerCase().startsWith(searchInfo.searchValue) || item.MaMH === searchInfo.searchValue){
          return true
        }
      })
      return newArray
    } else {
      throw createError.NotFound()
    }
  }
}

module.exports = new SubjectModel()