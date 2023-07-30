const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    creator: { type: String, required: true, uniqueValidator: true },
    name: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);