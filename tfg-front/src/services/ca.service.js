const REACT_APP_CA_HOST = process.env.REACT_APP_CA_HOST
const API_URL = `${REACT_APP_CA_HOST}/validate/`

const validate = (form, candidate) => {
    form.target = '_blank'
    form.setAttribute(
      'candidate',
      JSON.stringify({ vote: candidate })
    )
    console.log(form)
    form.submit()
}


const CAService = {
    validate
}

export default CAService