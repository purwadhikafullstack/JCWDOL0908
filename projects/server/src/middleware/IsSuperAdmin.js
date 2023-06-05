module.exports = {
  isSuperAdmin: (req, res, next) => {
    if (req.user.role !== "super-admin") {
      return res.status(401).send({ message: "not an authorized user", isSuccess: false });
    }
    next();
  },
};
