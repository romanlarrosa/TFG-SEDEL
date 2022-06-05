import React, { useEffect, useState } from 'react'
import VotingService from 'services/voting.service'
import ListInput from 'components/ListInput'
import PropTypes from 'prop-types'
import { isUnauth } from 'handlers/unauth'
import { useNavigate } from 'react-router-dom'

const VotingForm = ({ id }) => {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [sufragio, setSufragio] = useState('universal')
  const [endDate, setEndDate] = useState('')

  const [candidateList, setCandidateList] = useState([])
  const [electorList, setElectorList] = useState([])

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigation = useNavigate()

  // Messages
  const clearMessages = () => {
    setErrorMessage('')
    setMessage('')
  }

  // Name
  const onNameChange = (e) => {
    setName(e.target.value)
    clearMessages()
  }

  // Start Date
  const onStartDateChange = (e) => {
    console.log(e.target.value)
    setStartDate(e.target.value)
    clearMessages()
  }

  // Sufragio
  const onRolChange = (e) => {
    setSufragio(e.target.value)
    clearMessages()
  }

  // End Date
  const onEndDateChange = (e) => {
    setEndDate(e.target.value)
    clearMessages()
  }

  // Form
  const isRegisterDisabled = (!name || !startDate || !endDate || candidateList.length === 0 || (sufragio === 'restringido' && electorList.length === 0))
  const handleSubmitCreate = (e) => {
    console.log('A crear')
    e.preventDefault()
    clearMessages()
    setLoading(true)
    VotingService.createVoting(name, sufragio, startDate, endDate, candidateList, electorList)
      .then((response) => {
        setLoading(false)
        response = response.data
        if (response.ok) {
          setMessage(response.message)
          setName('')
          setSufragio('universal')
          setCandidateList([])
          setElectorList([])
          setStartDate('')
          setEndDate('')
        } else {
          setErrorMessage(response.message)
        }
      },
      (error) => {
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message || error.toString()
        setLoading(false)
        setErrorMessage(resMessage)
      })
  }

  const handleSubmitEdit = (e) => {
    console.log('A editar')
    e.preventDefault()
    clearMessages()
    setLoading(true)
    VotingService.updateVotingById(id, name, sufragio, startDate, endDate, candidateList, electorList)
      .then((response) => {
        setLoading(false)
        response = response.data
        if (response.ok) {
          setMessage(response.message)
        } else {
          setErrorMessage(response.message)
        }
      },
      (error) => {
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message || error.toString()
        setLoading(false)
        setErrorMessage(resMessage)
      })
  }

  // Editor
  if (id) {
    useEffect(() => {
      setLoading(true)
      VotingService.getVotingById(id).then(
        (response) => {
          const voting = response.data
          setLoading(false)
          setName(voting.name)
          setSufragio(voting.universal ? 'universal' : 'restringido')
          console.log(voting.startDate)
          setStartDate(new Date(voting.startDate).toISOString().slice(0, 16))
          setEndDate(new Date(voting.endDate).toISOString().slice(0, 16))
          setCandidateList(voting.candidates.map(candidate => { return candidate.name }))
          setElectorList(voting.electors.map(elector => { return elector.id }))
        },
        (error) => {
          isUnauth(error.message, navigation)
          setLoading(false)
          const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
          setMessage(_content)
        })
    }, [id])
  }

  return <section className=" mt-32 h-full w-screen">
    <div className="px-6 h-full text-gray-800 w-screen">
      <div className="flex flex-col justify-center align-middle items-center content-center flex-wrap h-full g-6 gap-9">
        <h1 className=" text-5xl text-center">{id ? 'Editar votación' : 'Crear votación'}</h1>
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form
            onSubmit={id ? handleSubmitEdit : handleSubmitCreate }
            autoComplete="off"
            className="flex flex-col justify-center"
          >
            <div className="flex sm:flex-row gap-3 mb-1 flex-col">
              <div className=" sm:w-1/2">
                <label htmlFor="name" className='ml-2 text-xs' >Nombre</label>
                <input
                  type="text"
                  id="name"
                  required
                  onChange={onNameChange}
                  value={name}
                  className="mb-1 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Escribe un nombre..."
                />
                <label htmlFor="startDate" className='ml-2 text-xs' >Fecha de inicio</label>
                <input
                  type="datetime-local"
                  id='startDate'
                  required
                  onChange={onStartDateChange}
                  value={startDate}
                  className="mb-1 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className=" sm:w-1/2 mb-1">
                <label htmlFor="endDate" className='ml-2 text-xs' >Sufragio</label>
                <select
                  value={sufragio}
                  onChange={onRolChange}
                  className="mb-1 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option value="universal">Universal</option>
                  <option value="restringido">Restringido</option>
                </select>
                <label htmlFor="endDate" className='ml-2 text-xs' >Fecha de finalización</label>
                <input
                  type="datetime-local"
                  id='endDate'
                  required
                  onChange={onEndDateChange}
                  value={endDate}
                  className="mb-1 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <ListInput
              label='Candidatos (Enter para confirmar)'
              id="candidatos"
              itemList={candidateList}
              setItemList={setCandidateList}
              placeholder="Introduce un candidato..."
            />

            {sufragio !== 'universal' && (<ListInput
              label='Electores (Enter para confirmar)'
              id="electores"
              itemList={electorList}
              setItemList={setElectorList}
              placeholder="Introduce un elector..."
            />)}

            {id
              ? (<button
              onClick={handleSubmitEdit}
              type="submit"
              disabled={loading || isRegisterDisabled}
              className="py-3 mt-4 bg-purple-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-purple-300"
            >
              {loading
                ? (
                  <span className="spinner-border animate-spin inline-block w-5 h-2 border-4 rounded-full"></span>
                  )
                : (
                    <span>Guardar</span>
                  )}
            </button>)
              : (<button
              onClick={handleSubmitCreate}
              type="submit"
              disabled={loading || isRegisterDisabled}
              className="py-3 mt-4 bg-purple-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-purple-300"
            >
              {loading
                ? (
                  <span className="spinner-border animate-spin inline-block w-5 h-2 border-4 rounded-full"></span>
                  )
                : (
                    <span>Crear</span>
                  )}
            </button>)}
            {errorMessage && (
              <div
                className="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mt-3 text-center"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            {message && (
              <div
                className="bg-green-100 rounded-lg py-3 px-6 text-base text-green-700 mt-3 text-center"
                role="alert"
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  </section>
}

VotingForm.propTypes = {
  id: PropTypes.string
}

export default VotingForm
