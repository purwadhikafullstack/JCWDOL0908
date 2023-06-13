const jwt = require("jsonwebtoken");
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const env = process.env;

module.exports = {
  tokenDecoder: (req, res, next) => {
    jwt.verify(req.token, env.TOKEN_SECRET_KEY, (err, decode) => {
      if (err) return res.status(401).send({ message: "not a match user", isSuccess: false });
      if (!decode.id_user) return res.status(401).send({ message: "not a user", isSuccess: false });
      if (!decode.is_admin) return res.status(401).send({ message: "not an authorized user", isSuccess: false });
      req.user = decode;
      next();
    });
  },
};
