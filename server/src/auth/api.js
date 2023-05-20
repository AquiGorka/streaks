const express = require("express")
const streaks = require("../streaks/api")
const coins = require("../coins/api")

module.exports = () => {
  const api = express.Router()

  // middleware
  // check auth token (out of scope)

  // routes
  api.use("/streaks", streaks())
  api.use("/coins", coins())

  return api
}
