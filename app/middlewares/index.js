const { getToken, policyfor } = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Users = require("../../app/user/model");

async function decodeToken(req, res, next) {
  try {
    let token = getToken(req);
    // console.log('====================================');
    // console.log(token,"INI TOKEN DECODE");
    // console.log('====================================');
    if (!token) return next();

    req.user = jwt.verify(token, config.secretKey);

    let user = await Users.findOne({ token: { $in: [token] } });
    // console.log(user, "INI USER MES");
    if (!user) {
      // Instead of sending a response here, set a property on the request to indicate that the token is invalid/expired.
      res.json({
        error: 1,
        message: "Token Expired",
      });
    }
  } catch (err) {
    if (err && err.name === "JsonWebTokenError") {
      // Same here, set a property on the request to indicate the error.
      res.json({
        error: 1,
        message: err.message,
      });
    } else {
      // If it's an unexpected error, pass it to the error-handling middleware.
      return next(err);
    }
  }
  // Let the middleware continue to the next middleware or route handler.
  // The actual response handling should be done in the controller.
  return next();
}
function police_check(action, subject) {
  return function (req, res, next) {
    let policy = policyfor(req.user);
    // console.log('====================================');
    // console.log('User Object:', req.user);
    // console.log('User Permissions:', policy.rules);
    // console.log('Action:', action);
    // console.log('Subject:', subject);
    // console.log('====================================');

    if (!policy.can(action, subject)) {
      // console.log('====================================');
      // console.log(policy.can(action, subject),"INI POLICY CAN");
      // console.log('====================================');
      return res.json({
        error: 1,
        message: `You are not allowed to ${action} ${subject}`,
      });
    }
    next();
  };
}
module.exports = {
  decodeToken,
  police_check,
};
