const requestCertificate = (req, res, next) => {
  const cert = req.socket.getPeerCertificate()

  if (req.client.authorized) {
    req.cert = cert
    req.vote = JSON.parse(req.body.vote)
    next()
  } else if (cert.subject) {
    res.render('error', {
      errorCause: `${cert.subject.CN}, los certificados de ${cert.issuer.CN} no están permitidos.`
    })
    return
  } else {
    res.render('error', {
      errorCause: `Es necesario seleccionar un certificado para realizar esta acción.`
    })
    return
  }
}

const certRequest = {
  requestCertificate
}
module.exports = certRequest
