const router = require("express").Router();
const { police_check } = require("../middlewares");
const controller = require("./colection");

router.post(
  "/delivery-addresses",
  police_check("create", "DeliveryAddress"),
  controller.store
);
router.put(
  "/delivery-addresses/:id",
  // police_check("update", "DeliveryAddress"),
  controller.update
);
router.delete("/delivery-addresses/:id", controller.destroy);
router.get(
  "/delivery-addresses",
  police_check("view", "DeliveryAddress"),
  controller.index
);
module.exports = router;
