//Import swagger-jsdoc for generating docs
const swaggerJsdoc = require('swagger-jsdoc');

//defining swagger options
const options = {
    definition: {
        openapi: '3.0.0',       //swagger version
        info: {
            title: 'IoT Backend API',
            version:'1.0.0',        //Actual API version
            description: 'API Documentation for the IoT Backend',
        },
        servers:[
            {
                url: 'http://localhost:300/api',        //Base URL for API
            },
        ],
    },
    apis: ['./routes/*.js'], //look inside routes folder for documentation
};