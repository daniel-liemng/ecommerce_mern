const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  const user = new User(req.body);
  try {
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }

      user.salt = undefined;
      user.hashed_password = undefined;

      res.json({ user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
