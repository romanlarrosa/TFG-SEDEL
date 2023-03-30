import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from '@material-tailwind/react'

const VoteCard = (props) => {
  const { voting, voteId } = props

  const optionsMap = {blankVote: "Voto en blanco", nullVote: "Voto nulo"};
  voting.candidates.forEach((candidate) => {
    optionsMap[candidate._id] = candidate.name;
  })

  const vote = voting.ballot.find((voteItem) => voteItem._id === voteId)

  return (
    <Card className='mt-24 mx-2 transition-all'>
      <CardHeader className='bg-purple-800'>
        <Typography color='white' className='text-2xl font-semibold'>
          Voto
        </Typography>
        <Typography color='white' className='text-xs -mt-1 mb-1'>
          {voting.name}
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography className='font-bold my-12 text-2xl'>
          {optionsMap[vote.vote]}
        </Typography>
      </CardBody>
      <CardFooter
        divider
        className='flex flex-col items-center justify-between gap-1 overflow-auto'
      >
        <div className='flex gap-2 items-center justify-between w-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
            />
          </svg>
          <Typography variant='small'>Votación: {`${voting._id}`}</Typography>
        </div>
        <div className='flex gap-2 items-center justify-between w-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
          <Typography variant='small'>Voto: {`${voteId}`}</Typography>
        </div>
      </CardFooter>
    </Card>
  )
}

VoteCard.propTypes = {
  voting: PropTypes.object,
  voteId: PropTypes.string
}

export default VoteCard
