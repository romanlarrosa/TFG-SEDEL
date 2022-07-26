import React, { useEffect, useState } from 'react'
import CAService from 'services/ca.service'
import VotingService from 'services/voting.service'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from '@material-tailwind/react'
import SedelSpinner from 'components/SedelSpinner'
import { useNavigate } from 'react-router-dom'

const ConfirmVoting = () => {
  const navigator = useNavigate()
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setSigned(window.localStorage.getItem('signed'))
    }, 1000)
    if (signed) {
      CAService.validateResponse()
      setLoading(false)
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [signed])

  const handleSubmit = (e) => {
    e.preventDefault()
    VotingService.sendVote().then((response) => {
      if (response.data?.ok) {
        CAService.cleanLocalStorage()
        navigator('/successfulVoting')
      } else {
        console.log('ERROR')
      }
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    if (
      window.confirm(
        '¿Está seguro de cancelar su voto? no podrá volver a elegir a otro candidato ni participar en esta votación.'
      )
    ) {
      CAService.cleanLocalStorage()
      navigator(`/`)
    }
  }

  return (
    <Card className='mt-24 mx-2 transition-all'>
      {loading && (
        <CardBody className='flex flex-col m-auto'>
          <SedelSpinner />
        </CardBody>
      )}
      {!loading && (
        <div>
          <CardHeader className='bg-purple-800'>
            <Typography
              color='white'
              className='text-center text-2xl font-semibold p-1 text-white'
            >
              Confirmar voto
            </Typography>
          </CardHeader>
          <CardBody className='flex flex-col'>
            <Typography className='text-center'>
              El voto se ha firmado correctamente. A continuación,
              pulse el botón para confirmar el envío del voto. También
              puede decidir no votar, sin embargo; no podrá volver a
              elegir a otro candidato ni participar en esta votación.
            </Typography>
            <Button
              type='submit'
              color='purple'
              variant='gradient'
              disabled={!signed}
              onClick={handleSubmit}
              className='w-48 m-auto mt-3 disabled:opacity-40'
            >
              Confirmar Voto
            </Button>
            <Button
              type='submit'
              color='red'
              variant='gradient'
              disabled={!signed}
              onClick={handleCancel}
              className='w-48 m-auto mt-3 disabled:opacity-40'
            >
              Eliminar voto
            </Button>
          </CardBody>
        </div>
      )}
    </Card>
  )
}

export default ConfirmVoting
