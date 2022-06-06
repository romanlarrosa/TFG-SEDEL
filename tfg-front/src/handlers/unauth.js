const { default: AuthService } = require('services/auth.service')

exports.isUnauth = (message, navigation) => {
  if (message && (/.*40[1|3]/.test(message))) {
    AuthService.logout()
    navigation('/login')
    window.location.reload()
  }
}
