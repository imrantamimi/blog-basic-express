import { userDatabase } from '../src/models/users.mongo.js';
import { mongoConnect } from '../src/config/mongo.js';

async function seedAdmin() {
  try {
    await mongoConnect();
    console.log('Connected to mongoDB');
    const adminExists = await userDatabase.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists. Skipping.');
      process.exit(0);
    }
    await userDatabase.create({
      firstName: process.env.ADMIN_FIRST_NAME,
      lastName: process.env.ADMIN_LAST_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });
    console.log('Admin user created');
    process.exit(0);
  } catch (err) {
    console.error('Admin seeding failed', err);
    process.exit(1);
  }
}

seedAdmin();
