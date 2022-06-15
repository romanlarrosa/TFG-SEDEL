import React, { useEffect, useState } from 'react'
import AuthService from 'services/auth.service'
import UserService from 'services/user.service'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar'

const UserCard = (props) => {
  const { user } = props
  const [showDelete, setShowDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      setShowDelete(currentUser.id !== user._id)
    }
  }, [user._id])

  const handleDelete = () => {
    const deleteUser = window.confirm('¿Eliminar usuario?')
    if (deleteUser) {
      UserService.deleteUserById(user._id)
        .then((response) => {
          if (response.data.ok) {
            setDeleted(true)
          } else {
            alert(response.message)
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
  return (
    !deleted && (
      <div
        className="block rounded-lg shadow-lg bg-white mx-20 w-full"
        key={user._id}
      >
        <div className="overflow-hidden rounded-t-lg sm:h-28 h-10 bg-purple-400"></div>
        <div className="w-24 h-24 -mt-12 overflow-hidden border-2 border-white rounded-full ml-8 bg-white">
          <Avatar name={user.username}></Avatar>
        </div>
        <div className="p-6 text-left">
          <h4 className="text-2xl font-semibold mb-4">{user.username}</h4>
          <hr />
          <p className="mt-4">{user.email}</p>
          {user.roles.map((role) => role.name).includes('admin') && (
            <p>Administrator</p>
          )}
          {!user.roles.map((role) => role.name).includes('admin') && (
            <p>Gestor Electoral</p>
          )}
          <div className="flex justify-end mt-3">
            {showDelete && (
              <button
                onClick={handleDelete}
                className="py-2 px-3 bg-red-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-red-300"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    )
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserCard
