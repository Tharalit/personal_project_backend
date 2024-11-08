const jwt = require("jsonwebtoken");

const jwtService = {};

jwtService.sign = (payload) => jwt.sign(payload, process.env.SECRET_KEY);
jwtService.verify = (token) => jwt.verify(token, process.env.SECRET_KEY);

module.exports = jwtService;
