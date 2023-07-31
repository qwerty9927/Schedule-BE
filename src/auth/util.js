const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const createKeyPair = () => {
  const accessKey = crypto.randomBytes(64).toString("hex")
  const refreshKey = crypto.randomBytes(64).toString("hex")
  return { accessKey, refreshKey }
}

const createTokenPair = ({ accessKey, refreshKey, payload }) => {
  const accessToken = jwt.sign(payload, accessKey, { expiresIn: "2 days" })
  const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: "7 days" })
  return { accessToken, refreshToken }
}

module.exports = {
  createKeyPair,
  createTokenPair
}