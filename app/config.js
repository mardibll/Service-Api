const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  secretKey: process.env.SCREET_KEY,
  serviceName: process.env.SERVICE_NAME,
  dbHOST: process.env.DB_HOST,
  dbPORT: process.env.DB_PORT,
  dbUSER: process.env.DB_USER,
  dbPASS: process.env.DB_PASS,
  dbNAME: process.env.DB_NAME,
};
