const express = require("express")


module.exports = () => {
  const api = express.Router()

  // routes
  api.get("/ping", (req, res) => res.status(200).send("pong"))
  api.use("*", (req, res) => res.status(404).end("404"))

  return api
}
