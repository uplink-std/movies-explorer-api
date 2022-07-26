const app = require('./app');
const { PORT } = require('./utils/constants');
const { serverLogger } = require('./utils/logger');

app.listen(PORT, () => {
  serverLogger.info(`App listening on port ${PORT}`);
});
