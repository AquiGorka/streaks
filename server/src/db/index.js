const Store = require("data-store")

let store

function init() {
  store = new Store({ path: process.cwd() + "/streaks.db.json" })
}

function getAll(collection) {}

module.exports = {
  init,
  getAll,
}
