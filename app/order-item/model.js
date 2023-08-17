const mongoose = require("mongoose");
let OrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be field"],
    maxlength: [50, "Panjang nama makanan adalah 255 karakter"],
  },
  price: {
    type: Number,
    required: [true, "Harga item harus diisi"],
  },
  qty: {
    type: Number,
    required: [true, "Kuantitas harus diisi"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = mongoose.model("OrderItem", OrderItemSchema);
