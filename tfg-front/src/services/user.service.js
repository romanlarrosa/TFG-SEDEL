import axios from 'axios'
import authHeader from './auth-header'
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST
const TEST_API_URL = `${REACT_APP_API_HOST}/api/test/`
const API_URL = `${REACT_APP_API_HOST}/api/`
const getPublicContent = () => {
  return axios.get(TEST_API_URL + 'all')
}
const getUserBoard = () => {
  return axios.get(TEST_API_URL + 'user', { headers: authHeader() })
}
const getModeratorBoard = () => {
  return axios.get(TEST_API_URL + 'mod', { headers: authHeader() })
}
const getAdminBoard = () => {
  return axios.get(TEST_API_URL + 'admin', { headers: authHeader() })
}
const getAllUsers = () => {
  return axios.get(API_URL + 'users', { headers: authHeader() })
}
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers
}
export default UserService
