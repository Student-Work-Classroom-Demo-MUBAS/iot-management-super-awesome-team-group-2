//backend entry point
const express = require('express');
const bodyParser = require('body-parser');      //middleware for parsing JSON
const cors = require('cors');           //middleware to handle cross-origin requests

//import user routes from routes folder
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const sensor_readingRoute = require('./routes/sensor_readingRoute');


//import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

//define express app
const app = express();

app.use(cors());        //enable CORS
app.use(bodyParser.json());     //to parse incoming requests with JSON payloads  


//Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//mounting the user routes
app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/sensor-readings', sensor_readingRoute);

//testing if API is running
app.get('/', (req, res)=>{
    res.send('IoT Backend API running ...');
});

//export app to use in server or in testing
module.exports = app;