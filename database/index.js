const mongoose = require("mongoose");
const { dbHOST, dbPASS, dbNAME, dbPORT, dbUSER } = require("../app/config");
mongoose.connect(`mongodb://${dbHOST}:${dbPORT}/admins`);
const db = mongoose.connection;
db.on("connected", () => {
    console.log("Terhubung ke basis data MongoDB");
  });
module.exports = db;
