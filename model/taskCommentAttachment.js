const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./user');
const Task = require('./task');

const TaskCommentAttachment = sequelize.define('TaskCommentAttachment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING(1000),
  },
  attachment: {
    type: DataTypes.BLOB,
  },
  taskId: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: 'id',
    },
    field: 'TASK_ID',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    field: 'USER_ID',
  },
}, {
  tableName: 'TASK_COMMENT_ATTACHMENT',
  timestamps: false,
});

module.exports = TaskCommentAttachment;
