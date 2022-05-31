import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar'

const UserCard = (props) => {
  const { user } = props
  return (
    <div
      className="block rounded-lg shadow-lg bg-white mx-20 w-full"
      key={user._id}
    >
      <div className="overflow-hidden rounded-t-lg h-28 bg-purple-400"></div>
      <div className="w-24 h-24 -mt-12 overflow-hidden border-2 border-white rounded-full ml-8 bg-white">
        <Avatar name={user.username}></Avatar>
      </div>
      <div className="p-6 px-12 text-left">
        <h4 className="text-2xl font-semibold mb-4">{user.username}</h4>
        <hr />
        <p className="mt-4">{user.email}</p>
        {user.roles.map((role) => role.name).includes('admin') && (<p >Administrator</p>)}
        {!user.roles.map((role) => role.name).includes('admin') && (<p >Gestor Electoral</p>)}
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserCard
