const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const KEY_PARSE = process.env.TOKEN_KEY_PARSE;
const IV_PARSE = process.env.TOKEN_IV_PARSE;

/**
 * GenerateToken - Generate token from email can be used for reset password and verify email
 * @param email
 * @returns {Promise<*>}
 * @constructor
 */
const GenerateToken = async (email) => {
  const key = CryptoJS.enc.Utf8.parse(KEY_PARSE);
  const iv = CryptoJS.enc.Utf8.parse(IV_PARSE);
  return CryptoJS.AES.encrypt(email, key, { iv }).toString();
};

/**
 * DecodeToken - Decode token to email
 * @param token
 * @returns {Promise<string>}
 * @constructor
 */
const DecodeToken = async (token) => {
  const key = CryptoJS.enc.Utf8.parse(KEY_PARSE);
  const iv = CryptoJS.enc.Utf8.parse(IV_PARSE);
  const decrypted = CryptoJS.AES.decrypt(token, key, { iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

/**
 * HashPassword - Hash password
 * @param password
 * @returns {Promise<void|*>}
 * @constructor
 */
const HashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * ComparePassword - Compare password
 * @param password
 * @param hash
 * @returns {Promise<void|*>}
 * @constructor
 */
const ComparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * GenerateJWT - Generate JWT token
 * @param data
 * @returns {Promise<void>}
 * @constructor
 */
const GenerateJWT = async (data) => {
  const payload = {
    id: data.id_user,
    email: data.email,
    username: data.username,
    role: "0",
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "2D" });
};

/**
 * DecodeJWT - Decode JWT token
 * @param token
 * @returns {Promise<{data: *, error: *}>}
 * @constructor
 */
const DecodeJWT = async (token) => {
  try {
    const data = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    return { error: null, data };
  } catch (error) {
    return { error: "Token verification failed", data: null };
  }
};

module.exports = {
  GenerateToken,
  DecodeToken,
  HashPassword,
  ComparePassword,
  GenerateJWT,
  DecodeJWT,
};
