import { Server } from "http";
import * as request from "supertest";
import app from "../../src/app";
import config from "../../src/config";
import { connectDatabase } from "../../src/config/connectDatabase";
import { User } from "../../src/entity/user/User";
import {
  createMockUser,
  createInvalidMockUser,
} from "../../mocks/user/UserMock";

let server: Server;
let myDataSource = connectDatabase;

describe("Integration tests User", () => {
  beforeEach(async () => {
    await myDataSource.connect();
    await myDataSource.synchronize(true);
    server = app.listen(config.port);
  });

  afterEach(async () => {
    server.close();
    await connectDatabase.getRepository(User).clear();
    myDataSource.close();
  });

  it("TC_REG_AUTH_001: Should register and then login a user", async () => {
    // Given
    const mockUser = createMockUser();

    // When
    const registerResponse = await request(app).post("/register").send({
      firstname: mockUser.firstname,
      lastname: mockUser.lastname,
      username: mockUser.username,
      password: mockUser.password,
    });

    // Then
    expect(registerResponse.status).toBe(201);

    // When
    const loginResponse = await request(app).post("/auth").send({
      username: mockUser.username,
      password: mockUser.password,
    });

    // Then
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.text).toContain(
      `User: ${mockUser.username} is logged in`
    );
  });

  it("TC_REG_AUTH_002: Should return 401 unauthorized for incorrect login credentials", async () => {
    // Given
    const mockUser = createMockUser();

    // When
    const registerResponse = await request(app).post("/register").send({
      firstname: mockUser.firstname,
      lastname: mockUser.lastname,
      username: mockUser.username,
      password: mockUser.password,
    });

    // Then
    expect(registerResponse.status).toBe(201);

    // When
    const loginResponse = await request(app).post("/auth").send({
      username: mockUser.username,
      password: "IncorrectPassword",
    });

    // Then
    expect(loginResponse.status).toBe(401);
    expect(loginResponse.body).toHaveProperty("message", "Unauthorized");
  });

  it("TC_REG_AUTH_003: Should register a user and then retrieve the user by ID", async () => {
    // Given
    const mockUser = createMockUser();

    // When
    const registerResponse = await request(app).post("/register").send({
      firstname: mockUser.firstname,
      lastname: mockUser.lastname,
      username: mockUser.username,
      password: mockUser.password,
    });

    // Then
    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty("id");

    // When
    const userId = registerResponse.body.id;
    const getUserResponse = await request(app).get(`/users/${userId}`);

    // Then
    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body).toHaveProperty("username", mockUser.username);
    expect(getUserResponse.body).toHaveProperty(
      "firstname",
      mockUser.firstname
    );
    expect(getUserResponse.body).toHaveProperty("lastname", mockUser.lastname);
  });

  it("TC_REG_AUTH_004: Should return 404 not found for non-existent user ID after registration", async () => {
    // Given
    const mockUser = createMockUser();

    // When
    const registerResponse = await request(app).post("/register").send({
      firstname: mockUser.firstname,
      lastname: mockUser.lastname,
      username: mockUser.username,
      password: mockUser.password,
    });

    // Then
    expect(registerResponse.status).toBe(201);

    // When
    const nonExistentUserId = 9999;
    const getUserResponse = await request(app).get(
      `/users/${nonExistentUserId}`
    );

    // Then
    expect(getUserResponse.status).toBe(404);
    expect(getUserResponse.body).toHaveProperty("message", "User not found");
  });

  it("TC_REG_USER_005: Should return 404 not found for non-existent user ID after registration", async () => {
    // Given
    const mockUser = createMockUser();

    // When
    const registerResponse = await request(app).post("/register").send({
      firstname: mockUser.firstname,
      lastname: mockUser.lastname,
      username: mockUser.username,
      password: mockUser.password,
    });

    // Then
    expect(registerResponse.status).toBe(201);

    // When
    const nonExistentUserId = 9999;
    const deleteUserResponse = await request(app).delete(
      `/users/${nonExistentUserId}`
    );

    // Then
    expect(deleteUserResponse.status).toBe(404);
    expect(deleteUserResponse.body).toHaveProperty("message", `User with _id:${nonExistentUserId } not exist`);
  });

  it("TC_REG_USER_006: Should register 3 diffrent users return a list of all users", async () => {
    // Given
    const mockUser1 = createMockUser();
    const mockUser2 = createMockUser();
    const mockUser3 = createMockUser();
    mockUser1.id = 1;
    mockUser1.username = "Moster";
    mockUser2.id = 2;
    mockUser2.username = "Albon";
    mockUser3.id = 3;
    mockUser3.username = "Thom";
  
    // When
    const registerResponse1 = await request(app).post("/register").send({
      firstname: mockUser1.firstname,
      lastname: mockUser1.lastname,
      username: mockUser1.username,
      password: mockUser1.password,
    });
  
    const registerResponse2 = await request(app).post("/register").send({
      firstname: mockUser2.firstname,
      lastname: mockUser2.lastname,
      username: mockUser2.username,
      password: mockUser2.password,
    });
  
    const registerResponse3 = await request(app).post("/register").send({
      firstname: mockUser3.firstname,
      lastname: mockUser3.lastname,
      username: mockUser3.username,
      password: mockUser3.password,
    });
  
    // Then
    expect(registerResponse1.status).toBe(201);
    expect(registerResponse2.status).toBe(201);
    expect(registerResponse3.status).toBe(201);
  
    // When
    const getUsersResponse = await request(app).get("/users");
  
    // Then
    expect(getUsersResponse.status).toBe(200);
    expect(getUsersResponse.body.length).toBe(3);
  });

  it("TC_REG_USER_007: Should register 3 users but two of them would have the same usernames  return 409 Conflict", async () => {
    // Given
    const mockUser1 = createMockUser();
    const mockUser2 = createMockUser();
    const mockUser3 = createMockUser();
    mockUser1.id = 1;
    mockUser1.username = "Moster";
    mockUser2.id = 2;
    mockUser2.username = "Albon";
    mockUser3.id = 3;
    mockUser3.username = "Moster";
  
    // When
    const registerResponse1 = await request(app).post("/register").send({
      firstname: mockUser1.firstname,
      lastname: mockUser1.lastname,
      username: mockUser1.username,
      password: mockUser1.password,
    });
  
    const registerResponse2 = await request(app).post("/register").send({
      firstname: mockUser2.firstname,
      lastname: mockUser2.lastname,
      username: mockUser2.username,
      password: mockUser2.password,
    });
  
    const registerResponse3 = await request(app).post("/register").send({
      firstname: mockUser3.firstname,
      lastname: mockUser3.lastname,
      username: mockUser3.username,
      password: mockUser3.password,
    });
  
    // Then
    expect(registerResponse1.status).toBe(201);
    expect(registerResponse2.status).toBe(201);
    expect(registerResponse3.status).toBe(409);
  
  });
  

  it("TC_REG_USER_008: Should register a user and then delete the user", async () => {
    // Given
    const mockUser = createMockUser();

    // When
    const registerResponse = await request(app).post("/register").send({
      firstname: mockUser.firstname,
      lastname: mockUser.lastname,
      username: mockUser.username,
      password: mockUser.password,
    });

    // Then
    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty("id");

    // When
    const userId = registerResponse.body.id;
    const deleteUserResponse = await request(app).delete(`/users/${userId}`);

    // Then
    expect(deleteUserResponse.status).toBe(200);
    expect(deleteUserResponse.body).toHaveProperty(
      "message",
      `User with _id:${userId} has been removed`
    );
  });

  it("TC_REG_USER_DETAILS_002: Should register a user and add details", async () => {
    // Given
    const mockUser = createMockUser();

    const userDetailsData = mockUser.user_details;

    // When
    const registerResponse = await request(app)
      .post("/register")
      .send(mockUser);

    // Then
    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty("id");

    // When
    const userDetailsResponse = await request(app)
      .put(`/users/${registerResponse.body.id}/details`)
      .send(userDetailsData);

    // Then
    expect(userDetailsResponse.status).toBe(201);
    expect(userDetailsResponse.body).toHaveProperty("bmi");
  });

  it("TC_REG_USER_DETAILS_003: Should return 400 bad request for invalid user age", async () => {
    // Given
    const mockUser = createInvalidMockUser();
    const invalidUserDetailsData = mockUser.user_details;

    // When
    const registerResponse = await request(app)
      .post("/register")
      .send(mockUser);

    // Then
    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty("id");

    // When
    const userDetailsResponse = await request(app)
      .put(`/users/${registerResponse.body.id}/details`)
      .send(invalidUserDetailsData);

    // Then
    expect(userDetailsResponse.status).toBe(400);
    expect(userDetailsResponse.body).toHaveProperty("message", "Invalid data");
  });
});
