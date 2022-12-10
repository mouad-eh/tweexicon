const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Post } = require("../models/Post");

const defaultCategory = { name: "default", color: "#1DA1F2" } //twitter blue color
const mongoDataStore = {
    async getUserByEmail(email) {
        return await User.findOne({ email }).exec();
    },
    async createUser({ firstName, lastName, email, password }) {
        const user = new User(
            {
                firstName,
                lastName,
                email,
                password,
                categories: [defaultCategory]
            }
        )
        return await user.save();
    },
    async listNextPosts(userId, limit, cursor) {
        userId = mongoose.mongo.ObjectId(userId);
        if (!cursor) {
            return await Post.find({ userId }).limit(limit).exec();
        }
        cursor = mongoose.mongo.ObjectId(cursor);
        return await Post.find({
            userId,
            _id: { $gt: cursor }
        }).limit(limit).exec();
    },
    async listPreviousPosts(userId, limit, cursor) {
        userId = mongoose.mongo.ObjectId(userId);
        cursor = mongoose.mongo.ObjectId(cursor);
        const posts = await Post.find({
            userId,
            _id: { $lt: cursor }
        }).sort({ _id: -1 }).limit(limit).exec();
        return posts.reverse();
    },
    async listNextPostsInCategory(userId, categoryName, limit, cursor) {
        userId = mongoose.mongo.ObjectId(userId);
        if (!cursor) {
            return await Post.find({ userId, categoryName }).limit(limit).exec();
        }
        cursor = mongoose.mongo.ObjectId(cursor);
        return await Post.find({
            userId,
            categoryName,
            _id: { $gt: cursor }
        }).limit(limit).exec();
    },
    async listPreviousPostsInCategory(userId, categoryName, limit, cursor) {
        userId = mongoose.mongo.ObjectId(userId);
        cursor = mongoose.mongo.ObjectId(cursor);
        const posts = await Post.find({
            userId,
            categoryName,
            _id: { $lt: cursor }
        }).sort({ _id: -1 }).limit(limit).exec();
        return posts.reverse();
    },
    async getPostById(postId) {
        return await Post.findOne({ _id: mongoose.mongo.ObjectId(postId) }).exec();
    },
    async createPost({ userId, url, categoryName }) {
        const post = new Post({
            userId: mongoose.mongo.ObjectId(userId),
            url,
            categoryName
        });
        return await post.save();
    },
    async deletePost(userId, postId) {
        return await Post.deleteOne(
            {
                _id: mongoose.mongo.ObjectId(postId),
                userId: mongoose.mongo.ObjectId(userId)
            }
        );
        // the returned object from the deleteOne operation: { acknowledged: true, deletedCount: 1 }
    },
    async listCategories(userId) {
        const user = await User.findOne(
            { _id: mongoose.mongo.ObjectId(userId) }
        ).exec();
        return user.categories
    },
    async createCategory(userId, category) {
        return await User.updateOne(
            { _id: mongoose.mongo.ObjectId(userId) },
            {
                $push: { categories: category }
            }
        );
        // the object returned from the updateOne operation
        // {
        //     acknowledged: true,
        //     modifiedCount: 1,
        //     upsertedId: null,
        //     upsertedCount: 0,
        //     matchedCount: 1
        //   }
    },
    async deleteCategory(userId, categoryName) {
        await Post.updateMany(
            { userId: mongoose.mongo.ObjectId(userId), categoryName },
            { $set: { categoryName: defaultCategory.name } }
        );
        return await User.updateOne(
            { _id: mongoose.mongo.ObjectId(userId) },
            { $pull: { categories: { name: categoryName } } }
        );
    }
}

module.exports = { mongoDataStore }