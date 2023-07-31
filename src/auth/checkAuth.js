const { ForbiddenRequest } = require("../core/error.response")
const jwt = require('jsonwebtoken')
const accountModel = require("../models/account.model")

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]

    const clientId = req.headers["x-client-id"]
    if(!clientId || !token) throw new ForbiddenRequest() 

    // Find account
    const foundAccount = await accountModel.findOne({id: clientId}).lean()
    if(!foundAccount) throw new ForbiddenRequest()

    // Verify token
    const dataToken = jwt.verify(token, foundAccount.accessKey)
    next()
  } catch(error) {
    next(error)
  }
}

module.exports = checkAuth