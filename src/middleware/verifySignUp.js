import db from "../models/index.js";

// const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ messaage: err });
      return;
    }
    if (user) {
      res.status(400).send({
        message: "Bu kullanıcı adına sahip bir hesap bulunmakta",
      });
      return;
    }
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res
          .status(400)
          .send({ message: "Bu emaile sahip bir hesap bulunmakta" });
        return;
      }
      next();
    });
  });
};
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `${req.body.roles[i]} de belirtilen rol bizle eşleşmedi`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export default verifySignUp;
// module.exports = verifySignUp;
