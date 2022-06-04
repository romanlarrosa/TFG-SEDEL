const { default: AuthService } = require('services/auth.service')

exports.isUnauth = (message, navigation) => {
  if (message && message.includes('401')) {
    AuthService.logout()
    navigation('/login')
  }
}
