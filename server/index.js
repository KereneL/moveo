
const dotenv = require('dotenv');
const {app, server} = require('./app');
const dbConnect = require('./db/dbConnect');

dotenv.config();
const port = process.env.PORT || '5000';
const API_URL = process.env.REACT_APP_API_URL;

// set port to app
app.set('port', port);

// for debugging purposes
server.on('error', error=>console.log(error));

// Listen on HTTP server
server.listen(port, ()=>{
  
    // Connect to MongoDB
    dbConnect()
    console.log(`Listening on port ${port}`);
});