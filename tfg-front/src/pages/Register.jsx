import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from 'services/auth.service'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('moderator')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Messages
  const clearMessages = () => {
    setErrorMessage('')
    setMessage('')
  }

  // Username
  const onUsernameChange = (e) => {
    setUsername(e.target.value)
    clearMessages()
  }

  // Email
  const onEmailChange = (e) => {
    setEmail(e.target.value)
    clearMessages()
  }

  // Password
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    clearMessages()
  }

  // Rol
  const rolOptions = [
    { label: 'Moderador', value: 'moderator' },
    { label: 'Administrador', value: 'admin' }
  ]

  const onRolChange = (e) => {
    setRol(e.target.value)
    clearMessages()
  }

  // Form
  const isRegisterDisabled = !(username !== '' && password !== '' && email !== '')
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    AuthService.register(username, email, password, rol)
      .then((response) => {
        setLoading(false)
        response = response.data
        if (response.ok) {
          setMessage(response.message)
          setUsername('')
          setEmail('')
          setPassword('')
          setRol('moderator')
        } else {
          setErrorMessage(response.message)
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message || error.toString()
        setLoading(false)
        setErrorMessage(resMessage)
      })
  }

  return <section className=" mt-32 h-full w-screen">
  <div className="px-6 h-full text-gray-800 w-screen">
    <div className="flex flex-col justify-center align-middle items-center content-center flex-wrap h-full g-6 gap-9">
      <h1 className=" text-5xl text-center">Registrar Usuario</h1>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col justify-center"
        >
          <input
            type="text"
            required
            onChange={onUsernameChange}
            className="mb-6 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Nombre de usuario"
          />

<input
            type="email"
            required
            autoComplete="off"
            onChange={onEmailChange}
            className="mb-6 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Email"
          />

          <div className="mb-6">
            <input
              type="password"
              required
              onChange={onPasswordChange}
              className="form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Contraseña"
            />
          </div>

          <select
            value={rol}
            onChange={onRolChange}
            className="mb-6 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
          {rolOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

          <button
            onClick={handleSubmit}
            type="submit"
            disabled={loading || isRegisterDisabled}
            className="py-3 bg-purple-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-purple-300"
          >
            {loading
              ? (
              <span className="spinner-border animate-spin inline-block w-5 h-2 border-4 rounded-full"></span>
                )
              : (
              <span>Registrar</span>
                )}
          </button>
          {errorMessage && (
            <div
              className="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          {message && (
            <div
              className="bg-green-100 rounded-lg py-3 px-6 text-base text-green-700 mt-3 text-center"
              role="alert"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
</section>
}

export default Register
