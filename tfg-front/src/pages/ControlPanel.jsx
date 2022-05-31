import UserList from 'components/UserList'
import React, { useState, useEffect } from 'react'
import AuthService from 'services/auth.service'

const ControlPanel = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [showVotaciones, setShowVotaciones] = useState(true)

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(
        user.roles.includes('ROLE_MODERATOR') &&
          !user.roles.includes('ROLE_ADMIN')
      )
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])
  const getButtonColours = (active) => {
    if (active) {
      return ' text-white bg-purple-900'
    }
    return ' text-purple-900 bg-transparent'
  }
  return (
    <>
      {showAdminBoard && (
        <div>
          <div
            className=" mt-10 inline-flex rounded-md w-full justify-center"
            role="group"
          >
            <button
              type="button"
              onClick={() => setShowVotaciones(true)}
              className={
                'py-2 px-4 -mr-0.5 text-sm font-medium rounded-l-lg border-2 border-purple-900 hover:bg-purple-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-purple-900 focus:text-white' +
                getButtonColours(showVotaciones)
              }
            >
              Votaciones
            </button>
            <button
              type="button"
              onClick={() => setShowVotaciones(false)}
              className={
                'py-2 px-4 text-sm font-medium rounded-r-md border-2 border-purple-900 hover:bg-purple-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-purple-900 focus:text-white' +
                getButtonColours(!showVotaciones)
              }
            >
              Usuarios
            </button>
          </div>
          {showVotaciones && <UserList />}
        </div>
      )}
    </>
  )
}

export default ControlPanel
