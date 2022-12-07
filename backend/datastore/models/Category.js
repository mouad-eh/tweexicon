const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    color: String
}, {
    methods: {
        async create() {
            return await this.save();
        }
    }
}
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };