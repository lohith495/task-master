const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
  },
  start_Date: {
    type: DataTypes.DATE,
  },
  end_Date: {
    type: DataTypes.DATE,
  },
  due_Date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING(50),
  },
  priority: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'PROJECT',
  timestamps: false,
});

module.exports = Project;
