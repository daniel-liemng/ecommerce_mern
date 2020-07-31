const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

// SIGN-UP
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

      return res.status(201).json({ user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// SIGN-IN
exports.signin = async (req, res) => {
  try {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: "User with that email does not exist. Please sign up",
        });
      }
      // if user found -> check email and pass match
      // create authenticate method in User model
      if (!user.authenticate(password)) {
        return res.status(401).json({
          err: "Email and password dont match",
        });
      }

      // generate a signed token with user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, {
        expire: new Date() + 9999,
      });

      // return response with user and token to frontend user
      const { _id, name, email, role } = user;
      return res.status(200).json({
        token,
        user: {
          _id,
          email,
          name,
          role,
        },
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// SIGN-OUT
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Sign Out Success" });
};

// REQUIRE SIGN-IN
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});
