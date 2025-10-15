import request from 'supertest';

import { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } from '../src/config/mongo_test';
import app from '../src/app';
import { userDatabase } from '../src/models/users.mongo';
import { tagDatabase } from '../src/models/tags.mongo';

describe('Tag API (CRUD + JWT)', () => {
  let adminId;
  let tagId;
  let tagData;
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
    tagData = {
      name: `Tag ${uniqueSuffix}`,
      slug: `Tag ${uniqueSuffix}`,
      createdBy: adminId,
    };
    const response = await request(app).post('/v1/admin/tags').send(tagData).set('Authorization', `Bearer ${adminToken}`);
    console.log(`Unique Tag response - ${JSON.stringify(response)}`);
    tagId = response.body._id;
    console.log(`Tag ID - ${tagId}`);
  });

  afterEach(async () => {
    await tagDatabase.deleteMany({});
  });

  describe('Test POST /tags', () => {
    test('It should create a new tag with 200 success', async () => {
      const response = await request(app)
        .post('/v1/admin/tags')
        .send({
          name: 'Tag 1',
          slug: 'Tag 1',
          createdBy: adminId,
        })
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test GET /tags', () => {
    test('It should respond wih 200 success', async () => {
      const response = await request(app).get('/v1/admin/tags').set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test GET /tags by id', () => {
    test('should fetch tag by ID', async () => {
      const response = await request(app).get(`/v1/admin/tags/${tagId}`).set('Authorization', `Bearer ${adminToken}`);
      console.log(`Get By ID response - ${JSON.stringify(response)}`);
      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(tagId);
      expect(response.body.createdBy._id.toString()).toBe(adminId.toString());
    });
  });

  describe('Test PUT /tags by id', () => {
    test('should update a tag', async () => {
      const response = await request(app)
        .put(`/v1/admin/tags/${tagId}`)
        .send({
          name: 'Tag 2',
          slug: 'Tag 2',
        })
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Tag 2');
      expect(response.body.createdBy._id.toString()).toBe(adminId.toString());
    });
  });

  describe('Test Delete /tags by id', () => {
    test('should delete a tag', async () => {
      const response = await request(app).delete(`/v1/admin/tags/${tagId}`).set('Authorization', `Bearer ${adminToken}`);
      console.log(`Delete response - ${JSON.stringify(response)}`);
      expect(response.statusCode).toBe(201);
      const check = await tagDatabase.findById(tagId);
      expect(check).toBeNull();
    });
  });
});
