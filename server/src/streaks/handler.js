const db = require("../db")

const CLAIMS = "Claims"
const BONUS = "Bonus"
const COINS = "Coins"

function computeStreak(claims) {
  return 0
}

function hasClaimedToday(uid, claims) {
  return false
}

function get(req, res) {
  const { uid } = req.params
  const claims = db.getAll(CLAIMS)
  const claimsByUser = claims.filter((claim) => claim.uid === uid)
  const streak = computeStreak(claims)
  const claimedToday = hasClaimedToday(uid, claimsByUser)
  const canClaimToday = !claimedToday

  res.json({ streak, canClaimToday })
}

function post() {
  const { uid } = req.body
  const claims = db.getAll(CLAIMS)
  const claimsByUser = claims.filter((claim) => claim.uid === uid)
  claimedToday = claims.hasClaimedToday(uid, claimsByUser)

  if (claimedToday) {
    return res.status(403).send()
  }

  const date = new Date().toISOString()
  db.add(CLAIMS, { uid, date })
  const updatedClaims = db.getAll(CLAIMS)
  const updatedClaimsByUser = claims.filter((claim) => claim.uid === uid)
  const streak = computeStreak(updatedClaims)

  const coins = db.get(COINS)

  const allBonus = db.getAll(BONUS)
  const isThereABonus = allBonus.some((item) => streak % item.days === 0)

  if (!isThereABonus) {
    return res.json({ streak, coins, bonus: [] })
  }

  const bonus = allBonus.filter((item) => (item) => streak % item.days === 0)
  return res.send({ streak, coins, bonus })
}

module.exports = {
  get,
  post,
}
