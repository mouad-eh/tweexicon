const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }]
}, {
    methods: {
        //sign up
        async create() {
            return await this.save();
        }
    },
    statics: {
        //login
        async getUser(email, password) {
            return await this.findOne({ email, password }).exec();
        },
        //creating a post
        async getAllCategories(userId) {
            const user = await this.find({ _id: userId }).exec();
            return user.categories;
        }
    }
}
);

const User = mongoose.model("User", userSchema);

module.exports = { User };