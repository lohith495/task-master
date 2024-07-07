const express = require('express');
const app = express();
const port = 3000;
const Validator = require('./helpers/validator');
const tasksData = require('./task.json');
var tasksArray = [];
tasksArray.push(tasksData);
console.log(JSON. stringify(tasksArray, undefined, 4));

app.use(express.json());
const server = app.listen(port, (err) => {
    if(err){
        return console.log('error occured: '+err);
    }
    console.log('app is up and running on port: '+port);
    console.log(server.address());
});

app.get('/tasks', (req, res) => {
    return res.status(200).json(tasksData);
});

app.get('/tasks/:id', (req, res) => {
    let tasks = tasksData.tasks;
    let taskIdRequested = req.params.id;
    let returnTask = tasks.filter(val => val.id == taskIdRequested);
    if(returnTask.length == 0){
        return res.status(404).json('No task found for the passed task id');
    }
    return res.status(200).json(returnTask);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    console.log(newTask);
    if(Validator.validateTaskInfo(newTask).status == true){
        let lastId = tasksArray[tasksArray.length-1].tasks.length;
        let newId = lastId+1;
        newTask.id = newId;
        tasksArray[tasksArray.length-1].tasks.push(newTask);
        console.log('Array after insertion: '+JSON. stringify(tasksArray, undefined, 4));
        console.log('New Entry: '+JSON. stringify(tasksArray[tasksArray.length-1].tasks[newTask.id-1], undefined, 4));
        return res.status(201).json(newTask);
    }
    else{
        return res.status(400).json(Validator.validateTaskInfo(newTask).message);
    }
});

app.put('/tasks/:id', (req, res) => {
    const updatedTask = req.body;
    console.log(updatedTask);
    let idTobeUpdated = req.params.id-1;
    if((tasksArray.length !== 0) && idTobeUpdated <= tasksArray[tasksArray.length-1].tasks.length-1){
        if(Validator.validateTaskInfo(updatedTask).status == true){
            tasksArray[tasksArray.length-1].tasks[req.params.id-1].completed = updatedTask.completed;
            tasksArray[tasksArray.length-1].tasks[req.params.id-1].title = updatedTask.title;
            tasksArray[tasksArray.length-1].tasks[req.params.id-1].description = updatedTask.description;
            console.log('Array after updation: '+JSON. stringify(tasksArray, undefined, 4));
            console.log('Updated Entry: '+JSON. stringify(tasksArray[tasksArray.length-1].tasks[req.params.id-1], undefined, 4));
            return res.status(201).json(tasksArray[0].tasks[req.params.id-1]);
        }
        else{
            return res.status(400).json(Validator.validateTaskInfo(updatedTask).message);
        }
    }
    else{
        return res.status(404).json('No task found to update');
    }
});

app.delete('/tasks/:id', (req, res) => {
    let idTobeDeleted = req.params.id;
    if((tasksArray.length !== 0) && idTobeDeleted <= tasksArray[tasksArray.length-1].tasks.length){
        let deletedArray = tasksArray[tasksArray.length-1].tasks.splice(req.params.id-1,1);
        console.log('Array after deletion: '+JSON. stringify(tasksArray, undefined, 4));
        return res.status(200).send('Task '+req.params.id+' Deleted successfully');
    }
    else{
        return res.status(404).json('No task found to delete');
    }
});

module.exports = server