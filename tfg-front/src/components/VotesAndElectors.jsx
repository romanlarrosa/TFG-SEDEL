import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionBody,
  AccordionHeader
} from '@material-tailwind/react'

const VotesAndElectors = ({ voting }) => {
  const [open, setOpen] = useState(0)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const optionsMap = {blankVote: "Voto en blanco", nullVote: "Voto nulo"};
  voting.candidates.forEach((candidate) => {
    optionsMap[candidate._id] = candidate.name;
  })

  return (
    <div
      className='block rounded-lg shadow-lg bg-white mx-10 w-full'
      key={voting._id}
    >
      <div className='overflow-hidden rounded-t-lg h-10 bg-purple-400'></div>
      <div className='p-6 text-left'>
        <h3 className='text-2xl font-semibold mb-4'>
          Participación y votos
        </h3>
        <hr />
        <div className='p-3'>
          <Accordion
            open={open === 1}
            onClick={() => handleOpen(1)}
          >
            <AccordionHeader>
              Electores ({voting.voted.length})
            </AccordionHeader>
            <AccordionBody>
              {voting.voted.map(elector => <li key={elector._id}>{elector.id}</li>)}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} onClick={() => handleOpen(2)}>
            <AccordionHeader>
              Papeletas ({voting.ballot.length})
            </AccordionHeader>
            <AccordionBody>
              {voting.ballot.map((vote) => <li key={vote._id}>{optionsMap[vote.vote]}</li>)}
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

VotesAndElectors.propTypes = {
  voting: PropTypes.object
}
export default VotesAndElectors
