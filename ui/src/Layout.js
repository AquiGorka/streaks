function Layout({ children, displayName, totalCoins, updateAuth, isLoading }) {
  const handleLogout = () => {
    updateAuth("", "", false)
  }

  if (isLoading) {
    return (
      <Layout
        displayName={displayName}
        totalCoins={totalCoins}
        updateAuth={updateAuth}
      >
        <div>loading...</div>
      </Layout>
    )
  }

  return (
    <div>
      <div>{displayName}</div>
      <div>Coins: {totalCoins}</div>
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div>{isLoading ? "Loading..." : children}</div>
    </div>
  )
}

export default Layout
