require('dotenv').config();

const express = require('express');

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

];


//Middleware to parse the request body

app.use(express.json())



app.get('/', (req, res) => {
    res.send('Task Manager API is running successfully.');
});

app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// Create a new task
app.post("/tasks", (req, res) => {
    const {title, description, status = pending} = req.body;

    // check if task already exist
    const taskExists = tasks.find(t => t.title === title);
    if(taskExists) {
        return res.status(400).send({Error: 'Task already exists' })
    }

    // Check if an object in the task array is empty
    if(!title || title.trim() === ""){
        return res.status(400).json( {error: "Title of the task cannot be empty"} );
    }

    if(!description || description.trim() === ""){
        return res.status(400).json( {error: "Description of the task cannot be empty" } );
    }

    if(!status || status.trim() === ""){
        return res.status(400).json( {error: "Task status is required"} );
    }

    // create a new task array
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status
    }

    // Add to the new task array
    tasks.push(newTask);

    // Display the new task array
    res.status(201).json(newTask);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});