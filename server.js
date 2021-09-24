const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser')
const db = require('./postgresData')
const port = 5000;
const router = express.Router();
app.listen(port, () => console.log(` server hosted on ${port}`)); 


app.use(bodyParser.json()) //body parser to make sure config file sent with command call from App.js is configured for the right command
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


//server calls that route request to the correct database queries
app.get('/users',db.getUsers);  //route that lists all the users (http://localhost:5000/users to see the raw array of users) 
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);