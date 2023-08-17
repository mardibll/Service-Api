const mongoose = require("mongoose");
let DeliverySchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxlength: [255, "Panjang maksimal nama alamat adalah 255 karakter"],
    },
    kelurahan: {
      type: String,
      required: [true, "Kelurahan harus diisi"],
      maxlength: [255, "Panjang maksimal kelurahan adalah 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "Kecamatan harus diisi"],
      maxlength: [255, "Panjang maksimal kecamatan adalah 255 karakter"],
    },
    kabupaten: {
      type: String,
      required: [true, "Kabupaten harus diisi"],
      maxlength: [255, "Panjang maksimal kabupaten adalah 255 karakter"],
    },
    propinsi: {
      type: String,
      required: [true, "Propinsi harus diisi"],
      maxlength: [255, "Panjang maksimal propinsi adalah 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "Detail alamat harus diisi"],
      maxlength: [255, "Panjang maksimal detail alamat adalah 255 karakter"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Delivery = mongoose.model("delivery", DeliverySchema);
module.exports = Delivery;
