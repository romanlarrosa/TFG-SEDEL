import React, { useState, useEffect } from 'react'
import UserService from '../services/user.service'
import UserCard from 'components/UserCard'
import { useNavigate, Link } from 'react-router-dom'
import { isUnauth } from 'handlers/unauth'
import SedelSpinner from './SedelSpinner'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()
  useEffect(() => {
    setLoading(true)
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data)
        setLoading(false)
      },
      (error) => {
        isUnauth(error.message, navigation)
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
        <div className='flex flex-col gap-12 items-center'>
          <Link
            to={'register'}
            className='py-2 self-end px-4 text-sm font-medium rounded-lg border-2 border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-purple-900 focus:text-white'
          >
            Nuevo Usuario
          </Link>
          {loading && (
            <SedelSpinner />
          )}
        </div>
        {!loading &&
          users.map((user) => <UserCard key={user._id} user={user}></UserCard>)}
      </div>
    </div>
  )
}
export default UserList
