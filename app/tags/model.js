const mongoose = require("mongoose");
let tagsschema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "panjang nama kategori min 3 karakter"],
    maxLength: [20, "panjang nama kategori max 20 karakter"],
    required: [true, "nama kategori tidak boleh kosong"],
  },
});
const category = mongoose.model("tags", tagsschema);
module.exports = category;
