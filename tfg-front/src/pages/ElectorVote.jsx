import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VotingService from 'services/voting.service'
import CAService from 'services/ca.service'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Radio
} from '@material-tailwind/react'
import SedelSpinner from 'components/SedelSpinner'

const ElectorVote = () => {
  const { id: paramId } = useParams()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [candidateList, setCandidateList] = useState([])
  const [candidateSelected, setCandidateSelected] = useState('')

  const navigation = useNavigate()

  const handlePapeletaChange = (e) => {
    setCandidateSelected(e.target.id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      window.confirm(
        '¿Está seguro de firmar su voto? Quedará registrado en el sistema y no podrá cambiar su votación una vez firmada.'
      )
    ) {
      CAService.validate(candidateSelected, paramId, navigation)
    }
  }

  useEffect(() => {
    VotingService.getVotingById(paramId)
      .then((response) => {
        const voting = response.data
        setLoading(false)
        setName(voting.name)
        setStartDate(
          new Date(voting.startDate)
            .toISOString()
            .slice(0, 16)
            .replace('T', ', ')
        )
        setEndDate(
          new Date(voting.endDate)
            .toISOString()
            .slice(0, 16)
            .replace('T', ', ')
        )
        setCandidateList(voting.candidates)
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setErrorMessage(
            'Ha ocurrido algún error. Compruebe el ID y vuelva a intentarlo'
          )
        } else {
          console.log(error)
        }
      })
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [paramId])

  return (
    <Card className='mt-24 mx-2 transition-all'>
      {loading ? (
        <CardBody className='flex flex-col m-auto'>
          <SedelSpinner />
        </CardBody>
      ) : (
        errorMessage && (
          <div
            className='bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center'
            role='alert'
          >
            {errorMessage}
          </div>
        )
      )}
      {!loading && !errorMessage && (
        <div>
          <CardHeader className='bg-purple-800'>
            <Typography
              color='white'
              className='text-center text-2xl font-semibold p-1 text-white'
            >
              {name}
            </Typography>
          </CardHeader>
          <CardBody>
            <form
              className='flex flex-col'
              onChange={handlePapeletaChange}
              onSubmit={handleSubmit}
            >
              {candidateList.map((candidate) => (
                <Radio
                  id={candidate._id}
                  key={candidate._id}
                  label={candidate.name}
                  name='candidate'
                  color='purple'
                />
              ))}
              <Radio
                id='blankVote'
                label='Votar en blanco'
                name='candidate'
                color='purple'
              />
              <Radio
                id='nullVote'
                label='Votar nulo'
                name='candidate'
                color='purple'
              />
              <Button
                type='submit'
                color='purple'
                disabled={!candidateSelected}
                variant='gradient'
                className='w-40 m-auto mt-3 disabled:opacity-40'
              >
                Firmar Voto
              </Button>
            </form>
          </CardBody>
          <CardFooter
            divider
            className='flex items-center justify-between gap-1'
          >
            <div className='flex gap-2 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <Typography variant='small'>{`${startDate}`}</Typography>
            </div>
            <div className='flex gap-2 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
              <Typography variant='small'>{`${endDate}`}</Typography>
            </div>
          </CardFooter>
        </div>
      )}
    </Card>
  )
}

export default ElectorVote
