import request from 'supertest';

import { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } from '../src/config/mongo_test';
import { app } from '../src/app';
import { userDatabase } from '../src/models/users.mongo';
import { CategoryDatabase } from '../src/models/categories.mongo';

let userId;

describe('Categories CRUD', () => {
  beforeAll(async () => {
    await mongoConnectTest();

    //Seed user to database for ref
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

  let categoryId;

  it('Should create category with 200 response', async () => {
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
        createdBy: userId,
      });
    expect(response.statusCode).toBe(200);
    categoryId = response.body._id.toString();
  });

  it('Should fetch all the categories with response 200', async () => {
    const response = await request(app).get('/v1/admin/categories');
    expect(response.statusCode).toBe(200);
  });

  it('Should fetch a category by ID with response 200', async () => {
    const response = await request(app).get(`/v1/admin/categories/${categoryId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(categoryId);
    expect(response.body.createdBy._id).toBe(userId);
  });

  it('Should delete a category by ID with response 200', async () => {
    const response = await request(app).delete(`/v1/admin/categories/${categoryId}`);
    expect(response.statusCode).toBe(200);
    const check = await CategoryDatabase.findById(categoryId);
    expect(check).toBeNull();
  });
});
