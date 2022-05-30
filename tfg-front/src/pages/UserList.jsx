import React, { useState, useEffect } from 'react'
import UserService from '../services/user.service'
const UserList = () => {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    UserService.getAllUsers().then(
      (response) => {
        console.log({ response })
        setUsers(response.data)
        setLoading(false)
      },
      (error) => {
        console.log({ error })
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        setMessage(_content)
      }
    )
  }, [])
  return (
    <div className="flex justify-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        {message && (
          <div
            className="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center"
            role="alert"
          >
            {message}
          </div>
        )}
        {loading && (<p>Loading..</p>)}
        {!loading && (<p>{JSON.stringify(users)}</p>)}
      </div>
    </div>
  )
}
export default UserList
