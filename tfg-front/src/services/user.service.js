import axios from 'axios'
import authHeader from './auth-header'
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST
const API_URL = `${REACT_APP_API_HOST}/api/`

const getAllUsers = () => {
  return axios.get(API_URL + 'users', { headers: authHeader() })
}

const deleteUserById = (id) => {
  return axios.delete(API_URL + 'users/' + id, { headers: authHeader() })
}

const UserService = {
  getAllUsers,
  deleteUserById
}
export default UserService
