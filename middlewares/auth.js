const { User } = require('../models');

exports.protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ code: -1, message: 'You need to be logged in to visit this route'});
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      attributes: [
        "id",
        "username",
        "email",
      ],
      where: {
        id: decoded.id,
      },
    });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ code: -1, message: 'You need to be logged in to visit this route'});
  }
};

exports.admin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  }

  return res.status(401).json({ code: -1, message: 'Authorization denied, only admins can visit this route'});
};