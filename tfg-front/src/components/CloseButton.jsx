import React from 'react'
import PropTypes from 'prop-types'

const CloseButton = ({ onClose }) => {
  return <button type="button" onClick={onClose} className="bg-white rounded-full inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 transition-all ease-in-out">
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
}

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default CloseButton
