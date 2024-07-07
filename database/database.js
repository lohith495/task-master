const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('backend_engineering', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging; default: console.log
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectToDatabase();

module.exports = sequelize;
