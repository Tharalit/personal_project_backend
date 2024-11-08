const hashService = require("../services/hash.-service.js");
const jwtService = require("../services/jwt-service.js");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authController = {};

authController.authRegister = async (req, res, next) => {
  try {
    const data = req.body;
    const existUser = await userService.findUserByEmail(data.email);
    if (existUser) {
      createError({ message: "This email is already used", statusCode: 400 });
    }
    data.password = await hashService.hash(data.password);
    delete data.confirmPassword;
    await userService.createUser(data);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

authController.authLogin = async (req, res, next) => {
  try {
    const data = req.body;
    const existUser = await userService.findUserByEmail(data.email);
    if (!existUser) {
      createError({ message: "This email doesn't exist", statusCode: 401 });
    }
    const hashed = await hashService.compare(data.password, existUser.password);
    if (!hashed) {
      createError({ message: "password is invalid", statusCode: 401 });
    }
    const accessToken = jwtService.sign({ id: existUser.id });
    console.log("token success");
    existUser.accessToken = accessToken;
    delete existUser.password;
    res.status(200).json(existUser);
  } catch (error) {
    next(error);
  }
};

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
