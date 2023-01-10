import auth from './auth'
import user from './user'
import server from './server'
import serverTag from './serverTag'
import serverData from './serverData'
import serverDataDayReport from './serverDataDayReport'
import file from './file'

export default (app) => {
  app.use('/api/v1/auth', auth);  // Auth
  app.use('/api/v1/user', user);  // User
  app.use('/api/v1/server', server);  // Server
  app.use('/api/v1/serverTag', serverTag);  // Server Tag
  app.use('/api/v1/serverData', serverData);  // Server Data
  app.use('/api/v1/serverDataDayReport', serverDataDayReport);  // Server Data Day Report
  app.use('/api/v1/file', file);  // Server Data Day Report
}