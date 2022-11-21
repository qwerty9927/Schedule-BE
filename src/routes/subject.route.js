const express = require('express')
// const rateLimit = require('express-rate-limit')
const Subject = require('../controllers/Subject.controller')
const router = express.Router()
// const apiLimiter = rateLimit({
//   windowMs: 1000, // 1 minutes
//   max: 1,
//   message: 'Too many connection',
// })
// Search subject
router.post('/search', Subject.searchSubject)

// Get info course
router.get('/course', Subject.getInfoCourse)


module.exports = router