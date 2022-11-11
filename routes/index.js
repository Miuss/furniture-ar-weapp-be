import auth from './auth'
import user from './user'

export default (app) => {
  app.use('/api/v1/auth', auth);  // Auth
  app.use('/api/v1/user', user);  // User
}