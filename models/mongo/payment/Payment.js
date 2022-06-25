const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  cardNumber: { type: String, required: [true, "No card number!"] },
  expDate: { type: String, required: [true, "No expiring date!"] },
  cvv: { type: String, required: [true, "No CVV!"] },
  amount: { type: String, required: [true, "No amount of money!"] },
});

module.exports =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
