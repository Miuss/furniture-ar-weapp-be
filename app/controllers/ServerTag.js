import { ServerTag } from '../models'
import { Op } from 'sequelize' 

/**
 * 添加服务器标签
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addServerTag = async (req, res, next) => {
  try {
    const body = req.body

    if (body.name == '') {
      throw new Error('参数错误')
    }
    
    // 查找是否有重复提交的服务器标签
    const serverTag = await ServerTag.findOne({ where: {
      name: body.name,
    }})
  
    if (serverTag) {
      throw new Error('该服务器标签已创建过了')
    }

    const newServerTag = await ServerTag.create({
      name: body.name,
      userId: req.user.id,
    })

    res.status(200).json({ code: 0, msg: '服务器标签添加成功', data: newServerTag });
  } catch(e) {
    console.error(e)
    res.status(200).json({ code: -1, msg: e.message });
  }
}

/**
 * 通过名称分页搜索服务器标签
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const searchServerTagbyName = async (req, res, next) => {
  try {
    const name = req.query.name || ''
    const pageIndex = parseInt(req.query.pageIndex || 0)
    const pageSize = parseInt(req.query.pageSize || 10)

    if (name == '') {
      throw new Error('参数错误')
    }

    const serverTags = await ServerTag.findAll({
      where: {
        name: {
          [Op.like]: `${name}%`, 
        }
      },
      offset: pageIndex * pageSize,
      limit: pageSize,
    })

    res.status(200).json({ code: 0, msg: '成功查询服务器标签', data: {
      list: serverTags,
      total: await ServerTag.count({
        where: {
          name: {
            [Op.like]: `${name}%`, 
          }
        }
      })
    }});
  } catch(e) {
    console.error(e)
    res.status(200).json({ code: -1, msg: e.message });
  }
}


export {
  addServerTag,
  searchServerTagbyName
}