require('dotenv').config();

const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    pg_port: parseInt(process.env.PG_PORT || '5432', 10)
};
export default config;