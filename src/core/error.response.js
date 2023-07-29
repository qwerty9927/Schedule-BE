import { ReasonPhrases, StatusCodes } from "../utils/httpStatusCode.js"

class ErrorResponse extends Error {
  constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, code = StatusCodes.INTERNAL_SERVER_ERROR){
    super(message)
    this.statusCode = statusCode
    this.code = code
  }
}

class ForbiddenRequest extends ErrorResponse {
  constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN, code = StatusCodes.FORBIDDEN){
    super(message, statusCode, code)
  }
}

class ConflictRequest extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT, code = StatusCodes.CONFLICT){
    super(message, statusCode, code)
  }
}

class AuthFailureRequest extends ErrorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED, code = StatusCodes.UNAUTHORIZED){
    super(message, statusCode, code)
  }
}

class NotFoundRequest extends ErrorResponse {
  constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND, code = StatusCodes.NOT_FOUND) {
    super(message, statusCode, code)
  }
}

export {
  ErrorResponse,
  ForbiddenRequest,
  ConflictRequest,
  AuthFailureRequest,
  NotFoundRequest
}