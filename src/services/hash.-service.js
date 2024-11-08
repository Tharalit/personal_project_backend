const bcrypt = require("bcryptjs");

const hashService = {};

hashService.hash = (plaintext) => bcrypt.hash(plaintext, 10);

hashService.compare = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

module.exports = hashService;
