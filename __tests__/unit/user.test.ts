import {createConnection, DataSource} from "typeorm";
import * as request  from "supertest";
import app from "../../src/app";
import config from "../../src/config"
import {connectDatabase} from "../../src/config/connectDatabase";

let  server, myDataSource = connectDatabase;

beforeAll(async() => {
    await myDataSource.connect()
    await myDataSource.synchronize(true);
    server = app.listen(config.port);
});

afterAll(() => {
    server.close();
    myDataSource.close()
});
it('Should be no users initially', async() => {
    // Given
    // When
    const response = await request(app).get('/users')
    // Then
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
})

it('Should create a user', async() => {
    // Given
    const testUser = {
        firstName: 'Kris',
        lastName: 'Timber',
        age: 18
    }
    // When
    const response = await request(app).post('/users').send(testUser)
    // Then
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({...testUser, id: 1});
})

it('should not create a user if firstName is not given', async() => {
    const response = await request(app).post('/users').send({ lastName: 'Doe', age: 21 });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).not.toBeNull();
    expect(response.body.errors.length).toBe(1);
    expect(response.body.errors[0]).toEqual({
        msg: 'Invalid value', path: 'firstName', location: 'body',type: "field"
    });
});

it('should not create a user if age is less than 0', async() => {
    const response = await request(app).post('/users').send({ firstName: 'John', lastName: 'Doe', age: -1 });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).not.toBeNull();
    expect(response.body.errors.length).toBe(1);
    expect(response.body.errors[0]).toEqual({
        msg: 'Age must be a positive number', path: 'age', value: -1, location: 'body', type: "field"

    });
});
