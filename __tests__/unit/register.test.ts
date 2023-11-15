import * as request from "supertest";
import app from "../../src/app";
import config from "../../src/config";
import { connectDatabase } from "../../src/config/connectDatabase";
import { User } from "../../src/entity/user/User";
import { createMockUser } from "../../mocks/user/UserMock";

let server,
  myDataSource = connectDatabase;

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

it("Should be no users initially", async () => {
  // Given
  // When
  const response = await request(app).get("/users");
  // Then
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it("Should create/register a user", async () => {
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

it("Should return an http error 400 bad request when firstname is not provided", async () => {
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

it("Should return an http error 400 bad request when lastname is not provided", async () => {
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

it("Should return an http error 400 bad request when username is not provided", async () => {
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

it("Should return an http error 400 bad request when password is not provided", async () => {
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
