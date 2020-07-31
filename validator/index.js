const { body, validationResult } = require("express-validator");

exports.userSignupValidator = [
  body("name", "Name is required").notEmpty(),
  body("email", "Please porvide the valid email")
    .isEmail()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("Email must be between 3 to 32 characters"),
  body("password", "Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
