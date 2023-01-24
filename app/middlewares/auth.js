const userAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Authorization denied, only logged can visit this route');
    }

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