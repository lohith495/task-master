const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(255),
    defaultValue: 'REGULAR',
  },
  status: {
    type: DataTypes.STRING(255),
    defaultValue: 'ACTIVE',
  }
}, {
  tableName: 'USER',
  timestamps: false,
});

module.exports = User;
