const db = require("../model");
const User = db.User;
const Address = db.Address;

const GetUser = async (req, res) => {

  const ress = await User.findOne({
    where: {
      id_user: 1,
    },
    include: {
      model: Address,
    },
  });


  // response
  res.status(200).json({
    message: "Hello, Student !",
    data: {
      ress,
    },
  });
};

module.exports = {
  GetUser,
};
