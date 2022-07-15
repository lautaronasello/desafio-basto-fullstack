import mongoose from 'mongoose';
import config from './config.js';

export async function connectDB() {
  try {
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DATABASE}`
    );
  } catch (e) {
    console.log(e);
  }
}
