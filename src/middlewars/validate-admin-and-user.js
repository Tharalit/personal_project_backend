const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const validateAdminAndUser = async (req, res, next) => {
  try {
    const commentId = +req.params.commentId;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const commentData = await userService.getUserIdByCommentId(commentId);
    if (userId !== commentData.userId ) {
      if(!isAdmin){
        createError({ message: "You are not admin", statusCode: 401 });
      }else{
        next();
        return;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAdminAndUser;
