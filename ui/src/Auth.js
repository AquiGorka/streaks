import { useState } from "react"
import styled from "styled-components"

function Auth({ updateAuth }) {
  const [uidText, setUidText] = useState("")
  const [displayNameText, setDisplayNameText] = useState("")

  const handleChangeUidText = ({ currentTarget: { value } }) => {
    setUidText(value)
  }

  const handleChangeDisplayNameText = ({ currentTarget: { value } }) => {
    setDisplayNameText(value)
  }

  const handleSubmit = () => {
    updateAuth(uidText, displayNameText, true)
  }

  return (
    <Wrap>
      <Form onSubmit={handleSubmit}>
        <H2>Fake login (values will persist)</H2>
        <input
          value={uidText}
          onChange={handleChangeUidText}
          placeholder="User id"
          required
        />
        <input
          value={displayNameText}
          onChange={handleChangeDisplayNameText}
          placeholder="Display name"
          required
        />
        <Button>Sign in</Button>
      </Form>
    </Wrap>
  )
}

const Wrap = styled.div`
  max-width: 500px;
  margin: auto;
  margin-top: 100px;
  padding: 16px;
  border: 1px solid #ccc;
`

const Form = styled.form`
  display: grid;
  grid-gap: 16px;
`

const Button = styled.button`
  width: auto;
`

const H2 = styled.h2`
  padding: 0;
  margin: 0;
`

export default Auth
