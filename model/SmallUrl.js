const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const smallUrlSchema = new Schema({
  original: { type: String, required: true },
  small: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate,
  },
});

module.exports = mongoose.model("SmallUrl", smallUrlSchema);
