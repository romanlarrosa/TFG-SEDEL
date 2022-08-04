import SedelSpinner from 'components/SedelSpinner'
import VotesAndElectors from 'components/VotesAndElectors'
import VotesGraph from 'components/VotesGraph'
import VotingCard from 'components/VotingCard'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VotingService from 'services/voting.service'

const ViewVoting = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(null)
  const [message, setMessage] = useState('')
  const navigation = useNavigate()

  const hasEnded = () => {
    return new Date(voting.endDate).getTime() < new Date().getTime()
  }

  useEffect(() => {
    if (id) {
      setLoading(true)
      VotingService.getVotingById(id).then(
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
        <>
          <VotingCard voting={voting}></VotingCard>
          {hasEnded() && voting.escrutined && (
            <>
              <VotesAndElectors voting={voting}></VotesAndElectors>
              <VotesGraph voting={voting}></VotesGraph>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ViewVoting
