const jwt = require("jsonwebtoken");
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const env = process.env;

module.exports = {
  tokenDecoder: (req, res, next) => {
    jwt.verify(req.token, env.TOKEN_SECRET_KEY, (err, decode) => {
      if (err) return res.status(401).send({ message: "not a match user", isSuccess: false });
      req.user = decode;
      next();
    });
  },

  isUser: (req, res, next) => {
    const user = req.user;
    if (!user.id_user) return res.status(401).send({ message: "not a user", isSuccess: false });
    next();
  },

  isAdmin: (req, res, next) => {
    const user = req.user;
    if (!user.is_admin) return res.status(401).send({ message: "not an authorized user", isSuccess: false });
    next();
  },
};
