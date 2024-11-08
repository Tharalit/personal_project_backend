const commentService = require("../services/comment-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const commentController = {};

commentController.getCommentsByNewsId = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const comments = await commentService.getCommentsByNewsId(parseInt(newsId, 10));
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

commentController.createComment = async (req, res, next) => {
  try {

    const { newsId, message } = req.body;
    const userId = req.user.id; 
    const newComment = await commentService.createComment( +newsId, userId, message );
    const userExist = await userService.findUserById(newComment.userId)
    newComment.user = {firstName:userExist.firstName}
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

commentController.updateComment = async (req, res, next) => {
  try {
    const {commentId,editedComment} = req.body
    const userId = req.user.id
    const commentExist = commentService.findCommentByCommentId(commentId)
    if(!commentExist){
      createError({message:"Don't have this comment in database",statusCode: 401 })
    }
    const updatedComment = await commentService.updateComment( commentId, userId, editedComment );
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

commentController.deleteComment = async (req, res, next) => {
  try {
    const commentId = +req.params.commentId
    // const userId = req.user.id
    const commentExist = commentService.findCommentByCommentId(commentId)
    if(!commentExist){
      createError({message:"Don't have this comment in database",statusCode: 401 })
    }
    await commentService.deleteComment( commentId );
    res.status(204).send({message:"Comment has been deleted"});
  } catch (error) {
    next(error);
  }
};

module.exports = commentController;
