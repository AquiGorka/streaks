const express = require("express")
const handler = require("./handler")

module.exports = () => {
  const api = express.Router()

  // routes
  api.get("/:uid", handler.get)
  api.post("/:uid", handler.post)

  return api
}
