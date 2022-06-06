import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from 'services/auth.service'

const Login = () => {
  const navigation = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    AuthService.login(username, password).then(
      () => {
        navigation('/')
        window.location.reload()
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setLoading(false)
        setMessage(resMessage)
      }
    )
  }
  return (
    <section className="h-screen w-screen">
      <div className="px-6 h-full text-gray-800 w-screen">
        <div className="flex flex-col justify-center align-middle items-center content-center flex-wrap h-full g-6 gap-9">
          <h1 className=" text-5xl">Iniciar Sesion</h1>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center"
            >
              <input
                type="text"
                onChange={onUsernameChange}
                className="mb-6 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Nombre de usuario"
              />

              <div className="mb-6">
                <input
                  type="password"
                  onChange={onPasswordChange}
                  className="form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Contraseña"
                />
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
                className="py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                {loading
                  ? (
                  <span className="spinner-border animate-spin inline-block w-5 h-2 border-4 rounded-full"></span>
                    )
                  : (
                  <span>Login</span>
                    )}
              </button>
              {message && (
                <div
                  className="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center"
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
  )
}

export default Login
