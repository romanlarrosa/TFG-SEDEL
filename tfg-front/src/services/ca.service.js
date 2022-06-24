import axios from 'axios'
import * as BlindSignature from 'blind-signatures'
const API_URL = process.env.REACT_APP_CA_HOST

async function blind(candidate, votingId) {
  // Get keys
  const response = await axios.get(API_URL + '/keys')
    const n = response.data.n
    const e = response.data.e

    const { blinded, r } = BlindSignature.blind({
      message: candidate,
      N: n,
      E: e
    })

    // Save R
    localStorage.setItem('r', r + '')

    return JSON.stringify({
      voting: votingId,
      candidate: blinded + ''
    })
}

async function submitForm(candidate, votingId) {
  const form = document.createElement('form')
  const input = document.createElement('input')
  input.value = await blind(candidate, votingId)
  input.name = 'vote'
  form.appendChild(input)

  form.target = '_blank'
  form.action = `${API_URL}/test/validate`
  form.method = 'post'
  console.log(form)
  document.body.appendChild(form)
  form.submit()
}

const validate = (candidate, votingId, navigation) => {
  submitForm(candidate, votingId)
  navigation('/confirmVoting')
}

const CAService = {
  validate
}

export default CAService
