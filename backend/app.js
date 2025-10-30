//backend entry point
const express = require('express');
const bodyParser = require('body-parser');      //middleware for parsing JSON
const cors = require('cors');           //middleware to handle cross-origin requests
const path = require('path'); 

const app = express();    //create express app

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'frontend/views'));
app.set('views', path.join(__dirname, '..', 'frontend', 'views')); //means Express goes one directory up from the current directory (parent folder), then into frontend/views.
//app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));


app.use(cors());        //enable CORS
app.use(bodyParser.json());     //to parse incoming requests with JSON payloads

//import user routes from routes folder
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const sensor_readingRoute = require('./routes/sensor_readingRoute');
const dashboardRoute = require('./routes/dashboardRoute');

//import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');  


//Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//mounting the user routes
app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/sensor-readings', sensor_readingRoute);
app.use('/', dashboardRoute);

//testing if API is running
// app.get('/', (req, res)=>{
//     res.send('IoT Backend API running ...');
// });

//serving the dashboard ejs page
//app.get('/dashboard', (req, res) => {
//  res.render('dashboard'); 
//});

//export app to use in server or in testing
module.exports = app;