const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectIdj, ref: "User" },
    url: String,
    categoryId: { type: mongoose.Types.ObjectId, ref: "Category" },
    createdAt: { type: Date, default: Date.now, immutable: true }
}, {
    methods: {
        async create() {
            return await this.save();
        }
    },
    statics: {
        async getNextPage(userId, cursor) {
            return await this.find(
                {
                    userId: userId,
                    _id: { $gt: cursor }
                }
            ).limit(3).exec();
        },
        async getPreviousPage(userId, cursor) {
            return await this.find(
                {
                    userId: userId,
                    _id: { $lt: cursor }
                }
            ).limit(3).exec();
        },
        async getNextPageInCategory(userId, categoryId, cursor) {
            return await this.find(
                {
                    userId: userId,
                    _id: { $gt: cursor },
                    categoryId: categoryId
                }
            ).limit(3).exec();
        },
        async getPreviousPageInCategory(userId, categoryId, cursor) {
            return await this.find(
                {
                    userId: userId,
                    _id: { $lt: cursor },
                    categoryId: categoryId
                }
            ).limit(3).exec();
        }
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };