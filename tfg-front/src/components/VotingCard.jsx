import React, { useState } from 'react'
import PropTypes from 'prop-types'
import VotingService from 'services/voting.service'
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import SedelSpinner from './SedelSpinner'

const VotingCard = (props) => {
  const { voting, editMode } = props
  console.log("viewMode: ", editMode)
  const [deleted, setDeleted] = useState(false)
  const [isEscrutined, setIsEscrutined] = useState(voting.escrutined)
  const [loadingEscrutinio, setLoadingEscrutinio] = useState(false)
  const navigator = useNavigate()

  const hasStarted = () => {
    return new Date(voting.startDate).getTime() < new Date().getTime()
  }

  const hasEnded = () => {
    return new Date(voting.endDate).getTime() < new Date().getTime()
  }

  const handleCalcularEscrutinio = () => {
    setLoadingEscrutinio(true)
    VotingService.calcularEscrutinio(voting._id).then(
      (response) => {
        if (response.data.ok) {
          console.log('Is escrutined')
          setIsEscrutined(true)
          setLoadingEscrutinio(false)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const handleVerResultados = () => {
    navigator(`/votings/${voting._id}/view`)
  }

  const handleDelete = () => {
    if (window.confirm('¿Eliminar votación?')) {
      VotingService.deleteVotingById(voting._id)
        .then(({ data }) => {
          data.ok && setDeleted(true)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }

  const getStatus = () => {
    if (hasEnded()) {
      if (!isEscrutined) {
        return 'Finalizada. Pendiente de los resultados'
      }
      return 'Finalizada. Resultados publicados'
    }
    if (hasStarted()) {
      return 'En curso'
    }
    return 'Pendiente'
  }

  return (
    !deleted && (
      <div
        className='block rounded-lg shadow-lg bg-white mx-10 w-full'
        key={voting._id}
      >
        <div className='overflow-hidden rounded-t-lg sm:h-28 h-10 bg-purple-400'></div>
        <div className='p-6 text-left'>
          <h4 className='text-2xl font-semibold'>{voting.name}</h4>
          <Typography className='mb-4'>
            Estado: {getStatus()}
          </Typography>
          <hr />
          <ul>
            <li className='mt-4'>
              Desde: {new Date(voting.startDate).toLocaleString()}
            </li>
            <li className='-mt-1'>
              Hasta: {new Date(voting.endDate).toLocaleString()}
            </li>
            <li className='mt-4'>
              Sufragio:{' '}
              {voting.universal ? 'Universal' : 'Restringido'}
            </li>
            <li className='mt-4'>ID: {voting._id}</li>
          </ul>
          { editMode && <div className='flex flex-row-reverse gap-3'>
            {!hasStarted() && (
              <>
                <Link
                  to={'/votings/edit/' + voting._id}
                  className='py-2 px-3 bg-purple-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-purple-300'
                >
                  Editar
                </Link>
                <button
                  onClick={handleDelete}
                  className='py-2 px-3 bg-red-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-red-300'
                >
                  Eliminar
                </button>
              </>
            )}
            {hasEnded() && !isEscrutined && (
              <>
                <button
                  onClick={handleCalcularEscrutinio}
                  className='py-2 px-3 bg-purple-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition-all duration-150 ease-in-out disabled:bg-purple-300'
                >
                  {loadingEscrutinio ? (
                    <SedelSpinner color='white'></SedelSpinner>
                  ) : (
                    'Calcular escrutinio'
                  )}
                </button>
              </>
            )}
            {hasEnded() && isEscrutined && (
              <>
                <button
                  onClick={handleVerResultados}
                  className='py-2 px-3 bg-purple-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-purple-300'
                >
                  Ver resultados
                </button>
              </>
            )}
          </div>}
        </div>
      </div>
    )
  )
}

VotingCard.propTypes = {
  voting: PropTypes.object,
  editMode: PropTypes.bool,
}

export default VotingCard
