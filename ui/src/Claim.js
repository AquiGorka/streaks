import styled from "styled-components"

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
    <Wrap>
      <div>
        <button
          onClick={handleClaim}
          disabled={!canClaimToday || isClaiming || claimed}
        >
          {!canClaimToday || claimed
            ? "Come back tomorrow"
            : "Claim your coins!"}
        </button>
      </div>
      {isClaiming && <div>Claiming...</div>}
      {claimError && <div>You cannot claim any more coins today</div>}

      {claimed && canClaimToday && (
        <>
          <div>You got {coins} coin(s)!</div>
          {!!bonus.length && (
            <div>
              <div>Bonus</div>
              <Ul>
                {bonus.map((item, index) => (
                  <li key={`${item.days}-${index}`}>
                    Streak of {item.days} days, {item.coins} more coin(s)!
                  </li>
                ))}
              </Ul>
            </div>
          )}
          {newStreak && <div>And started a streak!</div>}
        </>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  font-size: 20px;
  padding: 8px 0;
  display: grid;
  grid-gap: 8px;
`

const Ul = styled.ul`
  margin: 0;
`

export default Claim
