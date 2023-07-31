const bcrypt = require("bcrypt")
const { AuthFailureRequest, ErrorResponse } = require('../core/error.response')
const accessModel = require('../models/account.model')
const { createTokenPair, createKeyPair } = require("../auth/util")

class AccessService {
  async createAccount({ username, nameUser, password }) {
    const foundAccount = await accessModel.findOne({ username }).lean()
    if (foundAccount) {
      throw new AuthFailureRequest("Account is exist")
    }

    // Create Account
    const passwordHashed = await bcrypt.hash(password, 10)
    await accessModel.create({ username, nameUser, password: passwordHashed })
  }

  async login({ username, password }) {
    const foundAccount = await accessModel.findOne({ username }).lean()
    if (!foundAccount) {
      throw new AuthFailureRequest("Account not exist")
    }

    // Check password
    const isMatch = await bcrypt.compare(password, foundAccount.password)
    if (!isMatch) {
      throw new AuthFailureRequest("Account not exist")
    }

    // Store key
    const { accessKey, refreshKey } = createKeyPair()
    await accessModel.findOneAndUpdate({ username }, {accessKey, refreshKey})
    
    const payload = { name: foundAccount.nameUser, id: foundAccount.id }
    const { accessToken, refreshToken } = createTokenPair({ accessKey, refreshKey, payload })
    return { accessToken, refreshToken }
  }
}

module.exports = new AccessService()