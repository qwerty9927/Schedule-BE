const createError = require('http-errors')
const {convertDayToNumber, convertStringToNumber, createCodeCS, removeAccents} = require('../utils/convert')
const CrawModel = require('../models/Craw.model')

class Craw {
  async receiveData(req, res, next) {
    const data = JSON.parse(req.body.values)
    const { schoolYear } = req.query
    if (schoolYear && data) {
      const obj = data.map((item, index) => {
        return {
          MaMH: item[1],
          TenMH: item[2],
          NMH: item[3],
          TTH: item[4],
          STC: item[5],
          STCHP: item[6],
          MaLop: item[7],
          SiSo: item[8],
          CL: item[9],
          TH: item[10],
          Thu: convertDayToNumber(item[11]),
          TBD: convertStringToNumber(item[12]),
          ST: convertStringToNumber(item[13]),
          Phong: item[14],
          GiangVien: item[15],
          Tuan: item[16],
          CS: createCodeCS(item[14]),
          TenMHUnsign: removeAccents(item[2])
        }
      })
      try {
        CrawModel.receiveData(obj, { schoolYear })
        await CrawModel.createInfoCourse({ schoolYear })
        res.sendStatus(200)
      } catch (e) {
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }
}

module.exports = new Craw()