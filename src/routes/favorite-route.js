const express = require("express");
const authenticate = require("../middlewars/authenticate");
const favoriteController = require("../controllers/favorite-controller");

const favoriteRouter = express.Router();

favoriteRouter.post("/add-favorite/:newsId",authenticate,favoriteController.addFavoriteNews)
favoriteRouter.delete("/delete-favorite/:newsId",authenticate,favoriteController.deleteFavoriteNewsByUserIdAndNewsId)
favoriteRouter.get("/get-favorite",authenticate,favoriteController.getFavoriteNews)


module.exports = favoriteRouter;
