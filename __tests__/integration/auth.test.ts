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
});
