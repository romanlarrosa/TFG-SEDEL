import React from 'react'
import PropTypes from 'prop-types'

const VotingCard = (props) => {
  const { voting } = props

  return (
    <div
      className="block rounded-lg shadow-lg bg-white mx-20 w-full"
      key={voting._id}
    >
      <div className={'overflow-hidden rounded-t-lg h-28 bg-purple-400'}></div>
      <div className="p-6 px-12 text-left">
        <h4 className="text-2xl font-semibold mb-4">{voting.name}</h4>
        <hr />
        <ul>
          <li className="mt-4">Desde: {new Date(voting.startDate).toLocaleString()}</li>
          <li className="-mt-1">Hasta: {new Date(voting.endDate).toLocaleString()}</li>
          <li className="mt-4">Sufragio: {voting.universal ? 'Universal' : 'Restringido' }</li>
        </ul>
      </div>
    </div>
  )
}

VotingCard.propTypes = {
  voting: PropTypes.object
}

export default VotingCard
