const sequelize = require('../database/database');
const Project = require('../model/project');

// Create a new project
const createProject = async () => {
  try {
    const project = await Project.create({
      title: 'BENCH',
      description: 'Default project for newly joined team members',
      startDate: '2000-01-01',
      endDate: '2000-12-31',
      dueDate: '2000-12-31',
      status: 'INPROGRESS',
      priority: 'MEDIUM',
    });
    console.log('Project created:', project.toJSON());
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

// Read all projects
const readProjects = async () => {
  try {
    const projects = await Project.findAll();
    console.log('All projects:', JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error reading projects:', error);
  }
};

// Update a project
const updateProject = async (id) => {
  try {
    const project = await Project.findByPk(id);
    if (project) {
      project.status = 'COMPLETED';
      await project.save();
      console.log('Project updated:', project.toJSON());
    } else {
      console.log('Project not found.');
    }
  } catch (error) {
    console.error('Error updating project:', error);
  }
};

// Delete a project
const deleteProject = async (id) => {
  try {
    const project = await Project.findByPk(id);
    if (project) {
      await project.destroy();
      console.log('Project deleted.');
    } else {
      console.log('Project not found.');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

// Perform the operations
const main = async () => {
  await sequelize.authenticate();
  await createProject();
  await readProjects();
  await updateProject(1);
  await readProjects();
  await deleteProject(1);
  await readProjects();
  await sequelize.close();
};

main();
