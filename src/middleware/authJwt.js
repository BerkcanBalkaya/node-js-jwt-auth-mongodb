import jwt from "jsonwebtoken";
import * as config from "../config/auth.config.js";
import db from "../models/index.js";

// const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config");
// const db = require("../models");

const User = db.user;
const Role = db.role;
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Token sağlanmadı" });
  }
  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Yetkisiz" });
    }
    req.userId = decode.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Admin yetkisi gerekmekte" });
        return;
      }
    );
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Moderatör yetkisi gerekmekte" });
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
export default authJwt;
// module.exports = authJwt;
