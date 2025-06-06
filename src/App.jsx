import React, { useState } from 'react'
import Login from './components/Login'
import Room from './components/Room'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {loggedIn ? <Room /> : <Login onLogin={() => setLoggedIn(true)} />}
    </>
  )
}
