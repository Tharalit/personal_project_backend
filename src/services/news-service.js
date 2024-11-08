const prisma = require("../model/prisma");

const newsService = {};

newsService.findNewsById = (newsId) => prisma.news.findUnique({where: { id: newsId },});

newsService.findAllNews = () => prisma.news.findMany();

newsService.deleteNewsByNewsId = (newsId) =>
  prisma.news.delete({ where: { id: newsId } });

module.exports = newsService;
