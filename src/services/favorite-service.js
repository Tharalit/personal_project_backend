const prisma = require("../model/prisma");

const favoriteService = {};

favoriteService.addFavoriteNewsByUserIdAndNewsId = async (userId, newsId) =>
  prisma.favorites.create({ data: { newsId: newsId, userId: userId } });

favoriteService.findAlreadyAddedFavoriteNewsByUserIdAndNewsId = async (userId,newsId) =>
  prisma.favorites.findFirst({ where: { userId: userId, newsId: newsId } });

favoriteService.deleteFavoriteNewsByUserIdAndNewsId = async (favoriteNewsId) =>
  prisma.favorites.delete({ where: { id:favoriteNewsId } });

favoriteService.getAllFavoriteNewsByUserId = async (userId) =>
  prisma.favorites.findMany({
    where: { userId: userId },
    include: { news: true },
  });

module.exports = favoriteService;
