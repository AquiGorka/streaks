import styled from "styled-components"

function Layout({ children, displayName, totalCoins, updateAuth, isLoading }) {
  const handleLogout = () => {
    updateAuth("", "", false)
  }

  return (
    <>
      <Header>
        <H3>{displayName}</H3>
        <H4>Coins: {totalCoins}</H4>
        <Logout>
          <button onClick={handleLogout}>Log out</button>
        </Logout>
      </Header>
      <Main>{isLoading ? "Loading..." : children}</Main>
    </>
  )
}

const Header = styled.header`
  background: #eee;
  padding: 8px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto auto 1fr;
  align-items: center;
`

const Logout = styled.div`
  text-align: right;
`

const H3 = styled.h3`
  padding: 0;
  margin: 0;
`

const H4 = styled.h3`
  padding: 0;
  margin: 0;
`

const Main = styled.main`
  padding: 12px 0;
`

export default Layout
