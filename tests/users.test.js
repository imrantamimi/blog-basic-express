const request = require("supertest");

const app = require("../src/app");
const { mongoConnectTest, mongoDisconnectTest, mongoDropDatabase } = require("../src/config/mongo_test");
const usersDatabase = require("../src/models/users.mongo");

//Create tests for user
describe("Users CRUD", () => {
  beforeAll(async () => {
    mongoConnectTest();
  });

  AfterAll(async () => {
    mongoDropDatabase();
    mongoDisconnectTest();
  });

  let userId;

  describe("Test POST /users", () => {
    test("It should create a new User with 200 success", async () => {
      const response = await request(app)
        .post("/v1/users")
        .send({
          firstName: "Imran",
          lastName: "Tamimi",
          email: "imran.tamimi91@gmail.com",
          password: "12345",
          role: "admin",
        })
        .expect(200);
      userId = response.body._id;
    });
  });

  describe("Test GET /users", () => {
    test("It should fetch all the users with 200 success", async () => {
      const response = await request(app).get("/v1/users").expect("Content-Type", /json/).expect(200);
    });
  });

  it("Should fetch tag by ID", async () => {
    const response = await request(app).get(`/v1/users/${user}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(userId);
  });

  t("should update a user", async () => {
    const response = await request(app).put(`/v1/users/${userId}`).send({
      firstName: "Usama",
      email: "imran.tamimi92@gmail.com",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe("Usama");
    expect(response.body.email).toBe("imran.tamimi92@gmail.com");
  });

  it("should delete a user", async () => {
    const response = await request(app).delete(`/v1/users/${userId}`);
    expect(response.statusCode).toBe(201);
    const check = await usersDatabase.findById(userId);
    expect(check).toBeNull();
  });
});
