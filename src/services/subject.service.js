const courseModel = require("../models/course.model")
const majorsContructor = require("../models/majors.model")
const subjectContructor = require("../models/Subject.model")
const { prefixMajorsCollection, majorsDefault } = require("../constance")
const { NotFoundRequest, ConflictRequest, ErrorResponse } = require("../core/error.response")
const { findByKeySearch, handleSubject } = require("../repository/subject.repository")

class SubjectService {
  async createCourse({ semester }) {
    const foundCourse = await courseModel.findOne({ Semester: semester }).lean()
    if (foundCourse) {
      throw new ConflictRequest("This course is exist")
    }
    await courseModel.create({ Semester: semester })
  }

  async createMajors({ majors, semester }) {
    const majorsModel = majorsContructor(`${prefixMajorsCollection}_${semester}`).lean()
    const foundMajors = await majorsModel.findOne({ Majors: majors })
    if (foundMajors) {
      throw new ConflictRequest("This majors is exist")
    }
    await majorsModel.create({ Majors: majors })
  }

  async createSubject({ subjects, idSubject }, { semester, majors }) {
    subjects = handleSubject(subjects)
    const subjectSpecificModel = subjectContructor(`${semester}_${majors}`)
    const majorsModel = majorsContructor(`${prefixMajorsCollection}_${semester}`)

    const foundCourse = await courseModel.findOne({ Semester: semester }).lean()
    const foundMajors = await majorsModel.findOne({ Majors: majors }).lean()
    if(!foundCourse || !foundMajors) {
      throw new ErrorResponse("Semester and majors are not exist")
    }

    const foundSubjects = await subjectSpecificModel.findOne({ MaMH: idSubject }).lean()
    if (foundSubjects) {
      throw new ConflictRequest("This subject is exist")
    }
    await subjectSpecificModel.insertMany(subjects)
  }

  async getAllCourse() {
    const foundAllCourse = await courseModel.find().select({ __v: 0, _id: 0 }).lean()
    return foundAllCourse
  }

  async getAllMajors({ semester }) {
    // Check is exist semester
    const foundCourse = await courseModel.findOne({ Semester: semester }).lean()
    if (!foundCourse) {
      throw new NotFoundRequest("Not found semester")
    }

    // Get majors from semester
    const majorsModel = majorsContructor(`${prefixMajorsCollection}_${semester}`)
    const foundAllMajors = await majorsModel.find().select({ __v: 0, _id: 0 }).lean()
    return foundAllMajors
  }

  async findSubject({ keySearch, semester, majors }) {
    const majorsModel = majorsContructor(`${prefixMajorsCollection}_${semester}`)
    const foundCourse = await courseModel.findOne({ Semester: semester })
    if(!foundCourse) {
      throw new NotFoundRequest()
    }
    const foundMajors = await majorsModel.findOne({ Majors: majors })
    if(!foundMajors) {
      throw new NotFoundRequest()
    }
    const subjectSpecificModel = subjectContructor(`${semester}_${majors}`)
    const subjectDefaultModel = subjectContructor(`${semester}_${majorsDefault}`)
    const foundSubjectSpecific = await findByKeySearch(subjectSpecificModel, keySearch)
    const foundSubjectDefault = await findByKeySearch(subjectDefaultModel, keySearch)
    const result = foundSubjectSpecific.concat(foundSubjectDefault)
    if(result.length === 0){
      throw new NotFoundRequest()
    }
    return result
  }
}

module.exports = new SubjectService()