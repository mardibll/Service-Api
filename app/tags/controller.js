const tags = require("./model");
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    console.log(payload, "payload");
    let tag = new tags(payload);
    console.log(tag);
    await tag.save();
    return res.json(tag);
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
    let tag = await tags.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(tag);
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
    let tag = await tags.findByIdAndDelete(req.params.id);
    return res.json(tag);
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
const index = async (reg, res, next) => {
  try {
    let tag = await tags.find();
    return res.json(tag);
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
    const tag = await tags.findById(id);
    if (!tag) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(tag);
  } catch (error) {
    next(error);
  }
};
module.exports = { store, update, destroy, index, get_id };
