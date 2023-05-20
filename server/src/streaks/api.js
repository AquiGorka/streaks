const express = require("express")
const handler = require("./handler")

module.exports = () => {
  const api = express.Router()

  // routes
  api.get("/", handler.get)
  api.post("/", handler.post)

  return api
}