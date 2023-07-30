const { prefixMajorsCollection } = require("../constance")
const subjectContructor = require("../models/Subject.model")
const courseModel = require("../models/course.model")
const majorsContructor = require("../models/majors.model")
const { findByKeySearch } = require("../repository/subject.repository")

const modelTest = async (req, res, next) => {
  const myCase = parseInt(req.params.case)
  switch (myCase) {

    case 1: {
      await testMajorModel()
      break
    }

    case 2: {
      await testSubjectModel()
      break
    }

    case 3: {
      await testCreateCourse()
      break
    }

  }
  res.send("Test done")
}

const testMajorModel = async () => {
  const majors = majorsContructor(`${prefixMajorsCollection}_hk2_2022-2023`)
  const result = await majors.find()
  console.log("Majors: ", result)
}

const testSubjectModel = async () => {
  const subject = subjectContructor("hk2_2022-2023_dct")
  const subjectDefault = subjectContructor("hk2_2022-2023_monchung")

  const result = await findByKeySearch(subjectDefault, "cong")
  console.log(result)
}

const testCreateCourse = async () => {
  const foundCourse = await courseModel.findOne({Semester: "HK2_2022-2023"})
  console.log(foundCourse)
  if(!foundCourse) {
    await courseModel.create({Semester: "hk2_2022-2023"})
  }
}

module.exports = modelTest