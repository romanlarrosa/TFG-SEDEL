import axios from 'axios'
import authHeader from './auth-header'
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST
const API_URL = `${REACT_APP_API_HOST}/api/`

const getAllVotings = () => {
  return axios.get(API_URL + 'votings', { headers: authHeader() })
}

const createVoting = (name, sufragio, startDate, endDate, candidateList, electorList) => {
  const universal = sufragio === 'universal'
  const voting = {
    name,
    startDate,
    endDate,
    universal,
    electors: universal ? [] : electorList.map(elector => { return { id: elector } }),
    candidates: candidateList.map(elector => { return { name: elector } })
  }
  return axios.post(API_URL + 'votings', { ...voting }, { headers: authHeader() })
}
const VotingService = {
  getAllVotings,
  createVoting
}
export default VotingService
