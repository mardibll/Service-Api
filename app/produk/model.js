const mongoose = require("mongoose");
const colectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "field name tidak boleh kosong"],
      minlenght: [3, "min name 3 karakter"],
      maxlenght: [50, "max name 50 karakter"],
    },
    descripsi: {
      type: String,
      default: null,
      maxlenght: [1000, "panjang deskripsi max 1000 karakter"],
    },
    price: {
      type: Number,
      required: [true, "Field 'price' cannot be empty."],
    },
    picture: {
      type: String,
      default: null,
    },
    categoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    tags: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tags",
    },
  },
  { timestamps: true }
);
const product = mongoose.model("product", colectionSchema);
module.exports = product;

// { timestamps: true }=>opsi, yang menambahkan createdAtdan updatedAtmengisi setiap dokumen dalam koleksi, secara otomatis melacak stempel waktu pembuatan dan modifikasi.
