const sequelize = require('../database/database');
const TaskCommentAttachment = require('../model/taskCommentAttachment');
const User = require('../model/user');
const Task = require('../model/task');

// Create a new task comment attachment
const createTaskCommentAttachment = async () => {
  try {
    const taskCommentAttachment = await TaskCommentAttachment.create({
      comment: 'This is a comment on the task.',
      attachment: null,
      taskId: 1,
      userId: 1,
    });
    console.log('TaskCommentAttachment created:', taskCommentAttachment.toJSON());
  } catch (error) {
    console.error('Error creating task comment attachment:', error);
  }
};

// Read all task comment attachments
const readTaskCommentAttachments = async () => {
  try {
    const taskCommentAttachments = await TaskCommentAttachment.findAll();
    console.log('All task comment attachments:', JSON.stringify(taskCommentAttachments, null, 2));
  } catch (error) {
    console.error('Error reading task comment attachments:', error);
  }
};

// Update a task comment attachment
const updateTaskCommentAttachment = async (id) => {
  try {
    const taskCommentAttachment = await TaskCommentAttachment.findByPk(id);
    if (taskCommentAttachment) {
      taskCommentAttachment.comment = 'Updated comment.';
      await taskCommentAttachment.save();
      console.log('TaskCommentAttachment updated:', taskCommentAttachment.toJSON());
    } else {
      console.log('TaskCommentAttachment not found.');
    }
  } catch (error) {
    console.error('Error updating task comment attachment:', error);
  }
};

// Delete a task comment attachment
const deleteTaskCommentAttachment = async (id) => {
  try {
    const taskCommentAttachment = await TaskCommentAttachment.findByPk(id);
    if (taskCommentAttachment) {
      await taskCommentAttachment.destroy();
      console.log('TaskCommentAttachment deleted.');
    } else {
      console.log('TaskCommentAttachment not found.');
    }
  } catch (error) {
    console.error('Error deleting task comment attachment:', error);
  }
};

// Perform the operations
const main = async () => {
  await sequelize.authenticate();
  await createTaskCommentAttachment();
  await readTaskCommentAttachments();
  await updateTaskCommentAttachment(1);
  await readTaskCommentAttachments();
  await deleteTaskCommentAttachment(1);
  await readTaskCommentAttachments();
  await sequelize.close();
};

main();
