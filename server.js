const app = require("./src/app")
const config = require("./src/configs")

const PORT = config.APP.PORT
app.listen(config.APP.PORT, () => {
  console.log("Start server on PORT", PORT)
})