// The code is run before each test file (test suite)
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { db, connectToDb } = require('../datastore/index');
const createExpressApp = require('../app');

const app = createExpressApp();

beforeAll(async () => {
  dotenv.config();
  await connectToDb();
});

beforeEach(async () => {
  await db.resetDatabase();
});

afterAll(async () => {
  await db.resetDatabase();
  // Close the default connection
  await mongoose.connection.close();
});

module.exports = app;
