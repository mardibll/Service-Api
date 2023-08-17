const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
// const { AutoIncrementSimple } = require("@typegoose/auto-increment");

let userSchema = Schema(
  {
    full_name: {
      type: String,
      minlength: [3, "Panjang nama harus antara 3-255 karakter"],
      maxlength: [255, "Panjang nama harus antara 3-255 karakter"],
      required: [true, "Nama harus diisi"],
    },
    customer_id: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Email harus diisi"],
      maxlength: [255, "Panjang email maksimal 255 karakter"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      maxlength: [255, "Panjang password maksimal 255 karakter"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

userSchema.index({ token: 1 });

userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid!`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("user").count({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

// function onSchemaInitialized() {
//   // Access the plugin settings or options directly from the schema
//   const autoIncrementSettings = userSchema.plugins[0].options;
//   console.log("AutoIncrementSimple settings:", autoIncrementSettings);
//   console.log("HALO FOR YOU");
// }
// userSchema.plugin(AutoIncrementSimple, [{ field: "customer_id" }]);

module.exports = model("user", userSchema);
