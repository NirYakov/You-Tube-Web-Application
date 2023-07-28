const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    creator: { type: String, required: true, uniqueValidator: true },
    link: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
