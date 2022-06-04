import axios from 'axios'
import authHeader from './auth-header'
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST
const API_URL = `${REACT_APP_API_HOST}/api/`

const getAllVotings = () => {
  return axios.get(API_URL + 'votings', { headers: authHeader() })
}
const VotingService = {
  getAllVotings
}
export default VotingService
