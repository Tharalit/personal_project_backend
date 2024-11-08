const prisma = require("../model/prisma");

const commentService = {};


commentService.findCommentByCommentId = async (commentId) =>
  await prisma.comments.findUnique({ where: { id: commentId } });

commentService.createComment = async (newsId, userId, message) => {
  try {
    const newComment = await prisma.comments.create({
      data: { newsId, userId, message },
    });
    return newComment;
  } catch (error) {
    console.log("==================", error);
  }
};

commentService.getCommentsByNewsId = async (newsId) => {
  const comments = await prisma.comments.findMany({
    where: {
      newsId: newsId,
    },
    include: {
      user: true,
    },
    orderBy: { id: "desc" },
  });
  return comments;
};

commentService.updateComment = async (commentId, userId, editedComment) =>
  await prisma.comments.update({
    where: {
      id: commentId,
      userId: userId,
    },
    data: {
      message: editedComment,
    },
  });

commentService.deleteComment = async (commentId) =>
  await prisma.comments.delete({ where: { id: commentId } });

module.exports = commentService;
