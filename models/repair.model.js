const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Repair = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    enum: ['pending', 'completed', 'cancelled'],
  },
  userId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

module.exports = Repair;
