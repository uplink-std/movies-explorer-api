const mongoose = require('mongoose');
const app = require('./app');
const {
  PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGODB_URL, messages,
} = require('./utils/constants');
const { serverLogger } = require('./utils/logger');

const options = {
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
};
mongoose.connect(MONGODB_URL, options);

app.listen(PORT, () => {
  serverLogger.info(`${messages.APPLICATION_STARTED} ${PORT}`);
});
