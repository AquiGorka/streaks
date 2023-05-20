const compareDesc = require("date-fns/compareDesc")
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays")
const parseISO = require("date-fns/parseISO")
const db = require("../db")

const CLAIMS = "Claims"
const BONUS = "Bonus"
const DAILY = "Daily"
const WAY_IN_THE_FUTURE = new Date("3000-01-01")

function computeCurrentStreak(dates) {
  // sort, then reduce til you find more than 1 day of difference
  const today = new Date()
  const sortedDates = [...dates].map(parseISO).sort(compareDesc)
  const { count } = sortedDates.reduce(
    (prev, curr) => {
      const diff = differenceInCalendarDays(prev.date, curr)
      if (diff > 1) {
        return { date: WAY_IN_THE_FUTURE, count: prev.count }
      }
      return { date: curr, count: prev.count + 1 }
    },
    { count: 0, date: today },
  )
  return count
}

function hasClaimedToday(claims) {
  const today = new Date()
  const exists = claims.some((claim) => {
    const date = new Date(claim.date)
    return (
      today.getYear() === date.getYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    )
  })
  return exists
}

function get(req, res) {
  const { uid } = req.params
  const claims = db.getAll(CLAIMS)
  const claimsByUser = claims.filter((claim) => claim.uid === uid)
  const streak = computeCurrentStreak(claims.map((claim) => claim.date))
  const claimedToday = hasClaimedToday(claimsByUser)
  const canClaimToday = !claimedToday
  res.json({ streak, canClaimToday })
}

function post(req, res) {
  const { uid } = req.params
  const claims = db.getAll(CLAIMS)
  const claimsByUser = claims.filter((claim) => claim.uid === uid)
  const claimedToday = hasClaimedToday(claimsByUser)

  if (claimedToday) {
    return res.status(403).send()
  }

  const date = new Date().toISOString()
  db.set(CLAIMS, [...claims, { uid, date }])
  const updatedClaims = db.getAll(CLAIMS)
  const updatedClaimsByUser = claims.filter((claim) => claim.uid === uid)
  const streak = computeCurrentStreak(updatedClaims.map((claim) => claim.date))
  const coins = db.get(DAILY)
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
