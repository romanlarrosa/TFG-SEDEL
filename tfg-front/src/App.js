import React, { useEffect, useState } from 'react'
import UserService from 'services/user.service'

function App () {
  const [content, setContent] = useState('Cargando...')
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data)
      },
      (error) => {
        const _content =
        (error.response && error.response.data) ||
          error.message ||
          error.toString()
        setContent(_content.message)
      }
    )
  }, [])

  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
      <div className="flex items-center">
        <h1 className="text-6xl font-thin tracking-wider text-center">Create React App + Tailwind CSS</h1>
      </div>
      <div className="flex items-center">
        <h2 className="text-6xl font-thin tracking-wider">{content}</h2>
      </div>
      <p className="my-6 tracking-wide">
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <div className="mt-6 flex justify-center">
        <a
          className="uppercase hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="ml-10 uppercase hover:underline"
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Tailwind
        </a>
      </div>
    </div>
  )
}

export default App
