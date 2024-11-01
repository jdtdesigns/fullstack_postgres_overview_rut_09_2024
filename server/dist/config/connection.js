import { Sequelize } from 'sequelize';
const client = new Sequelize({
    username: 'postgres',
    password: 'pass',
    database: 'winery_app_db',
    host: 'localhost',
    dialect: 'postgres',
    // Turn off the SQL logging so it doesn't clutter the terminal logs
    logging: false
});
export default client;
