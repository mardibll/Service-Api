const { Ability, AbilityBuilder } = require("@casl/ability");
function getToken(req) {
  let token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  // console.log("====================================");
  // console.log(token, "INI TOKEN GET");
  // console.log("====================================");

  return token && token.length ? token : null;
}

const policies = {
  guest(user, { can }) {
    can("read", "Product");
    // console.log("====================================");
    // console.log(user, "DATA USER");
    // console.log("====================================");
  },
  user(user, { can }) {
    can("view", "Order");
    can("create", "Product");
    can("update", "Product");
    can("delete", "Product");
    can("create", "Category");
    can("update", "Category");
    can("delete", "Category");
    can("create", "Tags");
    can("update", "Tags");
    can("delete", "Tags");
    // const user_id = user._id;
    // console.log(user_id, "INI USER ID");
    can("create", "Order");
    can("read", "Order");
    can("update", "User", { user_id: user._id });

    can("view", "Cart", { _id: user._id });

    can("read", "Cart", { user_id: user._id });
    can("update", "Cart", { user_id: user._id });

    can("view", "DeliveryAddress");
    can("create", "DeliveryAddress", { user_id: user._id });
    can("update", "DeliveryAddress", { user_id: user._id });
    can("delete", "DeliveryAddress", { user_id: user._id });
    can("read", "Invoice", { user_id: user._id });
  },
  admin(user, { can }) {
    can("manage", "all");
  },
};
const policyfor = (user) => {
  console.log("====================================");
  console.log(user, "INI USERS DATA");
  console.log("====================================");
  let builder = new AbilityBuilder();
  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }
  return new Ability(builder.rules);
};
module.exports = { getToken, policyfor };
