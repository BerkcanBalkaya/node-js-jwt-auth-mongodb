import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as config from "../config/auth.config.js";
import db from "../models/index.js";

// const config = require("../config/auth.config");
// const db = require("../models");
const User = db.user;
const Role = db.role;
// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
// exports.signup
export const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    // *asenkron olmayan versiyonu bir promise döndürürken aşağıdaki bir değer döndürür. İkinci parametre salttır
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({
              message: "Kayıt işlemi başarılı bir şekilde gerçekleştirildi.",
            });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "Kayıt başarılı bir şekilde gerçekleştirildi." });
        });
      });
    }
  });
};

// exports.signin
export const signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    //   * Burada populate kısacası referansının gözükmesi yerine tamamının gözükmesini sağlıyor gibi düşün
    .populate("roles", "-___v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "Kullanıcı bulunamadı" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Geçersiz şifre",
        });
      }
      //   * 86400 24 saat e denk gelmektedir.
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
