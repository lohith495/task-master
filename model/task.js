const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); 
const User = require('./user');
const Project = require('./project');

const Task = sequelize.define('Task', {
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
  due_Date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING(50),
  },
  priority: {
    type: DataTypes.STRING(50),
  },
  assigned_To: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  assigned_By: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  project_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: 'id',
    },
  },
}, {
  tableName: 'TASK',
  timestamps: false,
});

module.exports = Task;
