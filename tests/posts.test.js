import request from 'supertest';

import { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } from '../src/config/mongo_test';
import { app } from '../src/app';
import { userDatabase } from '../src/models/users.mongo';
import { CategoryDatabase } from '../src/models/categories.mongo';
import { postDatabase } from '../src/models/posts.mongo';

let userId;
let categoryId;

describe('Post CRUD', () => {
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

    //Seed category to database for ref

    const category = await CategoryDatabase.create({
      name: 'Category 1',
      slug: 'Category 1',
      image: {
        url: 'https://www.dummy-image.com/user/123456789.jpeg',
        altText: 'Image Description',
      },
      description: 'Some description about category',
      createdBy: userId,
    });
    categoryId = category._id.toString();
  });

  afterAll(async () => {
    await mongoDropDatabase();
    await mongoDisconnectTest();
  });

  let postId;

  it('Should create post with 200 response', async () => {
    const response = await request(app)
      .post('/v1/admin/posts')
      .send({
        name: 'Post 1',
        slug: 'Post 1',
        image: {
          url: 'https://www.dummy-image.com/user/123456789.jpeg',
          altText: 'Image Description',
        },
        content: 'Some description about post',
        category: categoryId,
        createdBy: userId,
      });
    expect(response.statusCode).toBe(200);
    postId = response.body._id.toString();
  });

  it('Should fetch all the posts with response 200', async () => {
    const response = await request(app).get('/v1/admin/posts');
    expect(response.statusCode).toBe(200);
  });

  it('Should fetch a post by ID with response 200', async () => {
    const response = await request(app).get(`/v1/admin/posts/${postId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(postId);
    expect(response.body.createdBy._id).toBe(userId);
  });

  it('Should delete a post by ID with response 200', async () => {
    const response = await request(app).delete(`/v1/admin/posts/${postId}`);
    expect(response.statusCode).toBe(200);
    const check = await postDatabase.findById(postId);
    expect(check).toBeNull();
  });
});
