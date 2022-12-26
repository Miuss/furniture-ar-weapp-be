import { sequelize } from '../models'

/**
 * 获取全平台服务器统计数据
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getGlobalServerTotalData = async (req, res, next) => {
  try {

    const [result] = await sequelize.query(`SELECT sum(online) as onlinePlayer, count(status = 'online' or null) as onlineServer, createdAt from server_data where createdAt >= (NOW() - INTERVAL 24 HOUR) group by createdAt ORDER BY createdAt ASC`)                                                                       
    const totalData = result.map((item) => {
      return {
        onlinePlayer: parseInt(item.onlinePlayer),
        onlineServer: parseInt(item.onlineServer),
        createdAt: item.createdAt
      }
    })

    res.status(200).json({ code: 0, msg: '平台数据获取成功', data: totalData });
  } catch (e) {
    console.error(e);
    res.status(200).json({ code: -1, msg: e.message });
  }
}

/**
 * 获取服务器的统计数据
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getServerStatisticsData = async (req, res, next) => {
  try {

    // const starttime = req.query.starttime || ''
    // const endtime = req.query.endtime || ''
    const serverId = req.query.serverId || ''

    if (serverId == '') {
      throw new Error('参数错误')
    }

    const [result] = await sequelize.query(`SELECT online, ping, createdAt from server_data where createdAt >= (NOW() - INTERVAL 24 HOUR) and sid = ${serverId} ORDER BY createdAt ASC`)

    res.status(200).json({ code: 0, msg: '获取服务器统计数据', data: result });
  } catch(e) {
    console.error(e);
    res.status(200).json({ code: -1, msg: e.message });
  }
}

export {
  getGlobalServerTotalData,
  getServerStatisticsData
}