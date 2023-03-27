const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  logging: false /*el valor en true significa que cada vez que nosotros hagamos una consulta en la base de datos, en la terminal
    se va a ver la consulta (en código)sql. El parámetro lo dejamos en false para que no se llene de demasiada
    información en la consola */,
});

module.exports = { db };
