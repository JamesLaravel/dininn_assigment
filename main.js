const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config();
const connection = require('./connection')
const routeDefinitions = require('./routes/index')

//set up express app

const app = express()
app.use(express.json());
app.use(cors());
if(dotenv.error){
    throw dotenv.error
}

app.listen(3000);
console.log("Server started listening on port: 3000")

routeDefinitions(app);
//error handling middleware

app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {

    const status = err.status || 500;

    res.status(status).json({error: {
        error: true,
        statue:0,
        message: err.message
    }})
    
})
