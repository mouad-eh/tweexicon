const mongoose = require('mongoose');
const { mongoDataStore } = require('./mongoDB/index');

async function connectToDb() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (err) {
    console.log(err);
  }
}
module.exports = { connectToDb, db: mongoDataStore };
