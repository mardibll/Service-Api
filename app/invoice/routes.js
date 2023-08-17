const router = require("express").Router();
const controllerInvoice = require("./controller");

router.get("/invoice/:order_id", controllerInvoice.show);
module.exports = router;
