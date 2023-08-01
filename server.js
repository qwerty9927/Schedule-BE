const app = require("./src/app")
const config = require("./src/configs")

const PORT = config.APP.PORT
app.listen(config.APP.PORT || 3000, () => {
  console.log("Start server on PORT", PORT)
})