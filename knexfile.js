require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  }
};