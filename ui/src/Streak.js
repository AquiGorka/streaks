import styled from "styled-components"

function Streak({ streak, canClaimToday, streakError }) {
  return (
    <Wrap>
      {streak === 0 && canClaimToday && <div>Start claiming today</div>}
      {streak !== 0 && <div>Current streak: {streak}</div>}
      {streakError && (
        <div>An error happened, please try again in a few minutes</div>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  font-size: 20px;
  padding: 8px 0;
`

export default Streak
