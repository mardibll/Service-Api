const categories = require("./model");
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    console.log(payload, "payload");
    let category = new categories(payload);
    console.log(category);
    await category.save();
    return res.json(category);
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
    let payload = req.body;
    let category = await categories.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(category);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      // Mengubah "validationError" menjadi "ValidationError" (berdasarkan penulisan yang tepat)
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
    let category = await categories.findByIdAndDelete(req.params.id);
    return res.json(category);
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
    let category = await categories.find();
    return res.json(category);
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
const get_id = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categories.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(category);
  } catch (error) {
    next(error);
  }
};
module.exports = { store, update, destroy, index, get_id };
