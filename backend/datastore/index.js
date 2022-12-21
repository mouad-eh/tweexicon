const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectToDb() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
    } catch (err) {
        console.log(err);
    }
}
module.exports = { connectToDb }