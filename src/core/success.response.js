const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode.js")

class SuccessResponse {
  constructor({ message = ReasonPhrases.OK, statusCode = StatusCodes.OK, code = StatusCodes.OK, metadata = {} }) {
    this.statusCode = statusCode
    this.payload = {
      code,
      message,
      metadata
    }
  }

  send({ res, header = {}, cookies = {} }) {
    Object.entries(cookies).forEach(([key, value]) => {
      if(value) {
        res.cookie(key, value)
      } else {
        res.clearCookie(key)
      }
    })
    return res.status(this.statusCode).json(this.payload)
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ message = ReasonPhrases.CREATED, statusCode = StatusCodes.CREATED, code = StatusCodes.CREATED, metadata = {} }) {
    super({ message, statusCode, code, metadata })
  }
}

module.exports = { 
  SuccessResponse,
  CreatedResponse
}