const request = require('supertest');
const express = require('express');

const app = require('../index'); 
const tasksData = require('../task.json');
var tasksArray = [];
tasksArray.push(tasksData);
describe('GET /tasks', () => {
  it('should get all tasks', async () => {
    const response = await request(app)
      .get('/tasks')
      .expect(200);
  });
});

describe('GET /tasks/:id', () => {
  it('should get a task when given a valid task id', async () => {
    const response = await request(app)
      .get('/tasks/1')
      .expect(200);
    // expect(response.text).toBe('Task 1 fetched successfully');
  });

  it('should return 404 if the task id does not exist', async () => {
    const response = await request(app)
      .get('/tasks/999')
      .expect(404);
  });
});

describe('POST /tasks', () => {
  it('should create a new task with the provided body', async () => {
    const requestBody = {
      // id: 16,
      title: 'Install Redis',
      description: 'Install Redis',
      completed: true
    };
    const response = await request(app)
      .post('/tasks')
      .send(requestBody)
      .expect(201);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: 'Install Redis',
      description: 'Install Redis',
      completed: true
    }));
  });
  it('should return 400 bad request for the provided incorrect body', async () => {
    const requestBody = {
      id: 16,
      completed: true
    };
    const response = await request(app)
      .post('/tasks')
      .send(requestBody)
      .expect(400);
    });
});

describe('PUT /tasks/:id', () => {
  it('should update a task with the provided body', async () => {
    const requestBody = {
      title: 'Install json-web-token',
      description: 'Install json-web-token',
      completed: true
    };
    const response = await request(app)
      .put('/tasks/15')
      .send(requestBody)
      .expect(201);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: 'Install json-web-token',
      description: 'Install json-web-token',
      completed: true
    }));
  });
  it('should return 400 bad request for the provided incorrect body', async () => {
    const requestBody = {
      id: 15,
      completed: true
    };
    const response = await request(app)
      .put('/tasks/15')
      .send(requestBody)
      .expect(400);
    });
    it('should return 404 if the task id does not exist', async () => {
      const response = await request(app)
        .put('/tasks/999')
        .expect(404);
    });    
});

describe('DELETE /tasks/:id', () => {
  it('should delete a task when given a valid task id', async () => {
    const response = await request(app)
      .delete('/tasks/1')
      .expect(200);
    expect(response.text).toBe('Task 1 Deleted successfully');
  });

  it('should return 404 if the task id does not exist', async () => {
    const response = await request(app)
      .delete('/tasks/999')
      .expect(404);
  });
});
