//function to start the app we set
const http = require('http');       //importing http module
const app = require('./app');      //importing created app.js

const PORT = process.env.PORT || 3000;

//HTTP server 
const server = http.createServer(app);

//Listening to port
server.listen(PORT, () =>{
    console.log('Server running on port ${PORT}');
});