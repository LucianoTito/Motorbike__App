const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false /*indica que no puede permitir nulos */,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM('client', 'employee'),
    defaultValue: 'client',
  },

  status: {
    type: DataTypes.ENUM('available', 'disabled'),
    defaultValue: 'available',
  },
});

module.exports = User;
