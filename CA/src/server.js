const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const fs = require('fs')
const https = require('https')
const BlindSignature = require('blind-signatures')
const path = require('path')

const db = require('./models')

const options = {
  key: fs.readFileSync('server_key.pem'),
  cert: fs.readFileSync('server_cert.pem'),
  ca: [fs.readFileSync('server_cert.pem')],
  requestCert: true,
  rejectUnauthorized: false
}

const httpsApp = express()
const keyServer = express()

httpsApp.use(cors())
httpsApp.use(bp.json())
httpsApp.use(bp.urlencoded({ extended: true }))
httpsApp.use(express.static('public'))

keyServer.use(cors())
keyServer.use(bp.json())
keyServer.use(bp.urlencoded({ extended: true }))

const key = BlindSignature.keyGeneration({ b: 2048 })

db.mongoose
  .connect(
    `mongodb+srv://express:${process.env.MONGO_PASS}@cluster-tfg.t1hko.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.log('Connection error', err)
  })

httpsApp.set('view engine', 'hbs')
httpsApp.set('views', path.join(__dirname, 'views'))

const { certRequest, allowVoting } = require('./middlewares')

keyServer.get('/keys', (_req, res) => {
  res.send({
    n: key.keyPair.n.toString(),
    e: key.keyPair.e.toString()
  })
})

httpsApp.post('/test/validate', (req, res) => {
  res.send(req.body.vote)
})

httpsApp.post(
  '/validate',
  Object.values(certRequest),
  Object.values(allowVoting),
  (req, res) => {
    // Sign ballot
    const signed = BlindSignature.sign({
      blinded: req.vote.candidate,
      key
    })
    // Set user voted
    db.voting.findOneAndUpdate(
      { _id: req.voting._id },
      { $push: { voted: { id: req.cert.subject.CN } } },
      (err) => {
        if (err) {
          console.log(err)
        }
      }
    )
    //Render success and send to client
    res.render('success', {
      message:
        'Voto verificado con éxito. Puede volver a la plataforma.',
      signed: signed + '',
      origin: req.vote.origin
    })
  }
)

const PORT = process.env.PORT || 8081
https.createServer(options, httpsApp).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

keyServer.listen(8082, () => {
  console.log('Key server running on port 8082')
})
