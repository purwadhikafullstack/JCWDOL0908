const db = require("../model");
const { QueryTypes } = require("sequelize");
const User = db.User;
const Address = db.Address;

const GetUser = async (req, res) => {
  // query

  // example: get user with parameter id_user = 1
  const ress = await User.findOne({
    where: {
      id_user: 1,
    },
  });


  // logic


  // response
  res.status(200).json({
    message: "Hello, Student !",
    data: {
      ress
    },
  });
};

module.exports = {
  GetUser,
};
