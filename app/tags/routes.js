const router = require("express").Router();
const { police_check } = require("../middlewares");
const controlTags = require("./controller");

router.get("/tags", controlTags.index);
router.get("/tags/:id", controlTags.get_id);
router.post("/tags", police_check("create", "Tags"), controlTags.store);
router.put("/tags/:id", police_check("update", "Tags"), controlTags.update);
router.delete("/tags/:id", police_check("delete", "Tags"), controlTags.destroy);
module.exports = router;
