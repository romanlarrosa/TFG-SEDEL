import axios from 'axios'
import * as BlindSignature from 'blind-signatures'
const API_URL = process.env.REACT_APP_CA_HOST
const KEYS_URL = process.env.REACT_APP_CA_KEYS

async function blind(candidate, votingId) {
  // Get keys
  const response = await axios.get(KEYS_URL)
  const n = response.data.n
  const e = response.data.e

  const { blinded, r } = BlindSignature.blind({
    message: candidate,
    N: n,
    E: e
  })

  // Save R
  window.localStorage.setItem(
    'blinding',
    JSON.stringify({ r: r + '', message: candidate, votingId, n, e })
  )

  // Clear signed
  window.localStorage.removeItem('signed')

  return JSON.stringify({
    voting: votingId,
    candidate: blinded + '',
    origin: window.location.origin
  })
}

async function submitForm(candidate, votingId) {
  const form = document.createElement('form')
  const input = document.createElement('input')
  input.value = await blind(candidate, votingId)
  input.name = 'vote'
  form.appendChild(input)

  form.target = '_blank'
  form.action = `${API_URL}/validate`
  form.method = 'post'
  form.style.display = 'none'

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

const validate = (candidate, votingId, navigation) => {
  submitForm(candidate, votingId)
  navigation('/confirmVoting')
}

const cleanLocalStorage = () => {
  window.localStorage.removeItem('blinding')
  window.localStorage.removeItem('signed')
  window.localStorage.removeItem('unblinded')
}

const confirmVoting = () => {
  const blinding = JSON.parse(window.localStorage.getItem('blinding'))
  axios.post(API_URL + '/confirmVoting', {
    vote: { voting: blinding.votingId }
  })
}

const validateResponse = () => {
  const blinding = JSON.parse(window.localStorage.getItem('blinding'))
  const signed = window.localStorage.getItem('signed')

  // Unblind
  const unblinded = BlindSignature.unblind({
    signed,
    N: blinding.n,
    r: blinding.r
  })

  window.localStorage.setItem('unblinded', unblinded + '')

  const result = BlindSignature.verify({
    unblinded,
    N: blinding.n,
    E: blinding.e,
    message: blinding.message
  })

  if (result) {
    console.log('La firma es correcta')
  } else {
    console.log('Hay algun error')
  }
}

const CAService = {
  validate,
  confirmVoting,
  validateResponse,
  cleanLocalStorage
}

export default CAService
