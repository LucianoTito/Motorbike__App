const { DataTypes, STRING } = require('sequelize');
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
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client',
    enum: ['client', 'employee'],
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
    enum: ['available', 'disabled'],
  },
});

module.exports = User;
