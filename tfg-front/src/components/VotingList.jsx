import React, { useState, useEffect } from 'react'
import VotingService from '../services/voting.service'
import { useNavigate, Link } from 'react-router-dom'
import { isUnauth } from 'handlers/unauth'
import SedelSpinner from './SedelSpinner'
import VotingCard from './VotingCard'

const VotingList = () => {
  const [votings, setVotings] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()
  useEffect(() => {
    setLoading(true)
    VotingService.getAllVotings().then(
      (response) => {
        setVotings(response.data)
        setLoading(false)
      },
      (error) => {
        isUnauth(error.message, navigation)
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        setMessage(_content)
      }
    )
  }, [])
  return (
    <div className='flex flex-col justify-center'>
      {message && (
        <div
          className='bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center'
          role='alert'
        >
          {message}
        </div>
      )}
      <div className='flex flex-row flex-wrap justify-center align-top p-20 pt-10 gap-6 text-center w-full'>
        <div className='flex flex-col gap-12 items-center'>
          <Link
            to={'votings/new'}
            className='py-2 self-end px-4 text-sm font-medium rounded-lg border-2 border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-purple-900 focus:text-white'
          >
            Nueva Votación
          </Link>
          {loading && <SedelSpinner />}
        </div>
        {!loading &&
          votings.map((voting) => (
            <VotingCard key={voting._id} voting={voting} />
          ))}
      </div>
    </div>
  )
}
export default VotingList
