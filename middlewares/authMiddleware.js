require("dotenv").config();
const User = require("../models/User");
const Admin = require("../models/admin")
const jwt = require("jsonwebtoken");


module.exports.userVerification = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Authorization token not provided" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(403).json({ status: false, message: "Invalid token" });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        if (user.isBlocked) {
          return res.status(406).json({ status: false, message: "Action blocked" });
        }
        req.user = user;
        next();
      }
    }
  });
};

module.exports.adminVerification = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Authorization token not provided" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(403).json({ status: false, message: "Invalid token" });
    } else {
      const admin = await Admin.findById(data.id);
      if (admin) {
        if (admin.isBlocked) {
          return res.status(406).json({ status: false, message: "Action blocked" });
        }
        req.admin = admin;
        next();
      }
    }
  });
};
