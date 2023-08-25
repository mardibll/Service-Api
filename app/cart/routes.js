const router = require("express").Router();
const { police_check } = require("../middlewares");
const controller = require("./controller");

router.put("/carts", police_check("update", "Cart"), controller.update);
router.get("/carts", police_check("read", "Cart"), controller.index);
router.post("/carts", police_check("read", "Cart"), controller.create);
router.delete("/carts/:id", police_check("read", "Cart"), controller.destroy);
module.exports = router;
