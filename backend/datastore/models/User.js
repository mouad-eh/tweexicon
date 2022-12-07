const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    categories: [{ type: mongoose.Types.ObjectIdj, ref: "Category" }]
});

const User = mongoose.model("User", userSchema);

module.exports = { User };