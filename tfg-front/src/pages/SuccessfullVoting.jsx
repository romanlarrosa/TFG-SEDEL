import React, { useEffect, useState } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from '@material-tailwind/react'
import SedelSpinner from 'components/SedelSpinner'
import { useNavigate } from 'react-router-dom'

const SuccessfullVoting = () => {
  const navigator = useNavigate()
  const [loading, setLoading] = useState(true)
  const [identificator, setIdentificator] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setIdentificator(
        window.localStorage.getItem('voteIdentificator')
      )
    }, 1000)
    if (identificator) {
      setLoading(false)
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [identificator])

  const handleSubmit = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('voteIdentificator')
    navigator('/')
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
              El voto se ha emitido correctamente. Su identificador de
              voto es:
            </Typography>
            <Typography className='text-center font-bold'>
              {identificator}
            </Typography>
            <Typography className='text-center'>
              Puede volver al incio pulsando el botón.
            </Typography>
            <Button
              type='submit'
              color='purple'
              variant='gradient'
              onClick={handleSubmit}
              className='w-48 m-auto mt-3 disabled:opacity-40'
            >
              Inicio
            </Button>
          </CardBody>
        </div>
      )}
    </Card>
  )
}

export default SuccessfullVoting
