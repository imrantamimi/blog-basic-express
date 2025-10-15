import request from 'supertest';

import { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } from '../src/config/mongo_test.js';
import app from '../src/app.js';
import { userDatabase } from '../src/models/users.mongo.js';
import { CategoryDatabase } from '../src/models/categories.mongo.js';

describe('Category API (CRUD + JWT)', () => {
  let adminId;
  let categoryId;
  let categoryData;
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

    adminId = adminUser._id;

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
    let uniqueSuffix = Date.now();
    categoryData = {
      name: `Category ${uniqueSuffix}`,
      slug: `Category ${uniqueSuffix}`,
      description: `Some description about category-${uniqueSuffix}`,
      image: {
        url: 'https://www.dummy-image.com/user/123456789.jpeg',
        altText: 'Image Description',
      },
      createdBy: adminId,
    };
    const response = await CategoryDatabase.create(categoryData);
    console.log(`Unique category response - ${JSON.stringify(response)}`);
    categoryId = response._id;
    console.log(`Category ID - ${categoryId}`);
  });

  afterEach(async () => {
    await CategoryDatabase.deleteMany({});
  });

  describe('Test POST /category', () => {
    test('Should create category with 200 response', async () => {
      const response = await request(app)
        .post('/v1/admin/categories')
        .send({
          name: 'Category 1',
          slug: 'Category 1',
          description: 'Some description about category',
          image: {
            url: 'https://www.dummy-image.com/user/123456789.jpeg',
            altText: 'Image Description',
          },
          createdBy: adminId,
        })
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test GET /categories', () => {
    test('Should fetch all the categories with response 200', async () => {
      const response = await request(app).get('/v1/admin/categories').set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test GET /categories by ID', () => {
    test('Should fetch a category by ID with response 200', async () => {
      const response = await request(app).get(`/v1/admin/categories/${categoryId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body._id.toString()).toBe(categoryId.toString());
      expect(response.body.createdBy._id.toString()).toBe(adminId.toString());
    });
  });

  describe('Test PUT /categories by id', () => {
    test('should update a category', async () => {
      const response = await request(app)
        .put(`/v1/admin/categories/${categoryId}`)
        .send({
          name: 'Category 2',
          description: 'Some description about category 2',
        })
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Category 2');
      expect(response.body.createdBy._id.toString()).toBe(adminId.toString());
    });
  });

  describe('Test Delete /Category by ID', () => {
    test('Should delete a category by ID with response 200', async () => {
      const response = await request(app).delete(`/v1/admin/categories/${categoryId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      const check = await CategoryDatabase.findById(categoryId);
      expect(check).toBeNull();
    });
  });
});
