import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI_TEST = process.env.MONGO_URI_TEST;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function mongoConnectTest() {
  await mongoose.connect(MONGO_URI_TEST);
}

export async function mongoDisconnectTest() {
  await mongoose.disconnect();
}

export async function mongoDropDatabase() {
  await mongoose.connection.dropDatabase();
}
