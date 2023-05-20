const db = require("../db")

const COINS = "Coins"

function get(req, res) {
  const { uid } = req.params
  const allCoins = db.getAll(COINS)
  const coins = allCoins[uid] || 0
  res.json({ coins })
}

module.exports = {
  get,
}
