const express = require("express");
const authenticate = require("../middlewars/authenticate");
const commentController = require("../controllers/comment-controller");
const validateAdminAndUser = require("../middlewars/validate-admin-and-user");

const commentsRouter = express.Router();

commentsRouter.post("/create-comment", authenticate, commentController.createComment);
commentsRouter.patch("/update-comment", authenticate, commentController.updateComment);
commentsRouter.delete("/delete-comment/:commentId", authenticate,validateAdminAndUser, commentController.deleteComment);
commentsRouter.get("/news/:newsId/comments", commentController.getCommentsByNewsId);

module.exports = commentsRouter;

