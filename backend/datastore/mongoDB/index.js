const mongoose = require('mongoose');
const { User } = require('../models/User');
const { Post } = require('../models/Post');

const defaultCategory = { name: 'default', color: '#1DA1F2' }; // twitter blue color
const mongoDataStore = {
  async getUserByEmail(email) {
    return User.findOne({ email }).exec();
  },
  async createUser({
    firstName, lastName, email, password,
  }) {
    const user = new User(
      {
        firstName,
        lastName,
        email,
        password,
        categories: [defaultCategory],
      },
    );
    return user.save();
  },
  async listNextPosts(userId, limit, cursor) {
    const userIdObj = mongoose.mongo.ObjectId(userId);
    if (!cursor) {
      return Post.find({ userId: userIdObj }).limit(limit).exec();
    }
    const cursorObj = mongoose.mongo.ObjectId(cursor);
    return Post.find({
      userId: userIdObj,
      _id: { $gt: cursorObj },
    }).limit(limit).exec();
  },
  async listPreviousPosts(userId, limit, cursor) {
    const userIdObj = mongoose.mongo.ObjectId(userId);
    const cursorObj = mongoose.mongo.ObjectId(cursor);
    const posts = await Post.find({
      userId: userIdObj,
      _id: { $lt: cursorObj },
    }).sort({ _id: -1 }).limit(limit).exec();
    return posts.reverse();
  },
  async listNextPostsInCategory(userId, categoryName, limit, cursor) {
    const userIdObj = mongoose.mongo.ObjectId(userId);
    if (!cursor) {
      return Post.find({ userId: userIdObj, categoryName }).limit(limit).exec();
    }
    const cursorObj = mongoose.mongo.ObjectId(cursor);
    return Post.find({
      userId: userIdObj,
      categoryName,
      _id: { $gt: cursorObj },
    }).limit(limit).exec();
  },
  async listPreviousPostsInCategory(userId, categoryName, limit, cursor) {
    const userIdObj = mongoose.mongo.ObjectId(userId);
    const cursorObj = mongoose.mongo.ObjectId(cursor);
    const posts = await Post.find({
      userId: userIdObj,
      categoryName,
      _id: { $lt: cursorObj },
    }).sort({ _id: -1 }).limit(limit).exec();
    return posts.reverse();
  },
  async getPostById(postId) {
    return Post.findOne({ _id: mongoose.mongo.ObjectId(postId) }).exec();
  },
  async createPost({ userId, url, categoryName }) {
    const post = new Post({
      userId: mongoose.mongo.ObjectId(userId),
      url,
      categoryName,
    });
    return post.save();
  },
  async deletePost(userId, postId) {
    return Post.deleteOne(
      {
        _id: mongoose.mongo.ObjectId(postId),
        userId: mongoose.mongo.ObjectId(userId),
      },
    );
    // the returned object from the deleteOne operation: { acknowledged: true, deletedCount: 1 }
  },
  async listCategories(userId) {
    const user = await User.findOne(
      { _id: mongoose.mongo.ObjectId(userId) },
    ).exec();
    return user.categories;
  },
  async createCategory(userId, category) {
    return User.updateOne(
      { _id: mongoose.mongo.ObjectId(userId) },
      {
        $push: { categories: category },
      },
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
      { $set: { categoryName: defaultCategory.name } },
    );
    return User.updateOne(
      { _id: mongoose.mongo.ObjectId(userId) },
      { $pull: { categories: { name: categoryName } } },
    );
  },
  async getPostsCount(userId) {
    return Post.countDocuments(
      { userId: mongoose.mongo.ObjectId(userId) },
    ).exec();
  },
  async getPostsCountInCategory(userId, categoryName) {
    return Post.countDocuments(
      { userId: mongoose.mongo.ObjectId(userId), categoryName },
    ).exec();
  },
  async resetDatabase() {
    await mongoose.connection.dropDatabase();
  },
};

module.exports = { mongoDataStore };
