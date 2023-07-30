const {Schema, model} = require("mongoose")

const subjectSchema = new Schema({
  MaMH: { 
    type: String, 
    required: true 
  },
  TenMH: { 
    type: String, 
    required: true 
  },
  NMH: String,
  TTH: String,
  STC: {
    type: Number,
    required: true
  },
  STCHP: Number,
  MaLop: String,
  SiSo: String,
  CL: String,
  TH: String,
  Thu: {
    type: Array,
    default: [] 
  },
  TBD: {
    type: Array,
    default: [] 
  },
  ST: {
    type: Array,
    default: [] 
  },
  Phong: {
    type: Array,
    default: [] 
  },
  GiangVien: {
    type: Array,
    default: [] 
  },
  Tuan: {
    type: Array,
    default: [] 
  },
  CS: {
    type: Array,
    default: [] 
  },
  TenMHUnsign: {
    type: String,
    required: true
  }
})

subjectSchema.index({"MaMH": "text", "TenMH": "text", "TenMHUnsign": "text"})

const subjectContructor = (name) => {
  return model(name, subjectSchema)
}

module.exports = subjectContructor