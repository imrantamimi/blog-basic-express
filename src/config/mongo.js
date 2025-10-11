import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

const MONGO_URIS = {
  development: process.env.MONGO_URI_DEV,
  test: process.env.MONGO_URI_TEST,
  production: process.env.MONGO_URI_PROD,
};

const MONGO_URI = MONGO_URIS[ENV];

if (!MONGO_URI) {
  console.error(`No mongoDB URI found for environment: ${ENV}`);
  process.exit(1);
}

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function mongoConnect() {
  await mongoose.connect(MONGO_URI);
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}
