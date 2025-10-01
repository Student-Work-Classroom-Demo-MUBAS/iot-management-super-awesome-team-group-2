//backend entry point
const express = require('express');
const bodyParser = require('body-parser');      //middleware for parsing JSON
const cors = require('cors');           //middleware to handle cross-origin requests

//import user routes from routes folder
const userRoutes = require('./routes/userRoutes');


//import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

//define express app
const app = express();

app.use(cors());        //enable CORS
app.use(bodyParser.json());     //to parse incoming requests with JSON payloads  


//Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
//mounting the user routes to /api/users, e.g. POST /api/users/register or POST /api/users/login

//testing if API is running
app.get('/', (req, res)=>{
    res.send('IoT Backend API running ...');
});

//export app to use in server or in testing
module.exports = app;