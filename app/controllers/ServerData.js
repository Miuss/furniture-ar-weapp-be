import { sequelize } from '../models'

/**
 * 获取全平台服务器统计数据
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getGlobalServerTotalData = async (req, res, next) => {
  try {

    const [result] = await sequelize.query(`SELECT sum(online) as onlinePlayer, count(*) as onlineServer, createdAt from server_data where createdAt >= (NOW() - INTERVAL 24 HOUR) group by createdAt ORDER BY createdAt DESC`)                                                                       
    const totalData = result.map((item) => {
      return {
        onlinePlayer: parseInt(item.onlinePlayer),
        onlineServer: parseInt(item.onlineServer),
        createdAt: item.createdAt
      }
    })

    res.status(200).json({ code: 0, msg: '平台数据获取成功', data: totalData });
  } catch (e) {
    console.error(e)
    res.status(200).json({ code: -1, msg: e.message });
  }
}

export {
  getGlobalServerTotalData
}