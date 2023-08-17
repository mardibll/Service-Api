const router = require("express").Router();
const controllers = require("./controller");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ usernameField: "email" }, controllers.localStrategy)
);
router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/logout", controllers.logOut);
router.get("/me", controllers.me);

module.exports = router;
