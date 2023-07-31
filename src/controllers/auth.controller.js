const { CreatedResponse, SuccessResponse } = require("../core/success.response")
const AccountService = require("../services/auth.service")
const { verifyInput } = require("../utils")

class AccountController {
  
  async createAccount(req, res, next) {
    try {
      await AccountService.createAccount(verifyInput(req.body))
      new CreatedResponse({
        message: "Create account success"
      }).send({res})
    } catch(error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      new SuccessResponse({
        message: "Login success",
        metadata: await AccountService.login(verifyInput(req.body))
      }).send({res})
    } catch(error) {
      next(error)
    }
  }
}

module.exports = new AccountController