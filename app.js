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


//Middleware to parse the request body

app.use(express.json())
]



app.get('/', (req, res) => {
    res.send('Task Manager API is running successfully.');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});