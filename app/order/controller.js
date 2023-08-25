const Order = require("../order/model");
const { Types } = require("mongoose");
const OrderItem = require("../order-item/model");
const CartItem = require("../cart-item/model");
const DeliveryAddress = require("../DeliveryAdress/model");
const store = async (req, res, next) => {
  try {
    let { delivery_fee, delivery_address, itemId } = req.body;
    let items = await CartItem.find({
      user: req.user._id,
      _id: { $in: itemId },
    }).populate("product");
    if (!items || items.length === 0) {
      return res.json({
        error: 1,
        message: `You cannot create an order because you have no items in your cart`,
      });
    }

    // If items exist, proceed with order creation
    let address = await DeliveryAddress.findById(delivery_address);
    let order = await Order({
      _id: new Types.ObjectId(),
      status: "waiting_payment",
      delivery_fee: delivery_fee,
      delivery_address: {
        provinsi: address.propinsi,
        kabupaten: address.kabupaten,
        kecamatan: address.kecamatan,
        kelurahan: address.kelurahan,
        detail: address.detail,
      },
      user: req.user._id,
    });
    console.log(items, "INI ITEM @@@@@");
    let orderItems = await OrderItem.insertMany(
      items.map((item) => ({
        ...item,
        _id: item._id,
        name: item.product.name,
        qty: parseInt(item.qty),
        price: parseInt(item.product.price),
        order: order._id,
        product: item.product._id,
      }))
    );

    orderItems.forEach((item) => order.order_items.push(item));
    await order.save();
    const orderedItemIds = orderItems.map((item) => item);
    console.log(orderedItemIds, "INI orderedItemIds");
    const deletes = await CartItem.deleteMany({
      user: req.user._id,
      _id: { $in: orderedItemIds },
    });
    console.log(deletes, "INI DELETES");
    return res.json(order);
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.fields,
      });
    }
    next(err);
  }
};
const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await Order.find({ user: req.user._id }).countDocuments();
    let orders = await Order.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("order_items")
      .sort("createAt");
    return res.json({
      data: orders.map((order) => order.toJSON({ virtuals: true })),
      count,
    });
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.fields,
      });
    }
    next(err);
  }
};
module.exports = { store, index };
