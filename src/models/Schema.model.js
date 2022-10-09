const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
  Name: { type: String, required: true },
  Subject: [
    {
      MaMH: { type: String, required: true },
      TenMH: { type: String, required: true },
      NMH: String,
      TTH: String,
      STC: Number,
      STCHP: Number,
      MaLop: String,
      SiSo: String,
      CL: String,
      TH: String,
      Thu: Array,
      TBD: Array,
      ST: Array,
      Phong: Array,
      GiangVien: Array,
      Tuan: Array,
      CS: Array
    }
  ],
})

const infoCourse = new Schema({
  School: String,
  Semester: Array
})

module.exports = { subjectSchema, infoCourse }