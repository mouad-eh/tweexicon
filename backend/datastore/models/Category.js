const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    color: String
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };