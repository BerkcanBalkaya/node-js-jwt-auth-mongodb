import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";
// const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
// db.user = require("./user.model");
// db.role = require("./role.model");
db.user = User;
db.role = Role;
db.ROLES = ["user", "admin", "moderator"];
export default db;
// module.exports = db;
