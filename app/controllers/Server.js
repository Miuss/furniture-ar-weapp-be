import { Server } from '../models'
import axios from 'axios'

/**
 * 用户添加服务器
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addServer = async (req, res, next) => {
  const body = res.body;

  try {
    await Server.create(body)
  } catch(e) {
    res.status(200).json({ code: -1, msg: e.message });
  }
}

const getServerList = async (req, res, next) => {
  console.log(123)

  try {
    const result = await Server.findAll();
    console.log(result)
    res.status(200).json({ code: 0, msg: '成功获取服务器列表', data: result });
  } catch(e) {
    res.status(200).json({ code: -1, msg: e.message });
  }

}

const getServerStatus = async (req, res, next) => {
  const { ip, port} = req.query

  try {
    const result = await axios.get(`http://127.0.0.1:3005/${ip}/${port}`)

    if (result.data == '-1') {
      throw new Error('无法获取该服务器数据')
    }

    res.status(200).json({ code: 0, msg: '成功获取服务器状态', data: result.data });
  } catch(e) {
    res.status(200).json({ code: -1, msg: e.message });
  }
}

export {
  addServer,
  getServerList,
  getServerStatus
}