import { Server } from '../models'
import * as mcstatus from 'mcstatus.js'
import dns2 from 'dns2'

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
    console.log(e)
  }
}

const getServerList = async (req, res, next) => {
  console.log(123)

  try {
    const result = await Server.findAll();
    console.log(result)
    res.status(200).json({ code: 0, msg: '成功获取服务器列表', data: result });
  } catch(e) {
    console.log(e)
  }

}

const getServerStatus = async (req, res, next) => {
  const { ip, port} = req.query
  console.log(ip, port)

  try {
    const result = await queryMinecraftStatus(ip, port)
    console.log(result)
    res.status(200).json({ code: 0, msg: '成功获取服务器状态', data: result });
  } catch(e) {
    console.log(e)
  }
}

export {
  addServer,
  getServerList
}