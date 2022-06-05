import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const VotingCard = (props) => {
  const { voting } = props

  return (
    <div
      className="block rounded-lg shadow-lg bg-white mx-10 w-full"
      key={voting._id}
    >
      <div className={'overflow-hidden rounded-t-lg h-28 bg-purple-400'}></div>
      <div className="p-6 text-left">
        <h4 className="text-2xl font-semibold mb-4">{voting.name}</h4>
        <hr />
        <ul>
          <li className="mt-4">Desde: {new Date(voting.startDate).toLocaleString()}</li>
          <li className="-mt-1">Hasta: {new Date(voting.endDate).toLocaleString()}</li>
          <li className="mt-4">Sufragio: {voting.universal ? 'Universal' : 'Restringido' }</li>
        </ul>
        <div className="flex justify-end">
          <Link
              to={'/votings/edit/' + voting._id}
              className="py-2 px-3 bg-purple-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out disabled:bg-purple-300"
          >Editar</Link>
        </div>
      </div>
    </div>
  )
}

VotingCard.propTypes = {
  voting: PropTypes.object
}

export default VotingCard
