const mongoose = require("mongoose");

const clipSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, required: true, uniqueValidator: true },
    link: { type: String, required: true },
    category: { type: String, required: true },
    review: { type: String },
    name: { type: String },
});

module.exports = mongoose.model("Clip", clipSchema);
