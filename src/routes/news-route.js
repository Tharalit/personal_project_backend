const express = require("express");
const upload = require("../middlewars/upload");
const newsController = require("../controllers/news-controller");
const authenticate = require("../middlewars/authenticate");

const newsRouter = express.Router();

newsRouter.post(
  "/create-news",
  authenticate,
  upload.single("image"),
  newsController.createNews
);
newsRouter.delete("/delete-news/:newsId",authenticate,newsController.deleteNewsByNewsId)
newsRouter.get("/lastest-news", newsController.getLastestNews);
newsRouter.get("/old-news", newsController.getOldNews);
newsRouter.get("/search-news",newsController.getAllNews);
newsRouter.get("/:newsId", newsController.getNewsItem);

module.exports = newsRouter;
