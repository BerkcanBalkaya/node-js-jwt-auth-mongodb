import mongoose from "mongoose";

// const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
  })
);
export { Role };
