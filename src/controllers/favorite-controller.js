const favoriteService = require("../services/favorite-service");
const newsService = require("../services/news-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const favoriteController = {};

favoriteController.addFavoriteNews = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newsId = +req.params.newsId;

    const userExist = await userService.findUserById(userId);
    const newsExist = await newsService.findNewsById(+newsId);
    if (!userExist) {
      createError({ message: "Don't have this user", statusCode: 401 });
    }
    if (!newsExist) {
      createError({ message: "Don't have this news", statusCode: 401 });
    }
    const newsAlreadyAdded = await favoriteService.findAlreadyAddedFavoriteNewsByUserIdAndNewsId(userId,+newsId)
    if(newsAlreadyAdded){
      createError({message:"This news is already added in favorite list"})
    }
    await favoriteService.addFavoriteNewsByUserIdAndNewsId(userId,+newsId)
    res.status(200).json({message:"News has been added in favorite list"})
  } catch (error) {
    next(error);
  }
};

favoriteController.deleteFavoriteNewsByUserIdAndNewsId= async(req,res,next)=>{
  try {
    const userId = req.user.id
    const newsId = req.params.newsId
    const userExist = await userService.findUserById(userId);
    const newsExist = await newsService.findNewsById(+newsId);
    if (!userExist) {
      createError({ message: "Don't have this user", statusCode: 401 });
    }
    if (!newsExist) {
      createError({ message: "Don't have this news", statusCode: 401 });
    }
    const newsAlreadyAdded = await favoriteService.findAlreadyAddedFavoriteNewsByUserIdAndNewsId(userId,+newsId)
    if(!newsAlreadyAdded){
      createError({message:"This news has not add in favorite list"})
    }
    const favoriteNewsId = newsAlreadyAdded.id;
    await favoriteService.deleteFavoriteNewsByUserIdAndNewsId(favoriteNewsId)
    res.status(200).json({message:"News has been deleted from favorite list"})
  } catch (error) {
    next(error)
  }
}

favoriteController.getFavoriteNews = async(req,res,next)=>{
  try {
    const userId = req.user.id
    const userExist = await userService.findUserById(userId)
    if(!userExist){
      createError({message:"Don't have this user",statusCode:401})
    }
    const allFavoriteNews = (await favoriteService.getAllFavoriteNewsByUserId(userId)).reverse()
    res.status(201).json({allFavoriteNews})
  } catch (error) {
    next(error)
  }
}

module.exports = favoriteController;
