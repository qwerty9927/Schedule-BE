const { ObjectId } = require('mongodb')
const fs = require('fs')
const Schema = require('./Schema.model')
const createModel = require('../services/createModel.service')
const createError = require('http-errors')
const { removeAccents } = require('../utils/convert')

require('../utils/dbTool')
require('dotenv').config()
class SubjectModel {
  async getInfoCourse() {
    try {
      const Model = createModel(process.env.INFOCOURSE, Schema.infoCourse)
      const result = (await Model.find({})).map(item => item.Semester)
      return result
    } catch (err) {
      throw err
    }
  }

  async searchSubject(searchInfo, docInfo) {
    searchInfo.searchValue = searchInfo.searchValue.toLowerCase()
    const remakeSearchValue = removeAccents(searchInfo.searchValue)
    const Model = createModel(docInfo.schoolYear.toLowerCase(), Schema.subjectSchema)
    const result = await Model.find(
      {
        $or: [
          {
            MaMH: searchInfo.searchValue
          },
          {
            TenMHUnsign: { $regex: `${remakeSearchValue}`, $options: 'i' }
          }
        ]
      })
    if(result.length){
      return result
    } else {
      throw createError.NotFound()
    }
  }
}

module.exports = new SubjectModel()