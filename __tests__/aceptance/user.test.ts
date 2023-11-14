import {createConnection, DataSource} from "typeorm";
import * as request  from "supertest";
import app from "../../src/app";
import config from "../../src/config"
import {connectDatabase} from "../../src/config/connectDatabase";

let  myDataSource = connectDatabase;
let server;
beforeAll(async() => {
    await myDataSource.connect()
    server = app.listen(config.port);
});

afterAll(() => {
    server.close();
    myDataSource.close()
});
it('Should be no users initially', async() => {
    const response = await request(app).get('/users')
    console.log(response.body)
    expect(response.statusCode).toBe(200);
})