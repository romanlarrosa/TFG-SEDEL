import axios from 'axios'
import authHeader from './auth-header'
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST
const API_URL = `${REACT_APP_API_HOST}/api/`

const buildVoting = (name, sufragio, startDate, endDate, candidateList, electorList) => {
  const universal = sufragio === 'universal'
  return {
    name,
    startDate,
    endDate,
    universal,
    electors: universal ? [] : electorList.map(elector => { return { id: elector } }),
    candidates: candidateList.map(elector => { return { name: elector } })
  }
}

const getAllVotings = () => {
  return axios.get(API_URL + 'votings', { headers: authHeader() })
}

const createVoting = (name, sufragio, startDate, endDate, candidateList, electorList) => {
  const voting = buildVoting(name, sufragio, startDate, endDate, candidateList, electorList)
  return axios.post(API_URL + 'votings', { ...voting }, { headers: authHeader() })
}

const getVotingById = (id) => {
  return axios.get(API_URL + 'votings/' + id, { headers: authHeader() })
}

const updateVotingById = (id, name, sufragio, startDate, endDate, candidateList, electorList) => {
  const voting = buildVoting(name, sufragio, startDate, endDate, candidateList, electorList)
  return axios.put(API_URL + 'votings/' + id, { ...voting }, { headers: authHeader() })
}

const deleteVotingById = (id) => {
  return axios.delete(API_URL + 'votings/' + id, { headers: authHeader() })
}

const VotingService = {
  getAllVotings,
  createVoting,
  getVotingById,
  updateVotingById,
  deleteVotingById
}
export default VotingService
