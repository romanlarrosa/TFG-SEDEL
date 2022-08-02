const db = require('../models')

const checkDates = (req, res, next) => {
  db.voting
    .findOne({
      _id: req.vote.voting
    })
    .exec((err, voting) => {
      if (err) {
        res.render('error', {
          errorCause: err
        })
        return
      }
      if (voting) {
        req.voting = voting
        if (
          voting.startDate >= Date.now() ||
          voting.endDate <= Date.now()
        ) {
          res.render('error', {
            errorCause: 'No se puede votar fuera del periodo de voto'
          })
          return
        }
        next()
      }
    })
}

const userAllowed = (req, res, next) => {
  if (req.voting.universal) {
    next()
  } else {
    console.log('No es universal')
    const allowed = (req.voting.electors || []).some((element) => {
      return element.id === req.cert.subject.CN
    })
    if (allowed) {
      next()
    } else {
      res.render('error', {
        errorCause: 'No tiene permitido votar'
      })
      return
    }
  }
}

const userHasVoted = (req, res, next) => {
  const hasVoted = (req.voting.voted || []).some((element) => {
    return element.id === req.cert.subject.CN
  })
  if (hasVoted) {
    res.render('error', {
      errorCause: 'Ya ha depositado un voto'
    })
    return
  }
  next()
}

const allowVoting = {
  checkDates,
  userAllowed,
  userHasVoted
}
module.exports = allowVoting
