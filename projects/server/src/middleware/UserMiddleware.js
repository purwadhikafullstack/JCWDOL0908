const { DecodeJWT } = require("../helper/Token");

const CheckAuth = async (req, res, next) => {
  // Get auth from bearer token
  const { data, error } = await DecodeJWT(req.headers.authorization.split(" ")[1]);
  if (error) {
    return res.status(401).json({
      message: "Unauthorized",
      data: null,
    });
  }
  req.user = data;
  next();
};

module.exports = {
  CheckAuth,
};
