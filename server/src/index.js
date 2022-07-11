import app from './app.js';
import { connectDB } from './database.js';
import config from './config.js';

const main = async () => {
  try {
    await connectDB();
    app.listen(config.PORT);
    console.log('app on port: ' + config.PORT);
  } catch (e) {
    console.log(e);
  }
};

main();
