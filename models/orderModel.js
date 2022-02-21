const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userID: String,
  productID: [String],
  totalAmount: Number,
  status: String,
});
module.exports = mongoose.model("orders", orderSchema);
