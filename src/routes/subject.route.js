const express = require('express')
const SubjectController = require('../controllers/Subject.controller')
const router = express.Router()

// Search subject
router.post('/search', SubjectController.searchSubject)

// Get info course
router.get('/course', SubjectController.getAllCourse)

// Get info majors
router.get('/majors', SubjectController.getAllMajors)

// Authentication

// Create course
router.put("/createCourse", SubjectController.createCourse)

// Create majors
router.put("/createMajors", SubjectController.createMajors)

// Create subject
router.put("/createSubject", SubjectController.createSubject)

module.exports = router