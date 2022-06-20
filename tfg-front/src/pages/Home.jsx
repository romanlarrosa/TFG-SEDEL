import React, { useState, useEffect } from 'react'
import AuthService from 'services/auth.service'
import ControlPanel from './ControlPanel'
import ElectorHome from './ElectorHome'
const Home = () => {
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])
  return currentUser ? <ControlPanel /> : <ElectorHome />
}
export default Home
