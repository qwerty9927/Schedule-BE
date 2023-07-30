const { convertDayToNumber, convertStringToNumber, createCodeCS, removeAccents } = require("../utils")

const findByKeySearch = async (model, keySearch) => {
  const regexSearch = new RegExp(keySearch)
  const foundAllSubject = await model.find({
    $text: { $search: regexSearch }
  })
  // .sort({ score: { $meta: "textScore" }, MaMH: 1 })
  .sort({MaMH: 1, NMH: 1})
  .select({_id: 0, __v: 0, TenMHUnsign: 0})
  .lean()
  return foundAllSubject
}

const handleSubject = (subjects) => {
  return subjects.map(subject => {
    subject.Thu = convertDayToNumber(subject.Thu)
    subject.TBD = convertStringToNumber(subject.TBD)
    subject.ST = convertStringToNumber(subject.ST)
    subject.CS = createCodeCS(subject.Phong)
    subject.TenMHUnsign = removeAccents(subject.TenMH)
    return subject
  })
}

module.exports = {
  findByKeySearch,
  handleSubject
}