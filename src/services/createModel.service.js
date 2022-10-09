const mongoose = require('mongoose')

function createModel(name, Schema){
  return mongoose.model(name, Schema)
}
module.exports = createModel