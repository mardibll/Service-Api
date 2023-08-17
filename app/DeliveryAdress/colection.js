const { subject } = require("@casl/ability");
const { policyfor } = require("../utils");
const DeliveryAddress = require("./model");
const mongoose = require("mongoose");
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    if (payload["propinsi "]) {
      payload.propinsi = payload["propinsi "];
      delete payload["propinsi "];
    }
    // console.log(payload, "INI PAYLOAD");
    let user = req.user;
    console.log(user, "INI USER AKUN");
    let address = new DeliveryAddress({ ...payload, user: user._id });
    await address.save();
    console.log(address, "INI ADRESS");
    return res.json(address);
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
const update = async (req, res, next) => {
  try {
    let { _id, ...payload } = req.body;
    let { id } = req.params;
    let adress = await DeliveryAddress.findById(id);
    let subjectAddress = subject("DeliveryAddress", {
      ...adress,
      user_id: adress.user,
    });
    let policy = policyfor(req.user);
    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: `You're not allowed to modify this resource`,
      });
    }
    adress = await DeliveryAddress.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return res.json(adress);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
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
    let { id } = req.params;
    let adress = await DeliveryAddress.findById(id);
    let subjectAddress = subject("DeliveryAddress", {
      ...adress,
      user_id: adress.user,
    });
    let policy = policyfor(req.user);
    if (!policy.can("delete", subjectAddress)) {
      return res.json({
        error: 1,
        message: `You're not allowed to modify this resource`,
      });
    }
    adress = await DeliveryAddress.findByIdAndUpdate(id);
    return res.json(adress);
  } catch (err) {
    if (err && err.name === "ValidationError") {
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
    let { skip = 0, limit = 10 } = req.query;
    let count = await DeliveryAddress.find({
      user: req.user._id,
    }).countDocuments();
    let address = await DeliveryAddress.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    return res.json({ data: address, count });
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

// const update = async (req, res, next) => {
//   try {
//     let payload = req.body;
//     let adress = await DeliveryAddress.findByIdAndUpdate(
//       req.params.id,
//       payload,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     return res.json(adress);
//   } catch (err) {
//     if (err && err.name === "ValidationError") {
//       return res.json({
//         error: 1,
//         message: err.message,
//         fields: err.errors,
//       });
//     }
//     next(err);
//   }
// };

// const index = async (req, res, next) => {
//   try {
//     // JIKA YANG MENGAKSESS ADALAH ADMIN
//     // let user = req.user;
//     // const user_id=user._id
//     // console.log(user._id, "INI USER AKUN");
//     // let delivery = await DeliveryAddress.find();
//     // console.log(delivery, "INI DELIVERY");
//     // // if (user._id === delivery._d) {
//     // // }
//     // return res.json(delivery);

//     // JIKA YANG MENGAKSESS ADALAH USER
//     let user = req.user;
//     console.log(user._id, "INI USER AKUN");
//     const targetId = new mongoose.Types.ObjectId(user._id);
//     console.log("Searching for delivery with ID:", targetId);
//     // Assuming you have a Delivery model defined with Mongoose.
//     DeliveryAddress.find({ user: targetId })
//       .then((filteredDeliveries) => {
//         console.log(filteredDeliveries, "INI HASIL");
//         if (filteredDeliveries.length > 0) {
//           return res.json(filteredDeliveries);
//         } else {
//           return res.json("alamat belum ditambahkan");
//         }
//       })
//       .catch((err) => {
//         console.error("Error retrieving filtered deliveries:", err);
//       });
//   } catch (err) {
//     if (err && err.name === "validationError") {
//       return res.json({
//         error: 1,
//         message: err.message,
//         fields: err.errors,
//       });
//     }
//     next(err);
//   }
// };
module.exports = { store, update, index,destroy };
