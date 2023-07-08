const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    userLiked: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
});

module.exports = mongoose.model("Like", postSchema);
