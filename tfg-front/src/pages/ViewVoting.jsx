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
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
          setMessage(_content)
        }
      )
    }
  }, [id, navigation])

  return loading ? (
    <SedelSpinner></SedelSpinner>
  ) : (
    <div className='flex flex-row flex-wrap justify-center align-top p-2 sm:p-20 sm:pt-10 pt-10 gap-6 text-center w-full'>
      <VotingCard voting={voting}></VotingCard>
      {hasEnded() && voting.escrutined && (
        <>
          <VotesAndElectors voting={voting}></VotesAndElectors>
          <VotesGraph voting={voting}></VotesGraph>
        </>
      )}
    </div>
  )
}

export default ViewVoting
