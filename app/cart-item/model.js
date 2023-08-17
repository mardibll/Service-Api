const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: [3, "panjang nama makanan minimal 3 karakter"],
    required: [true, "name must be field"],
  },
  qty: {
    type: Number,
    required: [true, "qty harus diisi"],
    min: [1, "minimal qty adalah 1"],
  },
  price: {
    type: Number,
    default: 0,
  },
  image_url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});
module.exports = mongoose.model("CartItem", cartItemSchema);
