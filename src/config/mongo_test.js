const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URI_TEST = process.env.MONGO_URI_TEST;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnectTest() {
  await mongoose.connect(MONGO_URI_TEST);
}

async function mongoDisconnectTest() {
  await mongoose.disconnect();
}

async function mongoDropDatabase() {
  await mongoose.connection.dropDatabase();
}

module.exports = {
  mongoConnectTest,
  mongoDisconnectTest,
  mongoDropDatabase,
};
