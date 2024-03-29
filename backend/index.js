const dotenv = require('dotenv');
const { connectToDb } = require('./datastore/index');
const createExpressApp = require('./app');

(async () => {
  dotenv.config();
  await connectToDb();
  const app = createExpressApp();
  app.listen(
    process.env.PORT || 3000,
    () => console.log('listenning on port:', process.env.PORT),
  );
})();
