const router = require("express").Router();
const multer = require("multer");
const os = require("os");

const { police_check } = require("../middlewares");

const productcontroller = require("./controller");

router.get("/product", productcontroller.getProducts);
router.post(
  "/product",
  multer({ dest: os.tmpdir() }).single("picture"),
  police_check("create", "Product"),
  productcontroller.store
);
router.put(
  "/product/update/:id",
  multer({ dest: os.tmpdir() }).single("picture"),
  police_check("update", "Product"),
  productcontroller.update
);
router.delete(
  "/product/remove/image/:id",
  multer({ dest: os.tmpdir() }).single("picture"),
  police_check("delete", "Product"),
  productcontroller.deleteImage
);
router.get("/product/:id", productcontroller.get_BayID);
router.delete(
  "/product/remove/:id",
  police_check("delete", "Product"),
  productcontroller.deletes
);
module.exports = router;
