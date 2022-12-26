import { Log } from '../models'
import { getClientIp } from '../utils/utils'

export default (req, res, next) => {

  console.log(req)

  next()
}