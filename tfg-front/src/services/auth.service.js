import axios from 'axios'
const API_URL = `${process.env.REACT_APP_API_HOST}/api/auth/`

const register = (username, email, password, roles) => {
  const givenRoles = roles === 'admin' ? ['admin', 'moderator'] : ['moderator']
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
    roles: givenRoles
  })
}
const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    })
}
const logout = () => {
  localStorage.removeItem('user')
}
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
}
export default AuthService
