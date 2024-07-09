const sequelize = require('../database/database');
const User = require('../model/user');

// Create a new user
const createUser = async () => {
  try {
    const user = await User.create({
      first_Name: 'John',
      last_Name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123', 
      role: 'ADMIN',
      status: 'ACTIVE',
    });
    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Read all users
const readUsers = async () => {
  try {
    const users = await User.findAll();
    console.log('All users:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error reading users:', error);
  }
};

// Update a user
const updateUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.status = 'INACTIVE';
      await user.save();
      console.log('User updated:', user.toJSON());
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Delete a user
const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      console.log('User deleted.');
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// Perform the operations
const main = async () => {
  await sequelize.authenticate();
  await createUser();
  await readUsers();
  await updateUser(1);
  await readUsers();
  await deleteUser(1);
  await readUsers();
  await sequelize.close();
};

main();
