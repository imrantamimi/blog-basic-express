import request from 'supertest';

import { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } from '../src/config/mongo_test';
import app from '../src/app';
import { userDatabase } from '../src/models/users.mongo';
import { CategoryDatabase } from '../src/models/categories.mongo';
import { postDatabase } from '../src/models/posts.mongo';

describe('Post CRUD', () => {
  let postId;
  let postData;
  let categoryId;
  let categoryData;
  let adminId;
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

    postData = {
      name: `Post ${uniqueSuffix}`,
      slug: `Post ${uniqueSuffix}`,
      image: {
        url: 'https://www.dummy-image.com/user/123456789.jpeg',
        altText: 'Image Description',
      },
      content: 'Some description about post',
      category: categoryId,
      createdBy: adminId,
    };

    const postResponse = await postDatabase.create(postData);
    console.log(`Unique post response - ${JSON.stringify(postResponse)}`);
    postId = postResponse._id;
    console.log(`Post ID - ${postId}`);
  });

  afterEach(async () => {
    await CategoryDatabase.deleteMany({});
  });

  describe('Test POST /posts', () => {
    test('Should create post with 200 response', async () => {
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
          createdBy: adminId,
        })
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test GET /posts', () => {
    test('Should fetch all the posts with response 200', async () => {
      const response = await request(app).get('/v1/admin/posts').set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test GET /posts by Id', () => {
    test('Should fetch a post by ID with response 200', async () => {
      const response = await request(app).get(`/v1/admin/posts/${postId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body._id.toString()).toBe(postId.toString());
      expect(response.body.createdBy._id.toString()).toBe(adminId.toString());
    });
  });

  describe('Test PUT /posts by id', () => {
    test('should update a post', async () => {
      const response = await request(app)
        .put(`/v1/admin/posts/${postId}`)
        .send({
          name: 'Post 2',
          slug: 'Post 2',
          content: 'Some description about post 2',
          category: categoryId,
        })
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Post 2');
      expect(response.body.createdBy._id.toString()).toBe(adminId.toString());
    });
  });

  describe('Test DELETE /posts', () => {
    test('Should delete a post by ID with response 200', async () => {
      const response = await request(app).delete(`/v1/admin/posts/${postId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      const check = await postDatabase.findById(postId);
      expect(check).toBeNull();
    });
  });
});
