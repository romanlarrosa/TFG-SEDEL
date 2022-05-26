import React, { useState, useEffect } from 'react'
import UserService from '../services/user.service'
const Home = () => {
  const [content, setContent] = useState('')
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        setContent(_content)
      }
    )
  }, [])
  return (
    <div className="flex justify-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <p className="text-gray-700 text-base mb-4">{content}</p>
      </div>
    </div>
  )
}
export default Home
