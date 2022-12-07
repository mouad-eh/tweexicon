const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectIdj, ref: "User" },
    url: String,
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    createdAt: { type: Date, default: Date.now, immutable: true }
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };