const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    url: String,
    categoryName: String,
    createdAt: { type: Date, default: Date.now, immutable: true }
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };  