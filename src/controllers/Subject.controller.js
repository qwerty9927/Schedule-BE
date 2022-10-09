const createError = require('http-errors')
const SubjectModel = require('../models/Subject.model')

class Subject {

  async getInfoCourse(req, res, next) {
    const { school } = req.query
    console.log(school)
    try {
      const result = await SubjectModel.getInfoCourse((school || "").toLowerCase())
      res.status(200).json({
        status: 200,
        result
      })
    } catch (err) {
      next(err)
    }
  }

  async searchSubject(req, res, next) {
    const { searchValue, school, schoolYear } = req.query
    if (searchValue && school && schoolYear) {
      try {
        const result = await SubjectModel.searchSubject({ searchValue }, { school, schoolYear })
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