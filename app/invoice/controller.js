const { subject } = require("@casl/ability");
const Invoice = require("./model");
const { policyfor } = require("../utils");

const show = async (req, res, next) => {
  try {
    let policy = policyfor(req.user);
    // console.log(policy, "INI POLICY");
    let { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order","delivery_address.provinsi")
      .populate("user", "_id email");
    // console.log(invoice, "INI INVOICE");
    let subjectInvoice = subject("Invoice", {
      ...invoice.toObject(),
      user_id: invoice.user._id,
    });
    // console.log(subjectInvoice, "INI subjectInvoice");
    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk melihat invoice ini",
      });
    }
    // console.log(order_id, "INI ORDER ID");
    return res.json(invoice);
  } catch (err) {
    // console.log(err, "INI ERROR");
    return res.json({
      error: 1,
      message: "Error when getting invoice",
    });
  }
};
module.exports = { show };
