const express = require('express')
const helmet = require("helmet");
const cors = require('cors')
const mongoose = require('mongoose')
const routerCraw = require('./src/routes/craw.route')
const routerSubject = require('./src/routes/subject.route')
require('dotenv').config()

const app = express()
global.__basedir = __dirname

app.use(helmet())
app.use(cors({
  credentials: true,
  origin: process.env.HOSTACCESS
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
	res.send('hello')
})
app.use('/api/craw', routerCraw)
app.use('/api/subject', routerSubject)
app.use((req, res, next) => {
	res.status(404).json({
		status: 404,
		meg: "NOT FOUND"
	})
})
app.use((err, req, res, next) => {
	console.log(err)
	res.status(err.status || 500).json({
		status: err.status || 500,
		meg: err.message
	})
})

mongoose.connect(process.env.URLDB, {}, (err) => {
	if (err) {
		console.log("Error database!")
		console.log(err)
	} else {
		global._mongodbConnect = mongoose.connection
		console.log("Connect mongoose success")
	}
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Listen on port " + (process.env.PORT || 3000))
})