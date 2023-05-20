const express = require("express")
const cors = require("cors")
const db = require("./db")
const auth = require("./auth/api")

module.exports = () => {
  const api = express.Router()

  // services
  db.init()

  // middleware
  api.use(cors())

  // routes
  api.use("/auth", auth())
  api.get("/ping", (req, res) => res.status(200).send("pong"))
  api.use("*", (req, res) => res.status(404).end("404"))

  return api
}
