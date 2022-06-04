import React, { useState, useEffect } from 'react'
import UserService from '../services/user.service'
import UserCard from 'components/UserCard'
import { useNavigate } from 'react-router-dom'
import { isUnauth } from 'handlers/unauth'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()
  useEffect(() => {
    setLoading(true)
    UserService.getAllUsers().then(
      (response) => {
        console.log({ response })
        setUsers(response.data)
        setLoading(false)
      },
      (error) => {
        isUnauth(error.message, navigation)
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
    <div className="flex flex-col justify-center">
      {message && (
        <div
          className="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center"
          role="alert"
        >
          {message}
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center align-top p-20 pt-10 gap-6 text-center w-full">
        {loading && (
          <span className="spinner-border text-black animate-spin inline-block w-5 h-2 border-4 rounded-full border-purple-800"></span>
        )}
        {!loading &&
          users.map((user) => <UserCard key={user._id} user={user}></UserCard>)}
      </div>
    </div>
  )
}
export default UserList
