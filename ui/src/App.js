import { useState, useEffect } from "react"

function useStreak() {
  const [isLoading, setIsLoading] = useState(true)

  return { isLoading }
}

function useClaim() {
  const [isClaiming, setIsClaiming] = useState(false)

  return { isClaiming }
}

function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [uid, setUid] = useState("user-id")
  const [displayName, setDisplayName] = useState("Name")

  return { isSignedIn, uid, displayName }
}

function useApp() {
  const Auth = useAuth()
  const Streak = useStreak()
  const Claim = useClaim()

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
    // claim
    isClaiming,
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
      <div>current streak</div>
      <div>start claiming today</div>
      <div>
        <button>claim today</button>
      </div>
      {isClaiming && <div>claiming...</div>}
      <div>error: try again in a few minutes</div>
      <div>You cannot claim nore coins today</div>
      <div>You got M coins!</div>
      <div>And a B bonus!</div>
      <div>And started a streak!</div>
    </Layout>
  )
}

export default App
