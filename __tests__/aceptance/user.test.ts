import {createConnection} from "typeorm";
import app from "../../src/app";
import config from "../../src/config"

let connection, server
beforeEach(async () => {
    connection = await createConnection()
    await  connection.synchronize()
    server = app.listen(config.port)
})
afterEach(() => {
    connection.close();
    server.close();
})
it('simple test', () => {
    expect(1 + 1).toBe(2)
})