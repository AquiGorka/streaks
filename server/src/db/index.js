const Store = require("data-store")

let store

function init() {
  store = new Store({ path: process.cwd() + "/streaks.db.json" })
}

function getAll(collection) {
  return store.get(collection) || []
}

function get(collection) {
  return store.get(collection)
}

module.exports = {
  init,
  getAll,
  get,
}
