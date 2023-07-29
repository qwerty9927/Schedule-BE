const express = require('express')
const Subject = require('../controllers/Subject.controller')
const router = express.Router()

// Search subject
router.post('/search', Subject.searchSubject)

// Get info course
router.get('/course', Subject.getInfoCourse)

// Get info majors
router.get('/majors', Subject.getInfoMajors)


module.exports = router