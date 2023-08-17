const router = require("express").Router();
const { police_check } = require("../middlewares");
const controllerOrder = require("./controller");
router.post("/orders", police_check("create", "Order"), controllerOrder.store);
router.get("/orders", controllerOrder.index);
module.exports = router;
