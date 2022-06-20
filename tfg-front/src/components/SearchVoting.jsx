import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from '@material-tailwind/react'

export default function SearchVoting() {
  const navigator = useNavigate()
  const [voteId, setVoteId] = useState('')

  const onVoteIdChange = (e) => {
    setVoteId(e.target.value)
  }

  const onKeyEnter = (e) => {
    if (e.key === 'Enter' && voteId) {
      navigator(`/vote/${voteId}`)
    }
  }

  return (
    <Card className='mt-24'>
      <CardHeader>
        <input
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          type='text'
          value={voteId}
          onChange={onVoteIdChange}
          onKeyDown={onKeyEnter}
          placeholder='Introduce un ID...'
          className='bg-purple-100 font-semibold text-center placeholder:text-grey-500 placeholder:font-normal focus:placeholder:text-transparent text-black rounded-xl p-2 l w-full border-2 border-transparent focus:bg-purple-200 focus:border-2 focus:outline-none transition-colors'
        />
      </CardHeader>
      <CardBody className='text-center'>
        <Link to={`/vote/${voteId}`}>
          <Button
            variant='gradient'
            color='deep-purple'
            size='md'
            className='mb-8'
          >
            Votar
          </Button>
        </Link>
        <Typography className='flex flex-col'>
          Introduce el ID de la votación en la que desees participar
        </Typography>
      </CardBody>
    </Card>
  )
}
