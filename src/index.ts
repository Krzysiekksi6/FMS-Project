import app from "./app";
import { connectDatabase } from "./config/connectDatabase";
import config from "./config";

connectDatabase.initialize()
    .then(async () => {
        app.listen(config.port);
        console.log(`
    Express server has started on port ${config.port}. 
    Postgres connect on port ${config.pg_port}
    Open http://localhost:${config.port}/users to see results
    Open http://localhost:${config.port}/docs to see documentation swagger API
    `);
    })
    .catch((error) => console.log(error));

