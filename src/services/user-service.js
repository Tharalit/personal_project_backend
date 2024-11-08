const prisma = require("../model/prisma");

const userService = {};

userService.getUserIdByCommentId = async (commentId)=> prisma.comments.findUnique({where:{id:commentId}})

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByEmail = (email) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};

userService.findUserById = (userId) => {
  return prisma.user.findFirst({ where: { id: userId } });
};
module.exports = userService;
