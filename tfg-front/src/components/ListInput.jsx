import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CloseButton from 'components/CloseButton'

const ListInput = ({ label, id, itemList, setItemList, placeholder }) => {
  const [input, setInput] = useState('')

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault()
      setItemList([...itemList, input])
      setInput('')
    }
  }

  const removeItem = (i) => () => {
    setItemList(itemList.filter((_item, index) => { return index !== i }))
  }

  return (
    <>
      <label htmlFor={id} className='ml-2 text-xs mb-0.5' >{label}</label>
      <div className="mb-2 form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        {itemList.map((candidateItem, index) => (
          <div key={candidateItem + index} className="flex flex-row align-middle items-center">
            <CloseButton onClose={removeItem(index)} />
            <span className="ml-2">{candidateItem}</span>
          </div>
        ))}
        <input
          id={id}
          onKeyDown={handleInputSubmit}
          required
          autoComplete="off"
          onChange={onInputChange}
          value={input}
          className="form-control block w-full text-l font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </>
  )
}

ListInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  itemList: PropTypes.arrayOf(PropTypes.string).isRequired,
  setItemList: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default ListInput
