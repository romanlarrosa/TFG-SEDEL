import React, { useState, useEffect } from 'react'
import AuthService from 'services/auth.service'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])
  const logOut = () => {
    AuthService.logout()
  }
  return (
    <nav className="sticky top-0 w-full flex flex-wrap items-center justify-between py-3 bg-purple-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 pr-7 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline">
          <Link
            to={'/'}
            className="text-size-200 text-xl font-bold hover:text-gray-400"
          >
            SEDEL
          </Link>
        </div>
        {currentUser
          ? (
          <ul className="navbar-nav ml-auto flex flex-row gap-4">
            <li className="nav-item">
              <Link
                to={'/perfil'}
                className="nav-link text-white opacity-80 hover:opacity-100 focus:opacity-80 p-0 hover:decoration-solid"
              >
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="/login"
                className="nav-link text-red-400 font-semibold opacity-80 hover:opacity-100 focus:opacity-80 p-0 hover:decoration-solid hover:decoration-inherit hover:underline"
                onClick={logOut}
              >
                Cerrar sesión
              </a>
            </li>
          </ul>
            )
          : (
          <div className="navbar-nav ml-auto">
            <ul>
              <li className="nav-link text-white opacity-80 hover:opacity-100 focus:opacity-80 p-0 hover:decoration-solid">
                <Link to={'/login'} className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
            )}
      </div>
    </nav>
  )
}

export default NavBar
