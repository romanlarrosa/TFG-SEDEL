var createGuest = require('cross-domain-storage/guest')

export const writeTo = (path, key, value) => {
  var bazStorage = createGuest(path)
  bazStorage.set(key, value, () => {
    console.log('Escrito...')
  })
}

const origin = document.getElementById('origin').innerHTML
const signed = document.getElementById('signed').innerHTML
writeTo(origin, 'signed', signed)
console.log({ origin, signed })
