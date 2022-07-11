import mongoose from 'mongoose';
import config from './config.js';

export async function connectDB() {
  try {
    const db = await mongoose.connect(
      `mongodb://localhost:27017/${config.MONGO_DATABASE}`
    );
  } catch (e) {
    console.log(e);
  }
}
