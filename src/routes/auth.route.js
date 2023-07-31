const express = require('express')
const AccountController = require('../controllers/auth.controller')
const checkAuth = require('../auth/checkAuth')
const router = express.Router()

router.post("/login", AccountController.login)

// Authorization
router.use(checkAuth)

router.put("/createAccount", AccountController.createAccount)

module.exports = router