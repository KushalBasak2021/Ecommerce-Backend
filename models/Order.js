const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: false },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        size: { type: String },
        img: { type: String },
        title: { type: String },
        price: { type: Number },
      },
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
