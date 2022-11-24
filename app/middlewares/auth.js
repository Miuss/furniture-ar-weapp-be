import { User } from '../models'

const userAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ code: -6, msg: 'Authorization denied, only logged can visit this route'});
  }

  const token = req.headers.authorization.replace("Bearer", "").trim()

  try {
    const user = await User.findOne({
      where: {
        token,
      },
    })

    if (!user) {
      throw new Error('Authorization denied, only logged can visit this route');
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ code: -6, msg: err.message});
  }
}

const adminAuth = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  }

  return res.status(401).json({ code: -5, msg: 'Authorization denied, only admins can visit this route'});
}

export {
  userAuth,
  adminAuth
}