import { useState } from "react"

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
    <form onSubmit={handleSubmit}>
      <div>Fake login (values will persist)</div>
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
      <button>Sign in</button>
    </form>
  )
}

export default Auth
