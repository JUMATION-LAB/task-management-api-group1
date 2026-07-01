require('dotenv').config();

const express = require('express');
const { title } = require('node:process');
const app = express();
// Importing the port from .env
const PORT = process.env.PORT || 3000;


// Our Database that include task,an array of objects for the task,
// title, description and status(pending,completed)
let tasks =[
    {
        id:1,
        title: 'Learn Node.js',
        description:'Learn Node.js and Express.js to bulid backend application',
        status:'Completed'
    },
    {
        id:2,
        title: 'Learn React.js',
        description:'Learn React.js to bulid frontend application',
        status:'Completed'
    },
    {
        id:3,
        title: 'Learn MongoDB',
        description:'Learn MonogDB to store data in a NoSQL database',
        status:'Pending'
    },
    
    {
         id:4,
        title: 'Learn Laravel',
        description:'Learn PHP framework laravel to bulid backend application',
        status:'Pending'
    },

]

//Middleware to parse the request body

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Task Manager API is running successfully.');
});


//Update a task by id
// This changes the task in the database completely according to the body and id provided.
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const { title, description } = req.body;

    //Success index of task is returned or -1 if no task with id is found.
    const taskIndex = tasks.findIndex(t => t.id === id);

    console.log(tasks);
    console.log(taskIndex);
    //The error handler if the task is not found
    if(taskIndex === -1){ 
        return res.status(404).send({Error: 'Task not found' })
    }

    //Update the task object
    tasks[taskIndex] = {
        id,
        title,
        description,
        status
    };

    res.json(tasks);

});


///Update for only a specific field of a task by id eg a status.
app.patch('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {  status } = req.body;

    const updateTask = tasks.find( t => t.id === id );

    //If not found, return 404 error
    if(!updateTask) {
        return res.status(404).send({Error: 'Task not found' })
    }

    //Update the status of the task 
    if( status === 'Completed' && updateTask.status === 'Pending') {
        updateTask.status = 'Completed';
    } else if (status === 'Pending' && updateTask.status === 'Completed') {
        updateTask.status = 'Pending';
    } else if ( (status === 'Pending' && updateTask.status === 'Pending') ||
        (status === 'Completed' && updateTask.status === 'Completed') ) {
            return res.status(200).send({Error: 'Status is up to date.' });
    } else {
        return res.status(400).send({Error: 'Invalid status update.' });
    }
    res.json(updateTask);
    
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running live at http://localhost:${PORT}`);
});


