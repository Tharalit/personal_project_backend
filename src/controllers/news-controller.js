const prisma = require("../model/prisma");
const newsService = require("../services/news-service");
const uploadService = require("../services/upload-service");
const { createError } = require("../utils/create-error");

const newsController = {};

newsController.createNews = async (req, res, next) => {
  try {
    if (
      !req.body.image &&
      !req.body.title &&
      !req.body.message &&
      !req.body.newsType
    ) {
      createError({ message: "message or image required", statusCode: 400 });
    }
    const data = {
      userId: req.user.id,
      title: req.body.title,
      message: req.body.message,
      newsType: req.body.newsType,
    };
    if (req.body.image) {
      data.image = await uploadService.upload(req.body.image);
    }

    await prisma.news.create({ data });
    res.status(201).json({ message: "news has been created" });
  } catch (error) {
    next(error);
  }
};

newsController.deleteNewsByNewsId = async (req, res, next) => {
  try {
    const newsExist = await newsService.findNewsById(+req.params.newsId);
    if (req.user.isAdmin === false) {
      createError({ message: "Only admin can delete news", statusCode: 400 });
    }
    if (!newsExist) {
      createError({ message: "News doesn't exist", statusCode: 400 });
    }
    await newsService.deleteNewsByNewsId(+newsExist.id);
    res.status(201).json({ message: "News has been deleted" });
  } catch (error) {
    next(error);
  }
};

newsController.getLastestNews = async (req, res, next) => {
  try {
    const latestNewsData = await prisma.news.findMany({
      where: { newsType: "NEWS" },include:{user:true}
    });
    if (!latestNewsData) {
      createError({ message: "Can not find lastest news", statusCode: 400 });
    }
    res.status(201).json(latestNewsData);
  } catch (error) {
    next(error);
  }
};

newsController.getOldNews = async (req, res, next) => {
  try {
    const OldNewsData = await prisma.news.findMany({
      where: { newsType: "OLD" },
    });
    if (!OldNewsData) {
      createError({ message: "Can not find old news", statusCode: 400 });
    }

    res.status(201).json(OldNewsData);
  } catch (error) {
    next(error);
  }
};

newsController.getNewsItem = async (req, res, next) => {
  try {
    const news = await newsService.findNewsById(+req.params.newsId);
    if (!news) {
      createError({ message: "this news user was not found", statusCode: 400 });
    }
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

newsController.getAllNews = async (req, res, next) => {
  try {
    const allNews = await newsService.findAllNews();
    if (!allNews) {
      createError({ message: "Don't have news", statusCode: 400 });
    }
    res.status(200).json(allNews);
  } catch (error) {
    next(error);
  }
};

module.exports = newsController;
