import axios from 'axios'
import authHeader from './auth-header'
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST
const API_URL = `${REACT_APP_API_HOST}/api/`

const buildVoting = (
  name,
  sufragio,
  startDate,
  endDate,
  candidateList,
  electorList
) => {
  const universal = sufragio === 'universal'
  return {
    name,
    startDate,
    endDate,
    universal,
    electors: universal
      ? []
      : electorList.map((elector) => {
          return { id: elector }
        }),
    candidates: candidateList.map((elector) => {
      return { name: elector }
    })
  }
}

const getAllVotings = () => {
  return axios.get(API_URL + 'votings', { headers: authHeader() })
}

const createVoting = (
  name,
  sufragio,
  startDate,
  endDate,
  candidateList,
  electorList
) => {
  const voting = buildVoting(
    name,
    sufragio,
    startDate,
    endDate,
    candidateList,
    electorList
  )
  return axios.post(
    API_URL + 'votings',
    { ...voting },
    { headers: authHeader() }
  )
}

const getVotingById = (id) => {
  return axios.get(API_URL + 'votings/' + id, {
    headers: authHeader()
  })
}

const getVoteById = (id) => {
  return axios.get(API_URL + 'ballot/' + id)
}

const updateVotingById = (
  id,
  name,
  sufragio,
  startDate,
  endDate,
  candidateList,
  electorList
) => {
  const voting = buildVoting(
    name,
    sufragio,
    startDate,
    endDate,
    candidateList,
    electorList
  )
  return axios.put(
    API_URL + 'votings/' + id,
    { ...voting },
    { headers: authHeader() }
  )
}

const deleteVotingById = (id) => {
  return axios.delete(API_URL + 'votings/' + id, {
    headers: authHeader()
  })
}

const sendVote = () => {
  const blinding = JSON.parse(window.localStorage.getItem('blinding'))
  const unblinded = window.localStorage.getItem('unblinded')
  
  return axios.post(
    API_URL + 'votings/' + blinding.votingId + '/vote',
    { vote: blinding.message, signed: unblinded }
  )
}

const calcularEscrutinio = (id) => {
  return axios.put(API_URL + 'votings/' + id + '/escrutinio', {value: true}, { headers: authHeader() })
}

const VotingService = {
  getAllVotings,
  createVoting,
  getVotingById,
  getVoteById,
  updateVotingById,
  deleteVotingById,
  sendVote,
  calcularEscrutinio
}
export default VotingService
