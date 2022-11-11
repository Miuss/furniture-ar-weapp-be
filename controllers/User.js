import { User } from '../models'

/**
 * 查询用户个人信息
 */

const getMainUserInfo = async (req, res, next) => {
  const user = await User.findOne({
    attributes: [username, description, email],
    where: {
      id: req.user.id
    }
  });

  res.status(200).json({ code: 0, msg: '获取用户成功', data: user });
}


/**
 * 通过ID查询用户信息
 */

 const getUserById = async (req, res, next) => {
  if (req.params.id == '') {
    res.status(200).json({ code: -1, msg: '参数错误' });
  }

  const user = await User.findOne({
    attributes: [username, description, email],
    where: {
      id: req.params.id
    }
  });

  res.status(200).json({ code: 0, msg: '获取用户成功', data: user });
}

export {
  getMainUserInfo,
  getUserById
}