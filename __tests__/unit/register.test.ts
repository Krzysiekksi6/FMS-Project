import { Server } from "http";
import * as request from "supertest";
import app from "../../src/app";
import config from "../../src/config";
import { connectDatabase } from "../../src/config/connectDatabase";
import { User } from "../../src/entity/user/User";
import { createMockUser } from "../../mocks/user/UserMock";


let server: Server;
let myDataSource = connectDatabase;

describe("Unit Tests", () => {
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

it("TC_REG_001: Should be no users initially", async () => {
  // Given
  // When
  const response = await request(app).get("/users");
  // Then
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it("TC_REG_002: Should create/register a user", async () => {
  // Given
  const mockUser = createMockUser();
  // When
  const response = await request(app).post("/register").send({
    firstname: mockUser.firstname,
    lastname: mockUser.lastname,
    username: mockUser.username,
    password: mockUser.password,
  });
  // Then
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("id");
  expect(response.body.firstname).toBe(mockUser.firstname);
  expect(response.body.lastname).toBe(mockUser.lastname);
  expect(response.body.username).toBe(mockUser.username);
});

it("TC_REG_003: Should return an http error 400 bad request when firstname is not provided", async () => {
  // Given
  const mockUser = createMockUser();
  
  // When
  const response = await request(app).post("/register").send({
    lastname: mockUser.lastname,
    username: mockUser.username,
    password: mockUser.password,
  });
  
  // Then
  expect(response.status).toBe(400);
});

it("TC_REG_004: Should return an http error 400 bad request when lastname is not provided", async () => {
  // Given
  const mockUser = createMockUser();
  
  // When
  const response = await request(app).post("/register").send({
    firstname: mockUser.firstname,
    username: mockUser.username,
    password: mockUser.password,
  });
  
  // Then
  expect(response.status).toBe(400);
});

it("TC_REG_005: Should return an http error 400 bad request when username is not provided", async () => {
  // Given
  const mockUser = createMockUser();
  
  // When
  const response = await request(app).post("/register").send({
    firstname: mockUser.firstname,
    lastname: mockUser.lastname,
    password: mockUser.password,
  });
  
  // Then
  expect(response.status).toBe(400);
});

it("TC_REG_006: Should return an http error 400 bad request when password is not provided", async () => {
  // Given
  const mockUser = createMockUser();
  
  // When
  const response = await request(app).post("/register").send({
    firstname: mockUser.firstname,
    lastname: mockUser.lastname,
    username: mockUser.username,
  });
  
  // Then
  expect(response.status).toBe(400);
});

it("TC_AUTH_001: Should successfully log in a user", async () => {
  // Given
  const mockUser = createMockUser();
  await request(app).post("/register").send({
    firstname: mockUser.firstname,
    lastname: mockUser.lastname,
    username: mockUser.username,
    password: mockUser.password,
  });
  // When
  const response = await request(app).post("/auth").send({
    username: mockUser.username,
    password: "haslo123", // Domyślne hasło z mocka
  });

  // Then
  expect(response.status).toBe(200);
  expect(response.text).toContain(`User: ${mockUser.username} is logged in`);
});

it("TC_AUTH_002: Should return an http error 400 bad request when username is not provided", async () => {
  // When
  const response = await request(app).post("/auth").send({
    password: "haslo123",
  });

  // Then
  expect(response.status).toBe(400);
  // expect(response.body).toEqual({ message: "Username and password are required" });
});

it("TC_AUTH_003: Should return an http error 400 bad request when password is not provided", async () => {
  // When
  const response = await request(app).post("/auth").send({
    username: "Krzysiekksi6",
  });

  // Then
  expect(response.status).toBe(400);
  // expect(response.body).toEqual({ message: "Username and password are required" });
});

it("TC_AUTH_004: Should return an http error 401 unauthorized when username is not found", async () => {
  // When
  const response = await request(app).post("/auth").send({
    username: "NonexistentUser",
    password: "haslo123",
  });

  // Then
  expect(response.status).toBe(401);
  expect(response.body).toEqual({ message: "Unauthorized" });
});

it("TC_AUTH_005: Should return an http error 401 unauthorized when password is incorrect", async () => {
  // Given
  const mockUser = createMockUser();
  await myDataSource.getRepository(User).save(mockUser);

  // When
  const response = await request(app).post("/auth").send({
    username: mockUser.username,
    password: "incorrectPassword",
  });

  // Then
  expect(response.status).toBe(401);
  expect(response.body).toEqual({ message: "Unauthorized" });
});

})