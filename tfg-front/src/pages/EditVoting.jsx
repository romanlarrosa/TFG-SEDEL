import React from 'react'
import { useParams } from 'react-router-dom'
import VotingForm from './VotingForm'

const EditVoting = () => {
  const { id: paramId } = useParams()
  return (
    <VotingForm id={paramId} />
  )
}

export default EditVoting
