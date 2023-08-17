const router = require("express").Router();
const { police_check } = require("../middlewares");
const controlCategory = require("./controller");

router.get("/categories", controlCategory.index);
router.get("/categories/:id", controlCategory.get_id);
router.post(
  "/categories",
  police_check("create", "Category"),
  controlCategory.store
);
router.put(
  "/categories/:id",
  police_check("update", "Category"),
  controlCategory.update
);
router.delete(
  "/categories/:id",
  police_check("delete", "Category"),
  controlCategory.destroy
);
module.exports = router;
