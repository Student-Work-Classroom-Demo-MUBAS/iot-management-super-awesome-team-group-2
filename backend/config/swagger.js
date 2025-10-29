//Import swagger-jsdoc for generating docs
const swaggerJsdoc = require('swagger-jsdoc');

//defining swagger options
const options = {
    definition: {
        openapi: '3.0.0',       //swagger version
        info: {
            title: 'IoT Backend API: Super Awesome Team',
            version: '1.0.0',        //Actual API version
            description: 'API Documentation for the IoT Backend',
        },
        servers:[
            {
                url: 'http://localhost:3000/api',        //Base URL for API
            },
        ],


        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token in format **Bearer &lt;token&gt;**',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        
    },
    apis: ['./routes/*.js'], //look inside routes folder for documentation
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;