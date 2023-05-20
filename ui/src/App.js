import { useState, useEffect } from "react"

function useStreak({ uid }) {
  const [isLoading, setIsLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [canClaimToday, setCanClaimToday] = useState(false)
  const [streakError, setStreakError] = useState(false)

  useEffect(() => {
    if (!uid) {
      return
    }

    const run = async () => {
      try {
        const res = await fetch(`http://localhost:3000/auth/streaks/${uid}`)
        const { streak, canClaimToday } = await res.json()
        setCanClaimToday(canClaimToday)
        setStreak(streak)
      } catch (err) {
        console.log("Error fetching streak:", err)
        setStreakError(true)
      }

      setIsLoading(false)
    }
    run()
  }, [uid])

  return {
    isLoading,
    canClaimToday,
    streak,
    streakError,
    updateStreak: setStreak,
  }
}

function useClaim({ uid, updateStreak }) {
  const [claimed, setClaimed] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [coins, setCoins] = useState(0)
  const [bonus, setBonus] = useState([])
  const [claimError, setClaimError] = useState(false)
  const [newStreak, setNewStreak] = useState(false)

  const handleClaim = async () => {
    if (!uid) {
      return
    }

    try {
      setIsClaiming(true)
      const res = await fetch(`http://localhost:3000/auth/streaks/${uid}`, {
        method: "POST",
      })
      const { streak, coins, bonus } = await res.json()
      setCoins(coins)
      setBonus(bonus)
      setNewStreak(streak === 1)
      updateStreak(streak)
      setClaimed(true)
    } catch (err) {
      console.log("Error claiming:", err)
      setClaimError(true)
    }
    setIsClaiming(false)
  }

  return {
    isClaiming,
    coins,
    bonus,
    claimError,
    handleClaim,
    newStreak,
    claimed,
  }
}

function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [uid, setUid] = useState("user-id")
  const [displayName, setDisplayName] = useState("Name")

  return { isSignedIn, uid, displayName }
}

function useApp() {
  const Auth = useAuth()
  const Streak = useStreak({ uid: Auth.uid })
  const Claim = useClaim({ uid: Auth.uid, updateStreak: Streak.updateStreak })

  return { ...Auth, ...Streak, ...Claim }
}

function Layout({ children, isSignedIn, displayName }) {
  return (
    <div>
      <div>{displayName}</div>
      <div>{children}</div>
    </div>
  )
}

function App() {
  const {
    // auth
    isSignedIn,
    displayName,
    // streak
    isLoading,
    canClaimToday,
    streak,
    streakError,
    // claim
    isClaiming,
    claimError,
    coins,
    bonus,
    handleClaim,
    newStreak,
    claimed,
  } = useApp()

  if (isLoading) {
    return (
      <Layout isSignedIn={isSignedIn} displayName={displayName}>
        <div>loading...</div>
      </Layout>
    )
  }

  return (
    <Layout isSignedIn={isSignedIn} displayName={displayName}>
      {streak !== 0 && <div>current streak: {streak}</div>}
      {streak === 0 && canClaimToday && <div>start claiming today</div>}
      {streakError && <div>error: try again in a few minutes</div>}

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
    </Layout>
  )
}

export default App
