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
    }
 
];


//Middleware to parse the request body

app.use(express.json())


//Middleware to parse the request body.
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Task Manager API is running successfully.');
});


app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// Create a new task
app.post("/tasks", (req, res) => {
    const {title, description, status = "Pending"} = req.body;

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

//Creating task in URL. eg tasks/url?title=Learn%20Node.js&description=Learn%20Node.js%20and%20Express.js%20to%20bulid%20backend%20application&status=Completed
app.post("/tasks/url", (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const status = req.query.status || "Pending";
    console.log(title);


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
    res.status(201).json({ "Added url Task" : newTask });
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


//Delete a task by id
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(t => t.id === id);

    //The error handler if the task is not found
    if(taskIndex === -1) {
        return res.status(404).send({Error: 'Task not found' })
    }

    //Remove the task from the tasks array
    tasks.splice(taskIndex, 1);

    res.status(201).send({ message: `Task ${id} deleted successfully` , tasks: tasks});
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running live at http://localhost:${PORT}`);
});


