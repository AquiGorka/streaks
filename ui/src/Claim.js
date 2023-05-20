function Claim({
  handleClaim,
  canClaimToday,
  isClaiming,
  claimed,
  claimError,
  bonus,
  coins,
  newStreak,
}) {
  return (
    <>
      <div>
        <button
          onClick={handleClaim}
          disabled={!canClaimToday || isClaiming || claimed}
        >
          claim today
        </button>
      </div>
      {isClaiming && <div>claiming...</div>}
      {claimError && <div>You cannot claim any more coins today</div>}

      {claimed && canClaimToday && (
        <>
          <div>You got {coins} coins!</div>
          {!!bonus.length && (
            <div>
              <div>And a bonus!</div>
              <ul>
                {bonus.map((item, index) => (
                  <li key={`${item.days}-${index}`}>
                    Streak of {item.days} days, Bonus:{item.coins}!
                  </li>
                ))}
              </ul>
            </div>
          )}
          {newStreak && <div>And started a streak!</div>}
        </>
      )}
    </>
  )
}

export default Claim
