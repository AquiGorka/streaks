const express = require("express")
const api = require("./api")

const PORT = 3000

// execute
module.exports = async ({ port = PORT }) => {
  // app
  const app = express()

  //api
  app.use(api())

  // listen
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
