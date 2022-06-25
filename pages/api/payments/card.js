import mongoose from "mongoose";
import Payment from "../../../models/mongo/payment/Payment";

// eslint-disable-next-line no-undef
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  // eslint-disable-next-line no-undef
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log(err));

export default async function handler(req, res) {
  try {
    const payment = await Payment.create(req.body);
    if (!payment) {
      return res
        .status(500)
        .json({ status: "fail", error: "Error! Counld't create a payment" });
    }
    res.status(200).json({
      status: "success",
      requestId: payment._id,
      amount: payment.amount,
    });
  } catch (e) {
    return res.status(500).json({ status: "fail", error: e.message });
  }
}
