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

const app = express()

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

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

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

const { certRequest, allowVoting } = require('./middlewares')

app.get('/keys', (_req, res) => {
  res.send({
    n: key.keyPair.n.toString(),
    e: key.keyPair.e.toString()
  })
})

app.post('/test/validate', (req, res) => {
  res.send(req.body.vote)
})

app.post(
  '/validate',
  Object.values(certRequest),
  Object.values(allowVoting),
  (req, res) => {
    db.voting.findOneAndUpdate(
      { _id: req.voting._id },
      { $push: { voted: { id: req.cert.subject.CN } } },
      (err) => {
        if (err) {
          console.log(err)
        }
      }
    )
    res.send(
      `Hello, ${req.cert.subject.CN}, your certificate was issued by ${req.cert.issuer.CN}! You are trying to vote in ${req.vote.voting}`
    )
  }
)

const PORT = process.env.PORT || 8081
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
