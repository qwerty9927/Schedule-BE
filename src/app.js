require("dotenv").config()
const express = require('express')
const helmet = require("helmet")
const morgan = require("morgan")
const corsConfig = require('./configs/cors.config')
const Connection = require("./db/connect")
const app = express()

// MiddleWare
app.use(helmet())
app.use(corsConfig())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Database
Connection.connect()

// Route
if(process.env.NODE_ENV === "dev"){
  app.get("/", (req, res, next) => res.send("Hello world"))
  app.get("/modelTest/:case", require("./test/modelTest"))
}
app.use("/api/auth", require("./routes/auth.route"))
app.use('/api/subject', require('./routes/subject.route'))

// Handle error
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.statusCode = 404
  next(error)
})

app.use((error, req, res, next) => {
  if(process.env.NODE_ENV === "dev"){
    console.log(error)
  }

  const statusCode = error.statusCode || 500
  const code = error.code || statusCode
  const message = error.message || "Internal Server Error"
  res.status(statusCode).json({
    code,
    status: "Error",
    message
  })
})

module.exports = app