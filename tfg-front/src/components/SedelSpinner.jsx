import React from 'react'
import PropTypes from 'prop-types'

const SedelSpinner = ({ color }) => {
  return (
    <span
      className={`spinner-border text-black animate-spin inline-block w-5 h-2 border-4 rounded-full border-${
        color || 'purple-800'
      }`}
    ></span>
  )
}

SedelSpinner.propTypes = {
  color: PropTypes.string
}

export default SedelSpinner
