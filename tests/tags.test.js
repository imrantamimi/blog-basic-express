import request from 'supertest';

import { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } from '../src/config/mongo_test';
import { app } from '../src/app';
import { userDatabase } from '../src/models/users.mongo';
import { tagDatabase } from '../src/models/tags.mongo';

let userId;

describe('Tag CRUD', () => {
  beforeAll(async () => {
    await mongoConnectTest();

    // Seed a user for tag reference
    const user = await userDatabase.create({
      firstName: 'Imran',
      lastName: 'Tamimi',
      email: 'test@gmail.com',
      password: 'password',
      role: 'admin',
    });
    userId = user._id.toString();
  });

  afterAll(async () => {
    await mongoDropDatabase();
    await mongoDisconnectTest();
  });

  let tagId;

  describe('Test POST /tags', () => {
    test('It should create a new tag with 200 success', async () => {
      const response = await request(app)
        .post('/v1/admin/tags')
        .send({
          name: 'Tag 1',
          slug: 'Tag 1',
          createdBy: userId,
        })
        .expect(200);
      tagId = response.body._id;
    });
  });

  describe('Test GET /tags', () => {
    test('It should respond wih 200 success', async () => {
      const response = await request(app).get('/v1/admin/tags').expect('Content-Type', /json/).expect(200);
    });
  });

  it('should fetch tag by ID', async () => {
    const response = await request(app).get(`/v1/admin/tags/${tagId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(tagId);
    expect(response.body.createdBy._id).toBe(userId);
  });

  it('should update a tag', async () => {
    const response = await request(app).put(`/v1/admin/tags/${tagId}`).send({
      name: 'Tag 2',
      slug: 'Tag 2',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Tag 2');
    expect(response.body.createdBy._id).toBe(userId);
  });

  it('should delete a tag', async () => {
    const response = await request(app).delete(`/v1/admin/tags/${tagId}`);
    expect(response.statusCode).toBe(201);
    const check = await tagDatabase.findById(tagId);
    expect(check).toBeNull();
  });
});
