const router = require("express").Router();
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

router.post("/payment", async (req, res) => {
  let instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(order);
  });
});

router.post("/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.response.razorpay_signature) {
    res.status(200).send({ message: "Sign Valid" });
  } else {
    res.status(500).send({ message: "Sign Not Valid" });
  }
});

module.exports = router;
