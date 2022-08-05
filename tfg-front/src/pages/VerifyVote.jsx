import SedelSpinner from 'components/SedelSpinner'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VotingService from 'services/voting.service'
import VoteCard from '../components/VoteCard'

const VerifyVote = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(null)
  const [message, setMessage] = useState('')
  const navigation = useNavigate()

  useEffect(() => {
    if (id) {
      setLoading(true)
      VotingService.getVoteById(id).then(
        (response) => {
          setVoting(response.data)
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          setMessage(
            `Ha ocurrido un error (${error.response.status}). Compruebe el ID y vuelva a intentarlo`
          )
        }
      )
    }
  }, [id, navigation])

  return (
    <div className='flex flex-row flex-wrap justify-center align-top p-2 sm:p-20 sm:pt-10 pt-10 gap-6 text-center w-full'>
      {loading ? (
        <SedelSpinner></SedelSpinner>
      ) : message ? (
        <div
          className='bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center'
          role='alert'
        >
          {message}
        </div>
      ) : (
        <VoteCard voting={voting} voteId={id}></VoteCard>
      )}
    </div>
  )
}

export default VerifyVote
