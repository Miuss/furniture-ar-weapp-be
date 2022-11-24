const Restful = (fn, code, message) => (req, res, next) => {
  const result = fn(req, res, next);
  return res.status(200).json({code, message, result});
}

module.exports = Restful;