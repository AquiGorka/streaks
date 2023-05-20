function Streak({ streak, canClaimToday, streakError }) {
  return (
    <>
      {streak !== 0 && <div>current streak: {streak}</div>}
      {streak === 0 && canClaimToday && <div>start claiming today</div>}
      {streakError && <div>error: try again in a few minutes</div>}
    </>
  )
}

export default Streak
