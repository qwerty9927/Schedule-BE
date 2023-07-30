
const findByKeySearch = async (model, keySearch) => {
  const regexSearch = new RegExp(keySearch)
  const foundAllSubject = await model.find({
    $text: { $search: regexSearch }
  })
  .sort({ score: { $meta: "textScore" } })
  .select({_id: 0, __v: 0, TenMHUnsign: 0})
  .lean()
  return foundAllSubject
}

module.exports = {
  findByKeySearch
}