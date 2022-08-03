import React from 'react'
import PropTypes from 'prop-types'
import DonutChart from 'react-donut-chart'

const VotesGraph = ({ voting }) => {
  const optionsMap = {
    blankVote: 'Voto en blanco',
    nullVote: 'Voto nulo'
  }
  voting.candidates.forEach((candidate) => {
    optionsMap[candidate._id] = candidate.name
  })

  const votes = voting.ballot.map((vote) => optionsMap[vote.vote])

  const escrutinio = {}
  votes.forEach((vote) => {
    escrutinio[vote] = (escrutinio[vote] || 0) + 1
  })

  return (
    <DonutChart
      className='px-4'
      clickToggle = {false}
      data={Object.keys(escrutinio).map((vote) => {return {label: vote, value: escrutinio[vote]}} )}
    />
  )
}

VotesGraph.propTypes = {
  voting: PropTypes.object
}

export default VotesGraph
