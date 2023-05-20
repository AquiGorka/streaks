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

function useClaim({ uid, updateStreak, updateTotalCoins }) {
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
      setClaimed(true)

      const newCoins = coins + bonus.reduce((p, c) => p + c.coins, 0)
      updateStreak(streak)
      updateTotalCoins((total) => total + newCoins)
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

function useTotalCoins({ uid }) {
  const [totalCoins, setTotalCoins] = useState(0)

  useEffect(() => {
    if (!uid) {
      return
    }

    const run = async () => {
      try {
        const res = await fetch(`http://localhost:3000/auth/coins/${uid}`)
        const { coins } = await res.json()
        console.log({ coins })
        setTotalCoins(coins)
      } catch (err) {
        console.log("Error fetching coins:", err)
      }
    }
    run()
  }, [uid])

  return {
    totalCoins,
    updateTotalCoins: setTotalCoins,
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
  const Coins = useTotalCoins({ uid: Auth.uid })
  const Streak = useStreak({ uid: Auth.uid })
  const Claim = useClaim({
    uid: Auth.uid,
    updateStreak: Streak.updateStreak,
    updateTotalCoins: Coins.updateTotalCoins,
  })

  return { ...Auth, ...Coins, ...Streak, ...Claim }
}

function Layout({ children, isSignedIn, displayName, totalCoins }) {
  return (
    <div>
      <div>{displayName}</div>
      <div>Coins: {totalCoins}</div>
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
    // coins
    totalCoins,
  } = useApp()

  if (isLoading) {
    return (
      <Layout
        isSignedIn={isSignedIn}
        displayName={displayName}
        totalCoins={totalCoins}
      >
        <div>loading...</div>
      </Layout>
    )
  }

  return (
    <Layout
      isSignedIn={isSignedIn}
      displayName={displayName}
      totalCoins={totalCoins}
    >
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
