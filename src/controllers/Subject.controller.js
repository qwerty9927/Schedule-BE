const createError = require('http-errors')
const SubjectModel = require('../models/Subject.model')
const SubjectService = require("../services/subject.service")
const { SuccessResponse } = require('../core/success.response')
class Subject {

  async createCourse(req, res, next) {
    try {
      new SuccessResponse({
        message: "Create course success",
        metadata: await SubjectService.createCourse(req.body)
      }).send({ res })
    } catch (err) {
      next(err)
    }
  }

  async createMajors(req, res, next) {
    try {
      new SuccessResponse({
        message: "Create majors success",
        metadata: await SubjectService.createMajors(req.body)
      }).send({ res })
    } catch (err) {
      next(err)
    }
  }

  async createSubject(req, res, next) {
    try {
      const { semester, majors } = req.query
      console.log(req.body)
      new SuccessResponse({
        message: "Create subject success",
        metadata: await SubjectService.createSubject(req.body, semester, majors)
      }).send({ res })
    } catch (err) {
      next(err)
    }
  }

  async getAllCourse(req, res, next) {
    try {
      new SuccessResponse({
        message: "Get course success",
        metadata: await SubjectService.getAllCourse()
      }).send({ res })
    } catch (err) {
      next(err)
    }
  }

  async getAllMajors(req, res, next) {
    try {
      new SuccessResponse({
        message: "Get majors success",
        metadata: await SubjectService.getAllMajors(req.query)
      }).send({ res })
    } catch (err) {
      next(err)
    }
  }

  async searchSubject(req, res, next) {
    try {
      new SuccessResponse({
        message: "Search subject success",
        metadata: await SubjectService.findSubject(req.body)
      }).send({ res })
    } catch (err) {
      next(err)
    }
  }
}


module.exports = new Subject()