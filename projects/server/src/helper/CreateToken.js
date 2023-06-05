const jwt = require("jsonwebtoken");
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const env = process.env;

// making token: creating function to make a token, token here to encoding-decoding
// data from database
module.exports = {
  createToken: (payload) => {
    return jwt.sign(
      payload, // making token: /*data untuk membuat token*/,
      env.TOKEN_SECRET_KEY, // secret-key to encode
      { expiresIn: "48h" }, // token lifetime, in this case is 12 hours
    );
  },
};
