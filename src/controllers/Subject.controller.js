const createError = require('http-errors')
const SubjectModel = require('../models/Subject.model')
class Subject {

  async getInfoCourse(req, res, next) {
    try {
      const result = await SubjectModel.getInfoCourse()
      res.status(200).json({
        status: 200,
        result
      })
    } catch (err) {
      next(err)
    }
  }

  async getInfoMajors(req, res, next) {
    const {schoolYear} = req.query
    try {
      const result = await SubjectModel.getInfoMajors(schoolYear)
      res.status(200).json({
        status: 200,
        result
      })
    } catch (err) {
      next(err)
    }
  }

  async searchSubject(req, res, next) {
    const {searchValue, schoolYear, majors} = req.body
    if (searchValue && schoolYear && majors ) {
      console.log(searchValue)
      try {
        const result = await SubjectModel.searchSubject({ searchValue }, { schoolYear, majors })
        res.status(200).json({
          status: 200,
          result
        })
      } catch (err) {
        console.log(err)
        next(err)
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }
}


module.exports = new Subject()