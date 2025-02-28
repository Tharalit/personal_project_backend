const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError({ message: "Unauthenticated", statusCode: 401 });
    }
    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);

    const user = await userService.findUserById(payload.id);

    if (!user) {
      createError({ message: "User was not found", statusCode: 400 });
    }
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
