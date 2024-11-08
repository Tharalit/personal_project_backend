const express = require("express");
const authController = require("../controllers/auth-controller");
const {
  registerValidator,
  loginValidator,
} = require("../middlewars/validator");
const authenticate = require("../middlewars/authenticate");

const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.authRegister);
authRouter.post("/login", loginValidator, authController.authLogin);
authRouter.get("/me", authenticate, authController.getMe);

module.exports = authRouter;
