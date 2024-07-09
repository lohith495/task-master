const sequelize = require('../database/database');
const Task = require('../model/task');
const User = require('../model/user');
const Project = require('../model/project');

// Create a new task
const createTask = async () => {
  try {
    const task = await Task.create({
      title: 'Complete Documentation',
      description: 'Complete the project documentation by the end of the week.',
      dueDate: '2023-07-10',
      status: 'PENDING',
      priority: 'HIGH',
      assigned_To: 1,
      assigned_By: 2,
      project_Id: 1,
    });
    console.log('Task created:', task.toJSON());
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

// Read all tasks
const readTasks = async () => {
  try {
    const tasks = await Task.findAll();
    console.log('All tasks:', JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error reading tasks:', error);
  }
};

// Update a task
const updateTask = async (id) => {
  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.status = 'COMPLETED';
      await task.save();
      console.log('Task updated:', task.toJSON());
    } else {
      console.log('Task not found.');
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Delete a task
const deleteTask = async (id) => {
  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      console.log('Task deleted.');
    } else {
      console.log('Task not found.');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Perform the operations
const main = async () => {
  await sequelize.authenticate();
  await createTask();
//   await readTasks();
//   await updateTask(1);
//   await readTasks();
//   await deleteTask(1);
  await readTasks();
  await sequelize.close();
};

main();
