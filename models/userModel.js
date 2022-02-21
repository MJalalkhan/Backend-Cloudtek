const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  DOB: String,
  password: String,
});
module.exports = mongoose.model("Users", userSchema);
