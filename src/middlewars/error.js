const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    err.statusCode = 401;
  }
  res.status(err.statusCode || 500).json({ msg: err.message });
};

module.exports = errorMiddleware;
