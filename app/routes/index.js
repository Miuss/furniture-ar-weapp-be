import auth from './auth'
import user from './user'
import server from './server'
import serverTag from './serverTag'

export default (app) => {
  app.use('/api/v1/auth', auth);  // Auth
  app.use('/api/v1/user', user);  // User
  app.use('/api/v1/server', server);  // Server
  app.use('/api/v1/serverTag', serverTag);  // Server
}