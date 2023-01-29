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

  async getInfoMajors(schoolYear) {
    try {
      const Model = createModel(process.env.INFOMAJORS + "_" + schoolYear, Schema.infoMajors)
      const result = (await Model.find({})).map(item => item.Majors)
      return result
    } catch (err) {
      throw err
    }
  }

  removeExcess(array){
    return array.map(item => {
      const {_id, TenMHUnsign, __v, ...remaining} = item._doc
      return remaining
    })
  }

  async searchSubject(searchInfo, docInfo) {
    const collNameRoot = docInfo.schoolYear.toLowerCase() + "_" + process.env.MCMAJORS
    const collNameMajors = docInfo.schoolYear.toLowerCase() + "_" + docInfo.majors.toLowerCase()
    const remakeSearchValue = removeAccents(searchInfo.searchValue.toLowerCase())
    const ModelRoot = createModel(collNameRoot, Schema.subjectSchema)
    const ModelMajors = createModel(collNameMajors, Schema.subjectSchema)
    const resultRoot = await ModelRoot.find(
      {
        $or: [
          {
            MaMH: searchInfo.searchValue
          },
          {
            TenMHUnsign: { $regex: `${remakeSearchValue}`, $options: 'i' }
          }
        ]
      }
    )
    const resultMajors = await ModelMajors.find(
      {
        $or: [
          {
            MaMH: searchInfo.searchValue
          },
          {
            TenMHUnsign: { $regex: `${remakeSearchValue}`, $options: 'i' }
          }
        ]
      }
    )
    const result = [...this.removeExcess(resultMajors), ...this.removeExcess(resultRoot)]
    if(result.length){
      return result
    } else {
      throw createError.NotFound()
    }
  }
}

module.exports = new SubjectModel()