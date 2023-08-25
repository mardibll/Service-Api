const Product = require("../produk/model");
const CartItem = require("../cart-item/model");

const update = async (req, res, next) => {
  try {
    const { items } = req.body;
    const user_id = req.user._id;
    console.log(items, "INI ITEMS");
    const productid = items.map((item) => item.product._id);
    console.log(productid, "INI PRO ID");
    const products = await Product.find({ _id: { $in: productid } });
    console.log(productid, "INI PRODUCTS");

    let cartItems = items.map((item) => {
      console.log(item.product._id, "INI ITEM @");
      let relatedProduct = products.find(
        (product) => product._id.toString() === item.product._id
      );

      return {
        product: relatedProduct._id,
        price: relatedProduct.price,
        image_url: relatedProduct.picture,
        name: relatedProduct.name,
        user: user_id,
        qty: item.qty,
      };
    });

    await CartItem.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req.user._id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );
    return res.json(cartItems);
  } catch (err) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let items = await CartItem.find({ user: req.user._id })
      .populate("product")
      .sort("_id");
    console.log(items, "INI ITEMS");
    return res.json(items);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const create = async (req, res, next) => {
  const user_id = req.user._id;
  try {
    const { items } = req.body;
    console.log(items, "INI ITEMS");
    const productIds = items.map((item) => item.product._id);
    const products = await Product.find({ _id: { $in: productIds } });

    // Create cartItems array with updated 'qty' property
    let cartItems = items.map((item) => {
      const foundProduct = products.find(
        (product) => product._id.toString() === item.product._id
      );

      // If the product is found, create a new object with additional 'qty' property
      if (foundProduct) {
        return {
          product: foundProduct._id,
          price: foundProduct.price,
          image_url: foundProduct.picture,
          name: foundProduct.name,
          user: user_id,
          qty: item.qty, // Set 'qty' property based on item.qty
        };
      } else {
        // If the product is not found, return a "Not Found" response
        console.log(foundProduct, "INI FOUNT");
        return {
          error: "Product not found",
          product_id: item.product._id,
        };
      }
    });

    console.log(cartItems, "INI CART ITEMS");

    // Remove any null entries (products not found)
    cartItems = cartItems.filter((item) => item !== null);

    // Update or insert cart items for the current user
    for (const cartItem of cartItems) {
      const existingCartItem = await CartItem.findOne({
        user: user_id,
        product: cartItem.product,
      });

      if (existingCartItem) {
        // If cart item already exists, update the quantity
        existingCartItem.qty += cartItem.qty;
        await existingCartItem.save();
      } else {
        // If cart item doesn't exist, create a new one
        await CartItem.create(cartItem);
      }
    }

    console.log(CartItem, "INI CART ITEM");
    return res.json(cartItems);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};
const destroy = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    await CartItem.findByIdAndDelete(cartId);
    console.log(CartItem,"INI CART ITEMS");
    return res.json({ message: "product deleted successfully" });
  } catch (error) {
    next(err);
  }
};
module.exports = { index, update, create,destroy };
