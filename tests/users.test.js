import request from 'supertest';
import app from '../src/app.js';
import { userDatabase } from '../src/models/users.mongo.js';
import { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } from '../src/config/mongo_test.js';

//Create tests for user
describe('User API (CRUD + JWT)', () => {
  let userId;
  let adminData;
  let adminUser;
  let adminToken;

  beforeAll(async () => {
    console.log('Connecting to test database...');
    await mongoConnectTest();

    adminData = {
      firstName: 'Imran',
      lastName: 'Tamimi',
      email: 'imran.tamimi91@gmail.com',
      password: 'password',
      role: 'admin',
    };
    adminUser = await userDatabase.create(adminData);

    const loginResponse = await request(app).post('/v1/admin/users/login').send({
      email: adminUser.email,
      password: adminData.password,
    });

    adminToken = loginResponse.body.token;

    console.log(`Admin token acquired: ${adminToken}`);
  });

  afterAll(async () => {
    console.log('Disconnecting from test database...');
    await mongoDropDatabase();
    await mongoDisconnectTest();
  });

  beforeEach(async () => {
    userData = {
      firstName: 'Imran',
      lastName: 'Tamimi',
      email: `user${Date.now()}@gmail.com`,
      password: 'password',
      role: 'user',
    };
    const response = await request(app).post('/v1/admin/users').send(userData);
    userId = response.body._id;
  });

  afterEach(async () => {
    await userDatabase.deleteMany({
      role: {
        $ne: 'admin',
      },
    });
    // await mongoDropDatabase();
  });

  describe('Test POST /users', () => {
    test('It should create a new User with 200 success', async () => {
      const response = await request(app).post('/v1/admin/users').send({
        firstName: 'Imran',
        lastName: 'Tamimi',
        email: 'imran.tamimi93@gmail.com',
        password: 'password',
        role: 'user',
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test POST /login', () => {
    test('It should login a user with 200 success', async () => {
      const response = await request(app).post('/v1/admin/users/login').send({
        email: adminUser.email,
        password: adminData.password,
      });
      console.log('login response-', JSON.stringify(response.body));
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });

  describe('Test GET /users', () => {
    test('It should fetch all the users with 200 success', async () => {
      const response = await request(app).get('/v1/admin/users').set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test GET /users/:id', () => {
    test('Should fetch tag by ID', async () => {
      const response = await request(app).get(`/v1/admin/users/${userId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(userId);
    });
  });

  describe('Test PUT /users/:id', () => {
    test('should update a user', async () => {
      const response = await request(app)
        .put(`/v1/admin/users/${userId}`)
        .send({
          firstName: 'Usama',
          lastName: 'Boss',
          email: 'imran.tamimi94@gmail.com',
        })
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.firstName).toBe('Usama');
      expect(response.body.email).toBe('imran.tamimi94@gmail.com');
    });
  });

  describe('Test DELETE /users/:id', () => {
    test('should delete a user', async () => {
      const response = await request(app).delete(`/v1/admin/users/${userId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(201);
      const check = await userDatabase.findById(userId);
      expect(check).toBeNull();
    });
  });
});
